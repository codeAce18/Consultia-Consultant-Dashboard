import { redisClient } from '../lib/redis';
import { WebSocketMessage } from '../types';

export class WebSocketService {
  static async publishTypingStatus(isTyping: boolean): Promise<void> {
    const message: WebSocketMessage = {
      type: 'typing',
      isTyping
    };
    await redisClient.publish('typing_status', JSON.stringify(message));
  }

  static async subscribeToTypingStatus(callback: (message: WebSocketMessage) => void): Promise<void> {
    const subscriber = redisClient.duplicate();
    await subscriber.connect();
    
    await subscriber.subscribe('typing_status', (message) => {
      try {
        const parsedMessage = JSON.parse(message) as WebSocketMessage;
        callback(parsedMessage);
      } catch (error) {
        console.error('Error parsing typing status message:', error);
      }
    });
  }
}