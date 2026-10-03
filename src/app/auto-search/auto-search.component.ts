import { Component, inject, Inject } from '@angular/core';
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
        switchMap((val: any) => this.userService.userSearch(val)),
      )
      .subscribe((results) => {
        console.log(results);

        // Handle your search results here
      });
  }

  getSearch() {}
}
