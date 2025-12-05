import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent implements OnInit {
  public myForm!:FormGroup;



  constructor(private fb:FormBuilder){}


  ngOnInit(): void {
    this.myForm=this.fb.group({
      name:['',[Validators.required, Validators.minLength(3)]],
      favoriteGames:this.fb.array([ //*Este es un formArray
        ['Meta Gear', Validators.required],
        ['Death Stranding',Validators.required]
      ])
    })
  }

  public newFavorite:FormControl=new FormControl('',[Validators.required])

get favoriteGames(){
  return this.myForm.get('favoriteGames') as FormArray
}

  // Verifica si un campo es inválido y ha sido tocado
  isValidateField(field: string): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls['name'].touched;
  }


  isValidetFieldArray(formArray:FormArray, index:number){
    return formArray.controls[index].errors && formArray.controls[index].touched

  }


  // Obtiene el mensaje de error correspondiente a un campo
  getFieldError(field: string): string | null {
    // Si el campo no existe, devolvemos null
    if (!this.myForm.controls[field]) return null;

    // Obtenemos los errores del campo o un objeto vacío si no hay errores
    const errors = this.myForm.controls[field].errors || {};

    // Iteramos sobre los tipos de errores presentes
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          // Mostramos el mínimo requerido que indica Angular
          return `El mínimo son ${errors['minlength'].requiredLength} caracteres`;
      }
    }
    return null;
  }

  onAddToFavorites():void{
    if(this.newFavorite.invalid) return;

    const newGame=this.newFavorite.value;
    console.log(this.newFavorite);

    this.favoriteGames.push(
       this.fb.control(newGame, Validators.required)
    );

    this.newFavorite.reset()
  }



onDelteFavorite(index:number){
  this.favoriteGames.removeAt(index)
}
  onSubmit():void{
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }
    (this.myForm.controls['favoriteGames'] as FormArray)=this.fb.array([])

    console.log(this.myForm.value)
    this.myForm.reset();
  }

}
