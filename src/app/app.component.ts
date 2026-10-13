import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  catchError,
} from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { error } from 'console';
import { AutoSearchComponent } from './auto-search/auto-search.component';
import { PaginationComponent } from './pagination/pagination.component';
import { AccordianComponent } from './accordian/accordian.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AutoSearchComponent,PaginationComponent,AccordianComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'practice';
totalItem:any;
  items = [
    { title: 'What is Angular?', content: 'Angular is a platform and framework for building client-side applications in HTML and TypeScript.' },
    { title: 'What is an Accordion?', content: 'An accordion is a vertically stacked set of interactive headings that each contain a snippet of content.' },
    { title: 'How does machine coding work?', content: 'You write clean, modular code live, handling edge cases like state management and accessibility.' }
  ];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getPagination("")
  }
  // search(event:any){
  //   console.log(event)
  //   of(event).pipe(
  //     switchMap((val:any)=>this.userService.userSearch(val))
  //   ).subscribe((data)=>{
  //     console.log(data)
  //   })

  // }

  getPagination(event:any){
    console.log(event)
    this.userService.getpagination(event).subscribe((data:any)=>{
      this.totalItem=data.total;
      console.log(data)
    })
  }
}
