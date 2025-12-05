import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent implements OnInit {
  // Declaración del formulario como FormGroup
  public miForm!: FormGroup;

  /*
  Ejemplo de cómo crear un FormGroup manualmente sin FormBuilder:
  public myForm:FormGroup = new FormGroup({
    // valor 1: valor por defecto
    // valor 2: validaciones síncronas
    // valor 3: validaciones asíncronas
    name: new FormControl('', [], []),
    price: new FormControl(0),
    inStorage: new FormControl(0)
  });
  */

  // Inyectamos FormBuilder para crear formularios más fácilmente
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Inicialización del formulario con validaciones
    this.miForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]], // Campo requerido, mínimo 3 caracteres
      price: [0, [Validators.required, Validators.min(0)]],       // Campo requerido, mínimo 0
      inStorage: [0, [Validators.required, Validators.min(0)]]    // Campo requerido, mínimo 0
    });
  }

  // Verifica si un campo es inválido y ha sido tocado
  isValidateField(field: string): boolean | null {
    return this.miForm.controls[field].errors
      && this.miForm.controls['name'].touched;
  }

  // Obtiene el mensaje de error correspondiente a un campo
  getFieldError(field: string): string | null {
    // Si el campo no existe, devolvemos null
    if (!this.miForm.controls[field]) return null;

    // Obtenemos los errores del campo o un objeto vacío si no hay errores
    const errors = this.miForm.controls[field].errors || {};

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

  // Función que se ejecuta al enviar el formulario
  onSave(): void {
    // Si el formulario es inválido, marcamos todos los campos como tocados
    if (this.miForm.invalid) {
      this.miForm.markAllAsTouched(); // Dispara la visualización de errores
      return;
    }

    // Mostramos en consola los valores del formulario
    console.log(this.miForm.value);

    // Reset del formulario con valores por defecto para ciertos campos
    this.miForm.reset({ price: 10, inStorage: 0 });
  }
}



//* Cada uno de esos FormControl tiene propiedades como:

//*.value → valor actual del campo.

//*.errors → objeto con los errores actuales (si no cumple las validaciones).

//*.touched → true si el usuario ya interactuó con el campo.

//*.valid → true si el campo pasa todas las validaciones.

//*.invalid → true si no pasa las validaciones.


