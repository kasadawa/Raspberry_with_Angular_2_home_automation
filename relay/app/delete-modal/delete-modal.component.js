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
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var device_service_1 = require('../serviceDevices/device.service');
var Device_1 = require('../Device');
var DeleteModalComponent = (function () {
    function DeleteModalComponent(deviceservice) {
        this.deviceservice = deviceservice;
    }
    DeleteModalComponent.prototype.DeleteFunction = function () {
        this.deviceservice.deleteSingleDevice(this.device._id).subscribe(function (res) { return console.log("Single device deleted"); });
        this.hide();
    };
    // specific for the modal  
    DeleteModalComponent.prototype.show = function () {
        //workaround for version 2.2.xx
        this.lgModal.config.backdrop = false;
        this.lgModal.show();
    };
    DeleteModalComponent.prototype.hide = function () {
        this.lgModal.config.backdrop = true;
        this.lgModal.hide();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Device_1.Device)
    ], DeleteModalComponent.prototype, "device", void 0);
    __decorate([
        core_1.ViewChild('lgModal'), 
        __metadata('design:type', ng2_bootstrap_1.ModalDirective)
    ], DeleteModalComponent.prototype, "lgModal", void 0);
    DeleteModalComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'delete',
            templateUrl: "./delete-modal.html",
        }), 
        __metadata('design:paramtypes', [device_service_1.DeviceService])
    ], DeleteModalComponent);
    return DeleteModalComponent;
}());
exports.DeleteModalComponent = DeleteModalComponent;
//# sourceMappingURL=delete-modal.component.js.map