import { Directive, forwardRef, Injectable } from '@angular/core';
import {
  AsyncValidator,
  AbstractControl,
  NG_ASYNC_VALIDATORS,
  ValidationErrors
} from '@angular/forms';
import { Observable } from 'rxjs';
import { UsersApiService } from 'src/app/api/users/users-api.service';

@Injectable({ providedIn: 'root' })
export class UserNameValidator implements AsyncValidator {
  constructor(private userApiService: UsersApiService) {}

  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.userApiService
      .getUserNameValidation(ctrl.value).toPromise()
      .then(
        isTaken => (isTaken ? { usernameInUse: true } : null),
      );
  }
}

@Directive({
  selector: '[appUniqueAlterEgo]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UserNameValidator),
      multi: true
    }
  ]
})

export class UserNameValidatorDirective {
  constructor(private validator: UserNameValidator) {}

  validate(control: AbstractControl) {
    this.validator.validate(control);
  }
}
