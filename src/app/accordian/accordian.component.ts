import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-accordian',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './accordian.component.html',
  styleUrl: './accordian.component.scss',
})
export class AccordianComponent {
  @Input() items: any[] = [];
  currentIndex: any = -1;
  onToggle(index: any) {
    if (this.currentIndex !== index) {
      this.currentIndex = index;
    } else {
      this.currentIndex = -1;
    }
  }
}
