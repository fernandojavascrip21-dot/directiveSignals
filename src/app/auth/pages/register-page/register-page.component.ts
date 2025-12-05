import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import * as customValidatora from '../../../shared/validators/validators';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent implements OnInit {
  public myForm!:FormGroup;

  constructor(
    private fb:FormBuilder,
    private validatorService:ValidatorsService,
    private emailValidator:EmailValidatorService
  ){}

  ngOnInit(): void {
    this.myForm=this.fb.group({
      name:['',[Validators.required,Validators.pattern(this.validatorService.firstNameAndLastnamePattern.trim())]],
      email:['',[Validators.required,Validators.pattern(this.validatorService.emailPattern) ], [this.emailValidator.validate]],
      username:['',[Validators.required, this.validatorService.catBeStrider]],
      password:['',[Validators.required, Validators.minLength(6)]],
      password2:['',[Validators.required, Validators.minLength(6)]]
    },{
      validators:[
        this.validatorService.esFieldOneEquealFieldTwo('password','password2')
      ]
    });
  };

  isValidate(field:string){
    // TODO: Obtener la validacion desde un servicio
    return this.validatorService.isValid(this.myForm, field)
    console.log(this.myForm)
  }

    onSave(){
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }
     this.myForm.reset();
  }
}
