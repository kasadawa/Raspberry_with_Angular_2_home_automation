import { Component } from '@angular/core';
import { Auth } from './auth.service';

@Component({
  moduleId:module.id,
  selector: 'login',
  templateUrl: 'auth.html'
})
export class LoginComponent {
  constructor(private auth: Auth) {}
}