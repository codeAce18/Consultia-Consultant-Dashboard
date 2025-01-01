import React, { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import { Send, Check, CheckCheck, Bot, Loader2, Image as ImageIcon, X, RefreshCcw, User } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

import Image from "next/image"

import ImageProfile from "../../public/assets/ImageProfile.svg"

import { WebSocketMessage, ApiResponse, UploadResponse, MessageStatus, ChatError  } from '@/types';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://your-actual-api-endpoint/chat';
const UPLOAD_ENDPOINT = process.env.NEXT_PUBLIC_UPLOAD_ENDPOINT || 'http://your-actual-api-endpoint/upload';
// const USER_AVATAR = process.env.NEXT_PUBLIC_USER_AVATAR || '/default-avatar.jpg';

import { Input } from '@/components/ui/input';
import { Separator } from "@/components/ui/separator"
import { SearchIcon } from 'lucide-react';

type Sender = 'user' | 'bot';
type Status = 'sent' | 'delivered' | 'read' | 'error';

interface Message {
  id: number;
  text: string;
  sender: Sender;
  timestamp: string;
  status: Status;
  fileUrl?: string; // Optional property
  fileType?: string; // Optional property
}




const ChatContent: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const wsRef = useRef<WebSocket | null>(null);
  
    // WebSocket Connection Setup with type safety
    useEffect(() => {
      const setupWebSocket = (): void => {
        try {
          const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_ENDPOINT || 'ws://your-websocket-server');
          wsRef.current = ws;
  
          ws.onopen = () => {
            console.log('WebSocket Connected');
          };
  
          ws.onmessage = (event: MessageEvent) => {
            try {
              const data = JSON.parse(event.data) as WebSocketMessage;
              if (data.type === 'typing') {
                setIsTyping(data.isTyping);
              }
            } catch (error) {
              console.error('Failed to parse WebSocket message:', error);
            }
          };
  
          ws.onerror = (error: Event) => {
            console.error('WebSocket Error:', error);
          };
  
          ws.onclose = () => {
            setTimeout(setupWebSocket, 3000);
          };
        } catch (error) {
          console.error('WebSocket connection error:', error);
        }
      };
  
      setupWebSocket();
      return () => {
        wsRef.current?.close();
      };
    }, []);
  
    // Load messages from localStorage with type checking
    useEffect(() => {
      const savedMessages = localStorage.getItem('chatMessages');
      if (savedMessages) {
        try {
          const parsed = JSON.parse(savedMessages);
          if (Array.isArray(parsed) && parsed.every(isValidMessage)) {
            setMessages(parsed);
          }
        } catch (error) {
          console.error('Error parsing saved messages:', error);
        }
      }
    }, []);
  
    // Type guard for Message
    const isValidMessage = (message: unknown): message is Message => {
      return (
        typeof message === 'object' &&
        message !== null && // Ensure it's not null
        typeof (message as Message).id === 'number' &&
        typeof (message as Message).text === 'string' &&
        ['user', 'bot'].includes((message as Message).sender) &&
        typeof (message as Message).timestamp === 'string' &&
        ['sent', 'delivered', 'read', 'error'].includes((message as Message).status)
      );
    };
  
    // Save messages to localStorage
    useEffect(() => {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }, [messages]);
  
    // Auto scroll to bottom
    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
  
    // Handle file selection with type safety
    const handleFileSelect = (event: ChangeEvent<HTMLInputElement>): void => {
      const file = event.target.files?.[0];
      if (file) {
        if (file.size > MAX_FILE_SIZE) {
          setError('File size should be less than 5MB');
          return;
        }
        
        if (file.type.startsWith('image/')) {
          setSelectedFile(file);
          const url = URL.createObjectURL(file);
          setPreviewUrl(url);
        } else {
          setError('Please select an image file (JPG, PNG, GIF)');
        }
      }
    };
  
    // Clear selected file
    const clearSelectedFile = (): void => {
      setSelectedFile(null);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };
  
    // API call with retry mechanism and type safety
    const fetchBotResponse = async (message: string, retryCount = 0): Promise<string> => {
      try {
        setIsLoading(true);
        setError(null);
  
        const response = await fetch(API_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message }),
        });
  
        if (!response.ok) {
          const errorData: ChatError = await response.json().catch(() => ({ message: 'Unknown error occurred' }));
          throw new Error(errorData.message || `API request failed with status ${response.status}`);
        }
  
        const data: ApiResponse = await response.json();
        if (!data.response) {
          throw new Error('Invalid response format from API');
        }
        return data.response;
      } catch (error) {
        console.error('API Error:', error);
        if (retryCount < MAX_RETRIES) {
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (retryCount + 1)));
          return fetchBotResponse(message, retryCount + 1);
        }
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
  
    // Upload file with type safety
    const uploadFile = async (file: File): Promise<string> => {
      try {
        const formData = new FormData();
        formData.append('file', file);
  
        const response = await fetch(UPLOAD_ENDPOINT, {
          method: 'POST',
          body: formData,
        });
  
        if (!response.ok) {
          const errorData: ChatError = await response.json().catch(() => ({ message: 'Upload failed' }));
          throw new Error(errorData.message || 'File upload failed');
        }
  
        const data: UploadResponse = await response.json();
        if (!data.url) {
          throw new Error('Invalid upload response format');
        }
        return data.url;
      } catch (error) {
        console.error('Upload Error:', error);
        throw new Error('Failed to upload image. Please try again.');
      }
    };
  
    // Handle send message with type safety
    const handleSendMessage = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      
      if (!inputMessage.trim() && !selectedFile) return;
  
      let fileUrl: string | undefined;
      if (selectedFile) {
        try {
          fileUrl = await uploadFile(selectedFile);
        } catch (error) {
          setError(error instanceof Error ? error.message : 'Failed to upload file');
          return;
        }
      }
  
      const userMessage: Message = {
        id: Date.now(),
        text: inputMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString(),
        status: 'sent',
        fileUrl,
        fileType: selectedFile?.type
      };
  
      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');
      clearSelectedFile();
  
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ type: 'typing', isTyping: true }));
      }
  
      try {
        const response = await fetchBotResponse(inputMessage);
        
        setMessages(prev => prev.map(msg => 
          msg.id === userMessage.id ? { ...msg, status: 'delivered' } : msg
        ));
  
        const botMessage: Message = {
          id: Date.now() + 1,
          text: response,
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString(),
          status: 'delivered'
        };
  
        setMessages(prev => [...prev, botMessage]);
  
        setTimeout(() => {
          setMessages(prev => prev.map(msg => 
            msg.id === userMessage.id ? { ...msg, status: 'read' } : msg
          ));
        }, 1000);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to get response. Please try again.');
        setMessages(prev => prev.map(msg => 
          msg.id === userMessage.id ? { ...msg, status: 'error' } : msg
        ));
      }
  
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ type: 'typing', isTyping: false }));
      }
    };
  
    // MessageStatus component with proper typing
    const MessageStatus: React.FC<{ status: MessageStatus }> = ({ status }) => {
      switch (status) {
        case 'sent':
          return <Check className="w-4 h-4 text-gray-400" />;
        case 'delivered':
          return <CheckCheck className="w-4 h-4 text-gray-400" />;
        case 'read':
          return <CheckCheck className="w-4 h-4 text-blue-500" />;
        case 'error':
          return <RefreshCcw className="w-4 h-4 text-red-500" />;
        default:
          return null;
      }
    };
  
    const retryMessage = async (messageId: number): Promise<void> => {
      const message = messages.find(msg => msg.id === messageId);
      if (message) {
        setMessages(prev => prev.filter(msg => msg.id !== messageId));
        const newMessage = { ...message, status: 'sent' as const };
        setMessages(prev => [...prev, newMessage]);
        try {
          // const response = await fetchBotResponse(message.text);
          const event = { preventDefault: () => {} } as FormEvent<HTMLFormElement>;
          await handleSendMessage(event);
        } catch (error) {
          setError('Retry failed. Please try again.');
        }
      
    }

  };

    
 
    return (
        <div>
             {/*  Messages Header for the Dashboard Screen */}
            <div className="flex">
                <div>
                    <div className="flex items-center gap-10">
                        <h1 className="text-[20px] leading-[30px] text-[#101828] font-bold whitespace-nowrap">Message</h1>
                        <div>
                            <div className="relative flex items-center w-[479px] h-[40px] mx-auto">
                                <Input
                                    type="text"
                                    placeholder="Search..."
                                    className="pr-10 pl-10 py-2 border-none bg-[#F0F0F9] rounded-[100px]  w-full text-gray-800 focus:outline-none focus:ring focus:ring-blue-300"
                                />

                                <div className="absolute left-3">
                                    <SearchIcon className="w-[24px] h-[24px] text-gray-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 



            <div className="pt-[24px]">
                <Separator />
            </div>


            <div className="flex flex-col h-screen w-full mx-auto p-4">
                {/* Chat Header */}
                <div className=" p-4 rounded-t-lg  flex justify-between items-center">
                    <div className="flex items-center gap-[8px]">
                        <Image src={ImageProfile} alt="ImageProfile" />

                        <div>
                            <h1 className="text-[#101828] text-[13px] leading-[19.5px] font-semibold">Bankole Onafuwa</h1>

                            <p className="text-[#41404B] text-[10px] leading-[15px] font-medium">Online</p>
                        </div>
                    </div>
                    <button 
                    onClick={() => {
                        setMessages([]);
                        localStorage.removeItem('chatMessages');
                    }}
                    className="px-3 py-1 text-sm text-red-500 hover:bg-red-50 rounded"
                    >
                    Clear Chat
                    </button>
                </div>

                {/* Error Alert */}
                {error && (
                    <Alert variant="destructive" className="mb-4">
                    <AlertDescription>{error}</AlertDescription>
                    <button 
                        onClick={() => setError(null)}
                        className="absolute right-2 top-2"
                    >
                        <X className="w-4 h-4" />
                    </button>
                    </Alert>
                )}

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F5F5FF]">
                    {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        {message.sender === 'bot' && (
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                            <Bot className="w-5 h-5 text-gray-600" />
                        </div>
                        )}
                        <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                            message.sender === 'user'
                            ? 'bg-[#5B52B6] text-white'
                            : 'bg-gray-200 text-gray-800'
                        }`}
                        >
                        {message.fileUrl && message.fileType?.startsWith('image/') && (
                            <img 
                            src={message.fileUrl} 
                            alt="Shared image" 
                            className="max-w-full rounded-lg mb-2"
                            />
                        )}
                        {message.text && <p>{message.text}</p>}
                        <div className="flex items-center justify-end gap-1 mt-1">
                            <span className="text-xs opacity-70">{message.timestamp}</span>
                            {message.sender === 'user' && (
                            <>
                                <MessageStatus status={message.status} />
                                {message.status === 'error' && (
                                <button
                                    onClick={() => retryMessage(message.id)}
                                    className="text-xs text-red-300 hover:text-red-400"
                                >
                                    Retry
                                </button>
                                )}
                            </>
                            )}
                        </div>
                        </div>
                        {message.sender === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center ml-2">
                            <User className="w-5 h-5 text-blue-600" />
                        </div>
                        )}
                    </div>
                    ))}
                    {(isLoading || isTyping) && (
                    <div className="flex items-center gap-2 text-gray-500">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Bot is typing...</span>
                    </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* File Preview */}
                {previewUrl && (
                    <div className="bg-gray-100 p-2 rounded-lg mt-2">
                    <div className="relative inline-block">
                        <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className="max-h-32 rounded"
                        />
                        <button
                        onClick={clearSelectedFile}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        >
                        <X className="w-4 h-4" />
                        </button>
                    </div>
                    </div>
                )}

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="bg-white p-4 rounded-b-lg shadow">
                    <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                    >
                        <ImageIcon size={20} />
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        accept="image/*"
                        className="hidden"
                    />
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                        disabled={isLoading || (!inputMessage.trim() && !selectedFile)}
                    >
                        {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                        <Send size={20} />
                        )}
                    </button>
                    </div>
                </form>
            </div>   
        </div>
    )
} 


export default ChatContent;



// import React, { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
// import { Send, Check, CheckCheck, Bot, Loader2, Image as ImageIcon, X, RefreshCcw, User } from 'lucide-react';
// import { Alert, AlertDescription } from '@/components/ui/alert';

// import Image from "next/image"

// import ImageProfile from "../../public/assets/ImageProfile.svg"

// import { MessageService } from '../../services/messageService';
// import { WebSocketService } from '../../services/websocketService';

// import { WebSocketMessage, ApiResponse, UploadResponse, MessageStatus, ChatError  } from '@/types';

// const MAX_RETRIES = 3;
// const RETRY_DELAY = 1000;
// const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://your-actual-api-endpoint/chat';
// const UPLOAD_ENDPOINT = process.env.NEXT_PUBLIC_UPLOAD_ENDPOINT || 'http://your-actual-api-endpoint/upload';
// // const USER_AVATAR = process.env.NEXT_PUBLIC_USER_AVATAR || '/default-avatar.jpg';

// import { Input } from '@/components/ui/input';
// import { Separator } from "@/components/ui/separator"
// import { SearchIcon } from 'lucide-react';

// type Sender = 'user' | 'bot';
// type Status = 'sent' | 'delivered' | 'read' | 'error';

// interface Message {
//   id: number;
//   text: string;
//   sender: Sender;
//   timestamp: string;
//   status: Status;
//   fileUrl?: string; // Optional property
//   fileType?: string; // Optional property
// }




// const ChatContent: React.FC = () => {
//     const [messages, setMessages] = useState<Message[]>([]);
//     const [inputMessage, setInputMessage] = useState<string>('');
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string | null>(null);
//     const [isTyping, setIsTyping] = useState<boolean>(false);
//     const [selectedFile, setSelectedFile] = useState<File | null>(null);
//     const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
//     const messagesEndRef = useRef<HTMLDivElement>(null);
//     const fileInputRef = useRef<HTMLInputElement>(null);
//     const wsRef = useRef<WebSocket | null>(null);
  
//     // WebSocket Connection Setup with type safety
//     useEffect(() => {
//         const setupWebSocket = async () => {
//           try {
//             const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_ENDPOINT || 'ws://your-websocket-server');
//             wsRef.current = ws;
    
//             ws.onopen = () => {
//               console.log('WebSocket Connected');
//               WebSocketService.subscribeToTypingStatus((data) => {
//                 setIsTyping(data.isTyping);
//               });
//             };
    
//             ws.onerror = (error: Event) => {
//               console.error('WebSocket Error:', error);
//             };
    
//             ws.onclose = () => {
//               setTimeout(setupWebSocket, 3000);
//             };
//           } catch (error) {
//             console.error('WebSocket connection error:', error);
//           }
//         };
    
//         setupWebSocket();
//         return () => {
//           wsRef.current?.close();
//         };
//       }, []);



//     useEffect(() => {
//         const loadMessages = async () => {
//           try {
//             const savedMessages = await MessageService.getMessages();
//             setMessages(savedMessages);
//           } catch (error) {
//             console.error('Error loading messages:', error);
//             setError('Failed to load messages');
//           }
//         };
    
//         loadMessages();
//     }, []);


//     // Load messages from localStorage with type checking
//     useEffect(() => {
//       const savedMessages = localStorage.getItem('chatMessages');
//       if (savedMessages) {
//         try {
//           const parsed = JSON.parse(savedMessages);
//           if (Array.isArray(parsed) && parsed.every(isValidMessage)) {
//             setMessages(parsed);
//           }
//         } catch (error) {
//           console.error('Error parsing saved messages:', error);
//         }
//       }
//     }, []);
  
//     // Type guard for Message
//     const isValidMessage = (message: unknown): message is Message => {
//       return (
//         typeof message === 'object' &&
//         message !== null && // Ensure it's not null
//         typeof (message as Message).id === 'number' &&
//         typeof (message as Message).text === 'string' &&
//         ['user', 'bot'].includes((message as Message).sender) &&
//         typeof (message as Message).timestamp === 'string' &&
//         ['sent', 'delivered', 'read', 'error'].includes((message as Message).status)
//       );
//     };
  
//     // Save messages to localStorage
//     useEffect(() => {
//       localStorage.setItem('chatMessages', JSON.stringify(messages));
//     }, [messages]);
  
//     // Auto scroll to bottom
//     useEffect(() => {
//       messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }, [messages]);
  
//     // Handle file selection with type safety
//     const handleFileSelect = (event: ChangeEvent<HTMLInputElement>): void => {
//       const file = event.target.files?.[0];
//       if (file) {
//         if (file.size > MAX_FILE_SIZE) {
//           setError('File size should be less than 5MB');
//           return;
//         }
        
//         if (file.type.startsWith('image/')) {
//           setSelectedFile(file);
//           const url = URL.createObjectURL(file);
//           setPreviewUrl(url);
//         } else {
//           setError('Please select an image file (JPG, PNG, GIF)');
//         }
//       }
//     };
  
//     // Clear selected file
//     const clearSelectedFile = (): void => {
//       setSelectedFile(null);
//       if (previewUrl) {
//         URL.revokeObjectURL(previewUrl);
//       }
//       setPreviewUrl(null);
//       if (fileInputRef.current) {
//         fileInputRef.current.value = '';
//       }
//     };
  
//     // API call with retry mechanism and type safety
//     const fetchBotResponse = async (message: string, retryCount = 0): Promise<string> => {
//       try {
//         setIsLoading(true);
//         setError(null);
  
//         const response = await fetch(API_ENDPOINT, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ message }),
//         });
  
//         if (!response.ok) {
//           const errorData: ChatError = await response.json().catch(() => ({ message: 'Unknown error occurred' }));
//           throw new Error(errorData.message || `API request failed with status ${response.status}`);
//         }
  
//         const data: ApiResponse = await response.json();
//         if (!data.response) {
//           throw new Error('Invalid response format from API');
//         }
//         return data.response;
//       } catch (error) {
//         console.error('API Error:', error);
//         if (retryCount < MAX_RETRIES) {
//           await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (retryCount + 1)));
//           return fetchBotResponse(message, retryCount + 1);
//         }
//         throw error;
//       } finally {
//         setIsLoading(false);
//       }
//     };
  
//     // Upload file with type safety
//     const uploadFile = async (file: File): Promise<string> => {
//       try {
//         const formData = new FormData();
//         formData.append('file', file);
  
//         const response = await fetch(UPLOAD_ENDPOINT, {
//           method: 'POST',
//           body: formData,
//         });
  
//         if (!response.ok) {
//           const errorData: ChatError = await response.json().catch(() => ({ message: 'Upload failed' }));
//           throw new Error(errorData.message || 'File upload failed');
//         }
  
//         const data: UploadResponse = await response.json();
//         if (!data.url) {
//           throw new Error('Invalid upload response format');
//         }
//         return data.url;
//       } catch (error) {
//         console.error('Upload Error:', error);
//         throw new Error('Failed to upload image. Please try again.');
//       }
//     };
  
//     // Handle send message with type safety
//     const handleSendMessage = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
//         e.preventDefault();
        
//         if (!inputMessage.trim() && !selectedFile) return;
    
//         let fileUrl: string | undefined;
//         if (selectedFile) {
//           try {
//             fileUrl = await uploadFile(selectedFile);
//           } catch (error) {
//             setError(error instanceof Error ? error.message : 'Failed to upload file');
//             return;
//           }
//         }
    
//         const userMessage: Message = {
//           id: Date.now(),
//           text: inputMessage,
//           sender: 'user',
//           timestamp: new Date().toLocaleTimeString(),
//           status: 'sent',
//           fileUrl,
//           fileType: selectedFile?.type
//         };
    
//         try {
//           await MessageService.saveMessage(userMessage);
//           setMessages(prev => [...prev, userMessage]);
//           setInputMessage('');
//           clearSelectedFile();
    
//           if (wsRef.current?.readyState === WebSocket.OPEN) {
//             await WebSocketService.publishTypingStatus(true);
//           }
    
//           const response = await fetchBotResponse(inputMessage);
          
//           await MessageService.updateMessageStatus(userMessage.id, 'delivered');
    
//           const botMessage: Message = {
//             id: Date.now() + 1,
//             text: response,
//             sender: 'bot',
//             timestamp: new Date().toLocaleTimeString(),
//             status: 'delivered'
//           };
    
//           await MessageService.saveMessage(botMessage);
//           setMessages(prev => [...prev, botMessage]);
    
//           setTimeout(async () => {
//             await MessageService.updateMessageStatus(userMessage.id, 'read');
//           }, 1000);
//         } catch (error) {
//           setError(error instanceof Error ? error.message : 'Failed to send message');
//           await MessageService.updateMessageStatus(userMessage.id, 'error');
//         }
    
//         if (wsRef.current?.readyState === WebSocket.OPEN) {
//           await WebSocketService.publishTypingStatus(false);
//         }
//       };
    
  
//     // MessageStatus component with proper typing
//     const MessageStatus: React.FC<{ status: MessageStatus }> = ({ status }) => {
//       switch (status) {
//         case 'sent':
//           return <Check className="w-4 h-4 text-gray-400" />;
//         case 'delivered':
//           return <CheckCheck className="w-4 h-4 text-gray-400" />;
//         case 'read':
//           return <CheckCheck className="w-4 h-4 text-blue-500" />;
//         case 'error':
//           return <RefreshCcw className="w-4 h-4 text-red-500" />;
//         default:
//           return null;
//       }
//     };
  
//     const retryMessage = async (messageId: number): Promise<void> => {
//       const message = messages.find(msg => msg.id === messageId);
//       if (message) {
//         setMessages(prev => prev.filter(msg => msg.id !== messageId));
//         const newMessage = { ...message, status: 'sent' as const };
//         setMessages(prev => [...prev, newMessage]);
//         try {
//           // const response = await fetchBotResponse(message.text);
//           const event = { preventDefault: () => {} } as FormEvent<HTMLFormElement>;
//           await handleSendMessage(event);
//         } catch (error) {
//           setError('Retry failed. Please try again.');
//         }
      
//     }

//   };

    
 
//     return (
//         <div>
//              {/*  Messages Header for the Dashboard Screen */}
//             <div className="flex">
//                 <div>
//                     <div className="flex items-center gap-10">
//                         <h1 className="text-[20px] leading-[30px] text-[#101828] font-bold whitespace-nowrap">Message</h1>
//                         <div>
//                             <div className="relative flex items-center w-[479px] h-[40px] mx-auto">
//                                 <Input
//                                     type="text"
//                                     placeholder="Search..."
//                                     className="pr-10 pl-10 py-2 border-none bg-[#F0F0F9] rounded-[100px]  w-full text-gray-800 focus:outline-none focus:ring focus:ring-blue-300"
//                                 />

//                                 <div className="absolute left-3">
//                                     <SearchIcon className="w-[24px] h-[24px] text-gray-500" />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div> 



//             <div className="pt-[24px]">
//                 <Separator />
//             </div>


//             <div className="flex flex-col h-screen w-full mx-auto p-4">
//                 {/* Chat Header */}
//                 <div className=" p-4 rounded-t-lg  flex justify-between items-center">
//                     <div className="flex items-center gap-[8px]">
//                         <Image src={ImageProfile} alt="ImageProfile" />

//                         <div>
//                             <h1 className="text-[#101828] text-[13px] leading-[19.5px] font-semibold">Bankole Onafuwa</h1>

//                             <p className="text-[#41404B] text-[10px] leading-[15px] font-medium">Online</p>
//                         </div>
//                     </div>
//                     <button 
//                     onClick={() => {
//                         setMessages([]);
//                         localStorage.removeItem('chatMessages');
//                     }}
//                     className="px-3 py-1 text-sm text-red-500 hover:bg-red-50 rounded"
//                     >
//                     Clear Chat
//                     </button>
//                 </div>

//                 {/* Error Alert */}
//                 {error && (
//                     <Alert variant="destructive" className="mb-4">
//                     <AlertDescription>{error}</AlertDescription>
//                     <button 
//                         onClick={() => setError(null)}
//                         className="absolute right-2 top-2"
//                     >
//                         <X className="w-4 h-4" />
//                     </button>
//                     </Alert>
//                 )}

//                 {/* Messages Container */}
//                 <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F5F5FF]">
//                     {messages.map((message) => (
//                     <div
//                         key={message.id}
//                         className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//                     >
//                         {message.sender === 'bot' && (
//                         <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
//                             <Bot className="w-5 h-5 text-gray-600" />
//                         </div>
//                         )}
//                         <div
//                         className={`max-w-[70%] rounded-lg p-3 ${
//                             message.sender === 'user'
//                             ? 'bg-[#5B52B6] text-white'
//                             : 'bg-gray-200 text-gray-800'
//                         }`}
//                         >
//                         {message.fileUrl && message.fileType?.startsWith('image/') && (
//                             <img 
//                             src={message.fileUrl} 
//                             alt="Shared image" 
//                             className="max-w-full rounded-lg mb-2"
//                             />
//                         )}
//                         {message.text && <p>{message.text}</p>}
//                         <div className="flex items-center justify-end gap-1 mt-1">
//                             <span className="text-xs opacity-70">{message.timestamp}</span>
//                             {message.sender === 'user' && (
//                             <>
//                                 <MessageStatus status={message.status} />
//                                 {message.status === 'error' && (
//                                 <button
//                                     onClick={() => retryMessage(message.id)}
//                                     className="text-xs text-red-300 hover:text-red-400"
//                                 >
//                                     Retry
//                                 </button>
//                                 )}
//                             </>
//                             )}
//                         </div>
//                         </div>
//                         {message.sender === 'user' && (
//                         <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center ml-2">
//                             <User className="w-5 h-5 text-blue-600" />
//                         </div>
//                         )}
//                     </div>
//                     ))}
//                     {(isLoading || isTyping) && (
//                     <div className="flex items-center gap-2 text-gray-500">
//                         <Loader2 className="w-4 h-4 animate-spin" />
//                         <span>Bot is typing...</span>
//                     </div>
//                     )}
//                     <div ref={messagesEndRef} />
//                 </div>

//                 {/* File Preview */}
//                 {previewUrl && (
//                     <div className="bg-gray-100 p-2 rounded-lg mt-2">
//                     <div className="relative inline-block">
//                         <img 
//                         src={previewUrl} 
//                         alt="Preview" 
//                         className="max-h-32 rounded"
//                         />
//                         <button
//                         onClick={clearSelectedFile}
//                         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
//                         >
//                         <X className="w-4 h-4" />
//                         </button>
//                     </div>
//                     </div>
//                 )}

//                 {/* Message Input */}
//                 <form onSubmit={handleSendMessage} className="bg-white p-4 rounded-b-lg shadow">
//                     <div className="flex gap-2">
//                     <button
//                         type="button"
//                         onClick={() => fileInputRef.current?.click()}
//                         className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
//                     >
//                         <ImageIcon size={20} />
//                     </button>
//                     <input
//                         type="file"
//                         ref={fileInputRef}
//                         onChange={handleFileSelect}
//                         accept="image/*"
//                         className="hidden"
//                     />
//                     <input
//                         type="text"
//                         value={inputMessage}
//                         onChange={(e) => setInputMessage(e.target.value)}
//                         placeholder="Type your message..."
//                         className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     <button
//                         type="submit"
//                         className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
//                         disabled={isLoading || (!inputMessage.trim() && !selectedFile)}
//                     >
//                         {isLoading ? (
//                         <Loader2 className="w-5 h-5 animate-spin" />
//                         ) : (
//                         <Send size={20} />
//                         )}
//                     </button>
//                     </div>
//                 </form>
//             </div>   
//         </div>
//     )
// } 


// export default ChatContent;