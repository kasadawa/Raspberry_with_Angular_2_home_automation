import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';

// Avoid name not found warnings
declare var auth0: any;

@Injectable()
export class Auth {

  // Configure Auth0
  auth0 = new auth0.WebAuth({
    domain: 'kasadawa.eu.auth0.com',
    clientID: 'h8Hwu2EUPjM7X7XuuPArUCFqBk7IBPka',
    // specify your desired callback URL
    callbackURL: 'http://196.168.100.2:4444/user-login',
    responseType: 'token id_token'
  });

  constructor(private router: Router) {
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err:any, authResult:any) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        this.router.navigate(['']);
      } else if (authResult && authResult.error) {
        alert('Error: ' + authResult.error);
      }
    });

    
  }

  public login(username: string, password: string): void {
    this.auth0.client.login({
      realm: 'Username-Password-Authentication',
      username,
      password
    }, (err:any, authResult:any) => {
      if (err) {
        alert('Error: ' + err.description);
        return;
      }
      if (authResult && authResult.idToken && authResult.accessToken) {
        this.setUser(authResult);
        this.router.navigate(['/home']);
      }
    });
  }

  public signup(email:any, password:any): void {
    this.auth0.redirect.signupAndLogin({
      connection: 'Username-Password-Authentication',
      email,
      password,
    }, function(err:any) {
      if (err) {
        alert('Error: ' + err.description);
      }
    });
  }

 
  public isAuthenticated(): boolean {
    // Check whether the id_token is expired or not
    return tokenNotExpired();
  }

  public logout(): void {
    // Remove token from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
  }

  private setUser(authResult:any): void {
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
  }
}