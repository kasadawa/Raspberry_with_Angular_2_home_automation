"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var angular2_jwt_1 = require('angular2-jwt');
var router_1 = require('@angular/router');
var Auth = (function () {
    function Auth(router) {
        this.router = router;
        // Configure Auth0
        this.auth0 = new auth0.WebAuth({
            domain: 'kasadawa.eu.auth0.com',
            clientID: 'h8Hwu2EUPjM7X7XuuPArUCFqBk7IBPka',
            // specify your desired callback URL
            callbackURL: 'http://196.168.100.2:4444/user-login',
            responseType: 'token id_token'
        });
    }
    Auth.prototype.handleAuthentication = function () {
        var _this = this;
        this.auth0.parseHash(function (err, authResult) {
            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = '';
                localStorage.setItem('access_token', authResult.accessToken);
                localStorage.setItem('id_token', authResult.idToken);
                _this.router.navigate(['']);
            }
            else if (authResult && authResult.error) {
                alert('Error: ' + authResult.error);
            }
        });
    };
    Auth.prototype.login = function (username, password) {
        var _this = this;
        this.auth0.client.login({
            realm: 'Username-Password-Authentication',
            username: username,
            password: password
        }, function (err, authResult) {
            if (err) {
                alert('Error: ' + err.description);
                return;
            }
            if (authResult && authResult.idToken && authResult.accessToken) {
                _this.setUser(authResult);
                _this.router.navigate(['/home']);
            }
        });
    };
    Auth.prototype.signup = function (email, password) {
        this.auth0.redirect.signupAndLogin({
            connection: 'Username-Password-Authentication',
            email: email,
            password: password,
        }, function (err) {
            if (err) {
                alert('Error: ' + err.description);
            }
        });
    };
    Auth.prototype.isAuthenticated = function () {
        // Check whether the id_token is expired or not
        return angular2_jwt_1.tokenNotExpired();
    };
    Auth.prototype.logout = function () {
        // Remove token from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
    };
    Auth.prototype.setUser = function (authResult) {
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
    };
    Auth = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router])
    ], Auth);
    return Auth;
}());
exports.Auth = Auth;
//# sourceMappingURL=auth.service.js.map