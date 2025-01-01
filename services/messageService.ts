import { connectToDatabase } from '../lib/mongodb';
import { redisClient } from '../lib/redis';
import { Message, MessageStatus } from '../types';

export class MessageService {
  private static CACHE_TTL = 3600; // 1 hour cache

  static async saveMessage(message: Message): Promise<Message> {
    const client = await connectToDatabase();
    const collection = client.db().collection('messages');
    
    const result = await collection.insertOne(message);
    
    // Cache the message
    const cacheKey = `message:${message.id}`;
    await redisClient.setEx(cacheKey, this.CACHE_TTL, JSON.stringify(message));
    
    return message;
  }

  static async getMessages(): Promise<Message[]> {
    const cacheKey = 'messages:all';
    
    // Try cache first
    const cachedMessages = await redisClient.get(cacheKey);
    if (cachedMessages) {
      return JSON.parse(cachedMessages);
    }

    // If not in cache, get from MongoDB
    const client = await connectToDatabase();
    const collection = client.db().collection('messages');
    
    const messages = (await collection
      .find({})
      .sort({ timestamp: 1 })
      .toArray()).map(doc => ({
        id: doc.id,
        text: doc.text,
        sender: doc.sender,
        timestamp: doc.timestamp,
        status: doc.status
      })) as Message[];

    // Cache the results
    await redisClient.setEx(cacheKey, this.CACHE_TTL, JSON.stringify(messages));

    return messages;
  }

  static async updateMessageStatus(messageId: number, status: MessageStatus): Promise<void> {
    const client = await connectToDatabase();
    const collection = client.db().collection('messages');
    
    await collection.updateOne(
      { id: messageId },
      { $set: { status } }
    );

    // Update cache
    const cacheKey = `message:${messageId}`;
    const cachedMessage = await redisClient.get(cacheKey);
    if (cachedMessage) {
      const message = JSON.parse(cachedMessage);
      message.status = status;
      await redisClient.setEx(cacheKey, this.CACHE_TTL, JSON.stringify(message));
    }

    // Invalidate all messages cache
    await redisClient.del('messages:all');
  }

  static async clearMessages(): Promise<void> {
    const client = await connectToDatabase();
    const collection = client.db().collection('messages');
    
    await collection.deleteMany({});
    
    // Clear all related caches
    await redisClient.del('messages:all');
    // Clear individual message caches
    const keys = await redisClient.keys('message:*');
    if (keys.length > 0) {
      await redisClient.del(keys);
    }
  }
}