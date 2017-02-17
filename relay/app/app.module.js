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
var platform_browser_1 = require('@angular/platform-browser');
//for ng-model
var forms_1 = require('@angular/forms');
//root component
var app_component_1 = require('./app.component');
//myComponents
var adddevices_component_1 = require('./addDevices/adddevices.component');
var getdevices_component_1 = require('./getDevices/getdevices.component');
var delete_modal_component_1 = require('./delete-modal/delete-modal.component');
var timer_modal_component_1 = require('./timer-modal/timer-modal.component');
//ng-bootstrap 
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
//font-awesome
var angular2_fontawesome_1 = require('angular2-fontawesome/angular2-fontawesome');
// for nodejs
var http_1 = require('@angular/http');
//Authentication 
var angular2_jwt_1 = require('angular2-jwt');
var device_service_1 = require('./serviceDevices/device.service');
var router_1 = require('@angular/router');
var login_component_1 = require('./authentication/login.component');
var appRoutes = [
    // { path: '', component: AppComponent },
    { path: 'user-login', component: login_component_1.LoginComponent },
    { path: '**', redirectTo: '' },
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                ng2_bootstrap_1.TabsModule.forRoot(),
                ng2_bootstrap_1.ModalModule.forRoot(),
                ng2_bootstrap_1.PopoverModule.forRoot(),
                ng2_bootstrap_1.TimepickerModule.forRoot(),
                router_1.RouterModule.forRoot(appRoutes),
                angular2_fontawesome_1.Angular2FontawesomeModule
            ],
            providers: [angular2_jwt_1.AUTH_PROVIDERS, device_service_1.DeviceService],
            declarations: [app_component_1.AppComponent,
                adddevices_component_1.AddDevicesComponent,
                getdevices_component_1.GetDevicesComponent,
                delete_modal_component_1.DeleteModalComponent,
                timer_modal_component_1.TimerModalComponent,
                login_component_1.LoginComponent],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map