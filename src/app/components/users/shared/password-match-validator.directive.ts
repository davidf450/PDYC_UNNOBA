import {
  FormGroup,
  Validators,
  FormControl,
  FormGroupDirective,
  NgForm,
  ValidatorFn,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

export class CustomValidators {
  /**
   * Validates that child controls in the form group are equal
   */
  static childrenEqual: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const f = control as FormGroup;

    const [firstControlName, ...otherControlNames] = Object.keys(
      f.controls || {}
    );

    if (f.get(firstControlName) == null) {
      return null;
    }

    otherControlNames.forEach(controlName => {
      if (f.get(controlName) == null) {
        return null;
      }
    });

    const isValid = otherControlNames.every(
      controlName =>
        f.get(controlName)!.value === f.get(firstControlName)!.value
    );
    return isValid ? null : { childrenNotEqual: true };
  };
}

/**
 * Custom ErrorStateMatcher which returns true (error exists) when the parent form group is invalid and the control has been touched
 */
export class ConfirmValidParentMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return control.parent.invalid && control.touched;
  }
}
/**
 * Collection of reusable error messages
 */
export const errorMessages: { [key: string]: string } = {
  required: 'Campo obligatorio',
  userInUse: 'Nombre de usuario no disponible',
  fullName: 'Full name must be between 1 and 128 characters',
  email: 'Email must be a valid email address (username@domain)',
  confirmEmail: 'Email addresses must match',
  password: 'La contraseña debe tener al menos 6 caracteres',
  confirmPassword: 'Las contraseñas no coinciden',
  cuit: 'El cuit debe tener al menos 11 caracteres',
  remito: 'El remito debe tener  8 caracteres',

};
