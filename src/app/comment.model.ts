export interface Comment {
  id: string;
  author: string;
  text: string;
  replies?: Comment[];
}

export interface ReplyPayload {
  parentId: string;  
  text: string;     
}
