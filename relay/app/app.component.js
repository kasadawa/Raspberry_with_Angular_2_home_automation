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
var adddevices_component_1 = require('./addDevices/adddevices.component');
var getdevices_component_1 = require('./getDevices/getdevices.component');
var device_service_1 = require('./serviceDevices/device.service');
var auth_service_1 = require('./authentication/auth.service');
var login_component_1 = require('./authentication/login.component');
var AppComponent = (function () {
    function AppComponent(deviceservice, auth) {
        this.deviceservice = deviceservice;
        this.auth = auth;
        this.auth.handleAuthentication();
        if (this.auth.isAuthenticated)
            this.deviceservice.getDevices();
    }
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-app',
            templateUrl: 'app.html',
            entryComponents: [adddevices_component_1.AddDevicesComponent, getdevices_component_1.GetDevicesComponent, login_component_1.LoginComponent],
            providers: [auth_service_1.Auth],
            styleUrls: ['../../node_modules/font-awesome/css/font-awesome.css'],
        }), 
        __metadata('design:paramtypes', [device_service_1.DeviceService, auth_service_1.Auth])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map