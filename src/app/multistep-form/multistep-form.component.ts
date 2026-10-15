import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-multistep-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './multistep-form.component.html',
  styleUrl: './multistep-form.component.scss'
})
export class MultistepFormComponent {

 masterForm: FormGroup;
  currentStep = 1;
  totalSteps = 3;

  constructor(private fb: FormBuilder) {
    // Parent group encompassing sub-groups for each step
    this.masterForm = this.fb.group({
      personalDetails: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required]
      }),
      contactDetails: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required]
      }),
      accountDetails: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]]
      })
    });
  }

  // Helper getters to clean up code and check current step validation
  get personalGroup() { return this.masterForm.get('personalDetails') as FormGroup; }
  get contactGroup() { return this.masterForm.get('contactDetails') as FormGroup; }
  get accountGroup() { return this.masterForm.get('accountDetails') as FormGroup; }

  nextStep() {
    if (this.isStepValid()) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // Ensures user can't advance if the active step contains invalid inputs
  isStepValid(): boolean {
    if (this.currentStep === 1) return this.personalGroup.valid;
    if (this.currentStep === 2) return this.contactGroup.valid;
    return true; 
  }

  // The final  handler
  onSubmit() {
    if (this.masterForm.valid) {
      console.log('Final Payload Submitting to Backend:', this.masterForm.value);
      // Execute your API service here: this.myService.post(this.masterForm.value)
    } else {
      this.masterForm.markAllAsTouched(); // Highlights validation issues
    }
  }
}
