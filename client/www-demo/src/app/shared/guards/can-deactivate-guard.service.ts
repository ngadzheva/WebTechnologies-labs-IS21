import { CanDeactivate } from '@angular/router';
import { LoginComponent } from '../../auth/login/login.component';
import { RegistrationComponent } from '../../auth/registration/registration.component';

export class ConfirmDeactivateGuard implements CanDeactivate<LoginComponent | RegistrationComponent> {

  canDeactivate(target: LoginComponent | RegistrationComponent) {
    if(!target.isSubmitted){
        return window.confirm('Напускане на страницата?');
    }
    return true;
  }
}