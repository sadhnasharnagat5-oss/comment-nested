export interface Comment {
  id: string;
  author: string;
  text: string;
  replies?: Comment[];
}

export interface ReplyPayload {
  parentId: string;  // The ID of the comment being replied to
  text: string;      // The content of the reply
}
