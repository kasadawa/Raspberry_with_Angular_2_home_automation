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
var Device_1 = require('../Device');
var AddDevicesComponent = (function () {
    function AddDevicesComponent(deviceservice) {
        this.deviceservice = deviceservice;
        this.deviceName = ''; // used in the .html file
        this.itemTypes = ['lamp', 'switch', 'contact', 'relay'];
        this.raspiPins = []; // those pins are declared in index.js
        // what type of device is default selected
        this.selectedDevice = 'lamp';
        //default selected pin 
        this.selectedPin = '';
    }
    AddDevicesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.deviceservice.raspiPins.subscribe(function (res) {
            _this.raspiPins = _this.sortGPIO(res);
            _this.selectedPin = _this.raspiPins[0];
        });
    };
    AddDevicesComponent.prototype.addDevice = function (name) {
        var _this = this;
        if (name.length !== 0 && this.selectedPin === '') {
            alert('There are no GPIO pin avaible !');
        }
        if (name.length !== 0 && this.selectedPin !== '') {
            var icon = document.getElementById("icon-prop");
            var deviceObj = new Device_1.Device(false, this.selectedPin.toString(), icon.className.toString(), this.selectedDevice.toString(), name);
            this.deviceservice.addDevice(deviceObj)
                .subscribe(function (device) {
                var tmpDeviceArray = _this.deviceservice.devices._value;
                var i = _this.raspiPins.indexOf(device.gpio);
                var tmpDeviceGPIO = _this.raspiPins;
                tmpDeviceGPIO.splice(i, 1);
                //with this way we will call subscribe method
                tmpDeviceArray.push(device);
                _this.deviceservice.devices.next(tmpDeviceArray);
                //this will calll raspiPins subscribe method
                _this.deviceservice.raspiPins.next(tmpDeviceGPIO);
            });
        }
        document.getElementById("device-name").value = '';
    };
    //helper function used in ngOnInit
    AddDevicesComponent.prototype.sortGPIO = function (result) {
        if (result.length === 0)
            return [''];
        for (var i = 0; i < result.length; i++) {
            var current = Number(result[i].substring(3));
            for (var g = i + 1; g < result.length; g++) {
                var selected = Number(result[g].substring(3));
                if (current > selected) {
                    var tmp = result[i];
                    result[i] = result[g];
                    result[g] = tmp;
                }
            }
        }
        return result;
    };
    // change class property
    AddDevicesComponent.prototype.changeIcon = function () {
        var icon = document.getElementById("icon-prop");
        switch (this.selectedDevice) {
            case "lamp":
                icon.className = "fa fa-lightbulb-o";
                break;
            case "switch":
                icon.className = "fa fa-random";
                break;
            case "contact":
                icon.className = "fa fa-plug";
                break;
            case "relay":
                icon.className = "fa fa-home";
                break;
        }
    };
    AddDevicesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'add-devices',
            templateUrl: './adddevices.html',
        }), 
        __metadata('design:paramtypes', [device_service_1.DeviceService])
    ], AddDevicesComponent);
    return AddDevicesComponent;
}());
exports.AddDevicesComponent = AddDevicesComponent;
//# sourceMappingURL=adddevices.component.js.map