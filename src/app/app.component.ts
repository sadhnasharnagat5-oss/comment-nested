import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common'; // 1. Import CommonModule
import { CommentComponent } from './comment/comment.component';
import { ReplyPayload,Comment } from './comment.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,CommentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'practice';
  mockComments = [
    {
      id: '1',
      author: 'Alice',
      text: 'Is this framework beginner friendly?',
      timestamp: new Date(),
      replies: [
        {
          id: '2',
          author: 'Bob',
          text: 'Yes! The documentation is incredibly thorough.',
          timestamp: new Date(),
          replies: [
            {
              id: '3',
              author: 'Charlie',
              text: 'Agreed, just start with standalone components.',
              timestamp: new Date(),
              replies: []
            }
          ]
        },
        {
          id: '4',
          author: 'Dave',
          text: 'It has a bit of a learning curve compared to others.',
          timestamp: new Date(),
          replies: []
        }
      ]
    }
  ];

  ngOnInit() { 
    
  }
  onEnterPressed(event:any){
    console.log("here")
    const textarea = event.target as HTMLTextAreaElement;
    let message = textarea.value.trim();

    if (message) {
      console.log('Form submitted with text:', message);
      
      // Clear the textarea after submission if needed
      textarea.value = ''; 
      let obj:any={
          id: this.mockComments.length+1,
          author: 'Dave',
          text: message,
          timestamp: new Date(),
          replies: []
        }
      this.mockComments.push(obj);
      console.log(this.mockComments)
    }

  }
  onReplyReceived(payload: ReplyPayload): void {
    // console.log('Adding reply to parent ID:', payload);
    
    const newReply: Comment = {
      id: Math.random().toString(), // Generate a unique ID
      author: 'Current User',
      text: payload.text,
      replies: []
    };
    this.addReplyRecursively(this.mockComments, payload.parentId, newReply);
  }
  
  private addReplyRecursively(comments: Comment[], parentId: string, newReply: Comment): boolean {
    for (let comment of comments) {
      if (comment.id === parentId) {
        if (!comment.replies) comment.replies = [];
        comment.replies.push(newReply);
        return true; // Stop searching once found
      }
      if (comment.replies && comment.replies.length > 0) {
        const found = this.addReplyRecursively(comment.replies, parentId, newReply);
        if (found) return true;
      }
    }
    return false;
  }

}