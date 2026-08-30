import { Component } from '@angular/core';

@Component({
  selector: 'app-signal',
  standalone: true,
  imports: [],
  templateUrl: './signal.component.html',
  styleUrl: './signal.component.scss'
})
export class SignalComponent {
  count=0
    increMent(){
    this.count++;
    console.log(this.count)

    }
    dreMent(){
    this.count--;
    console.log(this.count)
    }
}
