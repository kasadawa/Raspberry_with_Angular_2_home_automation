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
var device_service_1 = require('../serviceDevices/device.service');
var timer_modal_component_1 = require('../timer-modal/timer-modal.component');
var delete_modal_component_1 = require('../delete-modal/delete-modal.component');
var GetDevicesComponent = (function () {
    function GetDevicesComponent(deviceservice) {
        this.deviceservice = deviceservice;
        // create fresh copy of the devices array
        this.devices = [];
        //button on/off text
        this.buttonStr = [];
    }
    GetDevicesComponent.prototype.ngOnInit = function () {
        var _this = this;
        //getting all devices objects
        this.deviceservice.devices.subscribe(function (res) {
            _this.devices = res;
            _this.changeButtonString(_this.devices);
        });
    };
    GetDevicesComponent.prototype.changeButtonString = function (devices, index) {
        if (index === void 0) { index = -1; }
        if (index === -1) {
            // init all 
            // include one 
            // delete one
            // delete all 
            this.buttonStr.length = 0;
            for (var i = 0; i < devices.length; i++) {
                if (devices[i].state === false)
                    this.buttonStr.push('Turn On');
                else
                    this.buttonStr.push('Turn Off');
            }
        }
        // special for switchDeviceState() function 
        // if you add [devices].length in the conditions it's not that faster
        if (index !== -1) {
            var tmp = '';
            if (devices.state)
                tmp = 'Turn Off';
            else
                tmp = 'Turn On';
            this.buttonStr[index] = tmp;
        }
    };
    GetDevicesComponent.prototype.changeDeviceState = function (index) {
        var _this = this;
        this.deviceservice.switchDeviceState(this.devices[index]).subscribe(function (updated_device) {
            _this.devices[index].state = updated_device.state;
            // if(this.devices[index].onTimer != up)
            _this.changeButtonString(_this.devices[index], index);
        });
    };
    GetDevicesComponent.prototype.deleteAllDevices = function () {
        this.deviceservice.deleteAllDevices().subscribe(function (res) { return console.log('devices are deleted'); });
    };
    GetDevicesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'get-devices',
            templateUrl: './getdevices.html',
            entryComponents: [timer_modal_component_1.TimerModalComponent, delete_modal_component_1.DeleteModalComponent],
        }), 
        __metadata('design:paramtypes', [device_service_1.DeviceService])
    ], GetDevicesComponent);
    return GetDevicesComponent;
}());
exports.GetDevicesComponent = GetDevicesComponent;
//# sourceMappingURL=getdevices.component.js.map