import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReplyPayload } from '../comment.model';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  @Input() comment!:any;
  @Output() replySubmitted = new EventEmitter<ReplyPayload>();

  isReplying = false;

  toggleReplyForm(): void {
    this.isReplying = !this.isReplying;
  }

  submitReply(textarea: HTMLTextAreaElement): void {
    const text = textarea.value.trim();
        console.log("here",text)

    if (!text) return;

    // Emit the payload up
    this.replySubmitted.emit({
      parentId: this.comment.id,
      text: text
    });

    // Reset local state
    textarea.value = '';
    this.isReplying = false;
  }

  // Intercepts replies from child components and forwards them up the chain
  forwardReply(payload: ReplyPayload): void {
    this.replySubmitted.emit(payload);
  }


}
