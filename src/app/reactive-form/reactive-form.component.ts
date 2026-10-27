import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.scss'
})
export class ReactiveFormComponent {
  private fb =inject(FormBuilder);

  contactForm:FormGroup=this.fb.group({
      firstName:['' , Validators.required],
      lastName:['' , Validators.required],
      email:['' , Validators.required],
      contact:['' , Validators.required],
      addres: this.fb.group({
        area:['' , Validators.required],
        city:['']
      })

    })
    onSubmit(){
      console.log(this.contactForm)
    }
    addFiels(){
      const addressGroup = this.contactForm.get('addres') as FormGroup;
      this.contactForm.addControl('addres','pin')
      console.log(this.contactForm)
    }


  

}
