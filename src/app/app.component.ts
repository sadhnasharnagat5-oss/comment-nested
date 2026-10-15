import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  catchError,
  shareReplay,
} from 'rxjs/operators';
import { forkJoin, Observable, of } from 'rxjs';
import { error } from 'console';
import { AutoSearchComponent } from './auto-search/auto-search.component';
import { PaginationComponent } from './pagination/pagination.component';
import { AccordianComponent } from './accordian/accordian.component';
import { MultistepFormComponent } from './multistep-form/multistep-form.component';
import { FileExplorerComponent } from './file-explorer/file-explorer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AutoSearchComponent,
    PaginationComponent,
    AccordianComponent,
    MultistepFormComponent,
    FileExplorerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'practice';
  totalItem: any;
  items = [
    {
      title: 'What is Angular?',
      content:
        'Angular is a platform and framework for building client-side applications in HTML and TypeScript.',
    },
    {
      title: 'What is an Accordion?',
      content:
        'An accordion is a vertically stacked set of interactive headings that each contain a snippet of content.',
    },
    {
      title: 'How does machine coding work?',
      content:
        'You write clean, modular code live, handling edge cases like state management and accessibility.',
    },
  ];
  private searchCache: { [key: string]: Observable<any> } = {};

  constructor(private userService: UserService) {}

  ngOnInit() {
    // this.getPagination('');
  }

  searchMemo(searchValue: any) {
    const key = JSON.stringify(searchValue);
    if (!this.searchCache[key]) {
      this.searchCache[key] = this.userService.userSearch(searchValue).pipe(
        shareReplay(1),
      );
    }
    this.searchCache[key].subscribe((data) => {
      console.log('Search Data:', data);
    });
  }

  getPagination(event: any) {
    console.log(event);
    this.userService.getpagination(event).subscribe((data: any) => {
      this.totalItem = data.total;
      console.log(data);
    });
  }
}
