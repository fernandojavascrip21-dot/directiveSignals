
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { delay, Observable, of } from 'rxjs';

@Injectable({providedIn: 'root'})

export class EmailValidatorService implements AsyncValidator {

  validate(control: AbstractControl):Observable<ValidationErrors | null> {
    const email=control.value;

    const httpCallObservable= new Observable<ValidationErrors | null >((suscriber)=>{
      console.log({email})
      if(email=== 'fernando@google.com'){
        suscriber.next({emailToken:true});
        suscriber.complete();
      }
      suscriber.next(null)
      suscriber.complete();

    }).pipe(
      delay(300)
    )
    return httpCallObservable;
  }




  /*
  validate(control: AbstractControl):Observable<ValidationErrors | null> {
    const email=control.value;
    console.log(email)

   return of({
      emailTaken:true
    })
  }
  */
}
