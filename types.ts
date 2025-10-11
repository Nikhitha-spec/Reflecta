export enum Emotion {
  Happy = 'Happy',
  Sad = 'Sad',
  Anxious = 'Anxious',
  Stressed = 'Stressed',
  Grateful = 'Grateful',
  Lonely = 'Lonely',
  Overwhelmed = 'Overwhelmed',
}

export enum RequestStatus {
  Pending = 'Pending',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
}

export interface User {
  username: string;
  email: string;
  profilePic: string;
  status: string;
}

export interface JournalEntry {
  id: string;
  author: string;
  content: string;
  emotion: Emotion;
  timestamp: string;
  reactions: number;
}

export interface ConnectionRequest {
  id: string;
  fromUser: string;
  toUser: string;
  status: RequestStatus;
  timestamp: string;
  emotion: Emotion;
  profilePic?: string;
}

export interface Connection {
  id: string;
  users: string[];
  profilePics: string[];
  timestamp: string;
  emotion: Emotion;
}

export interface VoiceNote {
  id: string;
  url: string;
  timestamp: string;
  emotion?: Emotion;
}

export interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
  status: 'sent' | 'read';
  reactions?: { [key: string]: string[] };
}
