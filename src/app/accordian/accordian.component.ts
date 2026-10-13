import { Component ,Input} from '@angular/core';
import { NgFor,NgIf } from '@angular/common';

@Component({
  selector: 'app-accordian',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './accordian.component.html',
  styleUrl: './accordian.component.scss'
})
export class AccordianComponent {
  @Input() items:any[]=[];
  @Input() isOpen:boolean=false;
  currentIndex:Number=0;
  onToggle(index:Number){
    this.currentIndex=index;
    

  }

}
