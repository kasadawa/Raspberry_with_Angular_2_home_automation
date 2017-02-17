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
var TimerModalComponent = (function () {
    function TimerModalComponent(deviceservice) {
        this.deviceservice = deviceservice;
        //bind the function chageDeviceState from GetDevicesComponent
        this.changeDevicestate = new core_1.EventEmitter();
        this.startTime = new Date();
        this.endTime = new Date();
        this.devices = [];
        this.devices = this.deviceservice.devices._value;
        this.socket = this.deviceservice.getSocket();
    }
    TimerModalComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.socket.on('getTimer', function (device) {
            for (var index = 0; index < _this.devices.length; index++) {
                if (_this.devices[index]._id == device._id) {
                    _this.devices[index].onTimer = device.onTimer;
                    _this.devices[index].state = device.state;
                    _this.buttonStrings[index] = device.state ? 'Turn Off' : 'Turn On';
                    break;
                }
            }
            ;
        });
    };
    TimerModalComponent.prototype.setTimer = function (device, trigger) {
        var duration = this.getDurationTime();
        if (duration < 0) {
            alert("The duration is not properly setted! ");
            return;
        }
        this.device.onTimer = trigger;
        var data = {
            duration: duration,
            trigger: trigger,
            device: device,
        };
        this.socket.emit('setTimer', data);
    };
    TimerModalComponent.prototype.getDurationTime = function () {
        var minutes = this.endTime.getMinutes() - this.startTime.getMinutes();
        var hours = this.endTime.getHours() - this.startTime.getHours();
        //
        if (hours != 0)
            hours *= 60;
        return Math.round(minutes + hours);
    };
    // specific for the modal  
    TimerModalComponent.prototype.show = function () {
        //workaround for version 2.2.xx
        this.lgModal.config.backdrop = false;
        this.lgModal.show();
    };
    TimerModalComponent.prototype.hide = function () {
        this.lgModal.config.backdrop = true;
        this.lgModal.hide();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Device_1.Device)
    ], TimerModalComponent.prototype, "device", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TimerModalComponent.prototype, "buttonStrings", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TimerModalComponent.prototype, "changeDevicestate", void 0);
    __decorate([
        core_1.ViewChild('lgModal'), 
        __metadata('design:type', ng2_bootstrap_1.ModalDirective)
    ], TimerModalComponent.prototype, "lgModal", void 0);
    TimerModalComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'timer',
            templateUrl: "./timer-modal.html",
        }), 
        __metadata('design:paramtypes', [device_service_1.DeviceService])
    ], TimerModalComponent);
    return TimerModalComponent;
}());
exports.TimerModalComponent = TimerModalComponent;
//# sourceMappingURL=timer-modal.component.js.map