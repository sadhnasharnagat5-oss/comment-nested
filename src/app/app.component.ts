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
  concatMap,
  retry,
} from 'rxjs/operators';
import { forkJoin, Observable, of } from 'rxjs';
import { error } from 'console';
import { AutoSearchComponent } from './auto-search/auto-search.component';
import { PaginationComponent } from './pagination/pagination.component';
import { AccordianComponent } from './accordian/accordian.component';
import { MultistepFormComponent } from './multistep-form/multistep-form.component';
import { FileExplorerComponent } from './file-explorer/file-explorer.component';
import { AdvanceTableComponent } from './advance-table/advance-table.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { DynamicFormBuilderComponent } from './dynamic-form-builder/dynamic-form-builder.component';
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
    FileExplorerComponent,
    AdvanceTableComponent,
    ReactiveFormComponent,
    DynamicFormBuilderComponent
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
    // this.getApiDependent()
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
 getApiDependent() {
  this.userService.getUser().pipe(
    switchMap((userVal: any) => {
      
      // Using userVal[0] from your original code in case userVal is an array
      const userId = Array.isArray(userVal) ? userVal[0] : userVal; 
      return this.userService.getPost(userId);
    }),
    switchMap((posts: any) => {

      if (!posts || !Array.isArray(posts) || posts.length === 0) {
        console.warn('Warning: Posts is empty or not an array!');
        return of([]); // Emits an empty array safely without breaking
      }

      const commentObservables = posts.map((post:any,i:any)=>{
        return this.userService.getComment(post).pipe(map(val=>{
          let key= "post" + i;
          return {[key]:post}
        }))
      })

      return forkJoin(commentObservables);
    })
  ).subscribe({
    next: (res) => {
      console.log('4. Final Combined Result:', res); 
    },
    error: (err) => {
      console.error('API Chain Error occurred:', err);
    }
  });
}


}
