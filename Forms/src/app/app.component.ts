import { Component } from '@angular/core';

import { TemplateLoginComponent } from './auth/login/template-login.component';
import { SignupComponent } from "./auth/signup/signup.component";
import { ReactiveLoginComponent } from './auth/login/reactive-login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [TemplateLoginComponent, ReactiveLoginComponent, SignupComponent],
})
export class AppComponent {}
