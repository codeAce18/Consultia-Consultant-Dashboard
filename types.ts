// types.ts

export type MessageStatus = 'sent' | 'delivered' | 'read' | 'error';
export type MessageSender = 'user' | 'bot';

export interface Message {
  id: number;
  text: string;
  sender: MessageSender;
  timestamp: string;
  status: MessageStatus;
  fileUrl?: string;
  fileType?: string;
}

export interface WebSocketMessage {
  type: string;
  isTyping: boolean;
}

export interface ApiResponse {
  response: string;
  error?: string;
}

export interface UploadResponse {
  url: string;
  error?: string;
}

export interface MessageStatusProps {
  status: MessageStatus;
}

export interface ChatError {
  message: string;
  code?: string;
}