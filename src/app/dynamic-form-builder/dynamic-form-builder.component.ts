import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicForm } from '../model/dynamicform.model';
import { data } from '../model/data';

@Component({
  selector: 'app-dynamic-form-builder',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, NgTemplateOutlet],
  templateUrl: './dynamic-form-builder.component.html',
  styleUrl: './dynamic-form-builder.component.scss'
})
export class DynamicFormBuilderComponent implements OnInit {

  private fb: FormBuilder = inject(FormBuilder);
  currentPage = 1;
  form!: FormGroup; // 👈 Holds the constructed FormGroup

  myFormSchema: DynamicForm[] = data

  ngOnInit() {
    this.form = this.buildFormGroup(this.myFormSchema);
  }
  
  buildFormGroup(schema: DynamicForm[]): FormGroup {
    const group: any = {};
    const sortedSchema = [...schema].sort((a, b) => a.order - b.order);

    sortedSchema.forEach(field => {
      if (field.type === 'button' || field.type === 'submit') return;
      
      if (field.type === 'group' && field.children) {
        group[field.key] = this.buildFormGroup(field.children);
      } else {
        const validators = field.required ? [Validators.required] : [];
        group[field.key] = this.fb.control(field.value || '', validators);
      }
    });
    console.log(this.fb.group(group))

    return this.fb.group(group);
  }

  asFormGroup(control: AbstractControl | null | undefined): FormGroup {
    return control as FormGroup;
  }



  onDynamicButtonClick(val: any) {
    console.log(val);
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Submitted Payload:', this.form.value);
    }
  }
}
