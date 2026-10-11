import { Component, EventEmitter, inject, Inject, Output, output } from '@angular/core';
import { UserService } from '../user.service';
import {
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-auto-search',
  standalone: true,
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './auto-search.component.html',
  styleUrl: './auto-search.component.scss',
})
export class AutoSearchComponent {
  @Output() searchEmit=new EventEmitter()
  private userService = inject(UserService);

  serachForm = new FormGroup({
    serachTeram: new FormControl(''),
  });
  ngOnInit() {
    this.serachForm.controls.serachTeram.valueChanges
      .pipe(
        map((value) => value ?? ''),
        debounceTime(500),
        distinctUntilChanged(),
        
      )
      .subscribe((results) => {
        this.searchEmit.emit(results)

        // Handle your search results here
      });
  }

  getSearch() {}
}
