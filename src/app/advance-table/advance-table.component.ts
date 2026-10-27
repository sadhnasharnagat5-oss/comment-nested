import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,ReactiveFormsModule} from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-advance-table',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './advance-table.component.html',
  styleUrl: './advance-table.component.scss'
})
export class AdvanceTableComponent implements OnInit {

  
  private fb:FormBuilder=inject(FormBuilder);
  searchForm!:FormGroup;
  ngOnInit(){
    this.searchForm = this.fb.group({
      searchText: ['']
    });

    this.searchForm.get('searchText')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((val)=>{
      console.log(val)
    })
    
  }

}
