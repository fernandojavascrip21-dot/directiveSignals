import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent implements OnInit {
  public myForm!:FormGroup;
  constructor(private fb:FormBuilder){}


  ngOnInit(): void {
    this.myForm=this.fb.group({
      gender:["M",Validators.required],
      wanrNotification:[true,Validators.required],
      termsAndConditions:[false,Validators.requiredTrue]
    })
  }

isInvalid(field: string): boolean | null {
  return this.myForm.controls[field].errors
    && this.myForm.controls['termsAndConditions'].touched
}


//ngSubmit
  onSave(){
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }
     this.myForm.reset();
  }
}
