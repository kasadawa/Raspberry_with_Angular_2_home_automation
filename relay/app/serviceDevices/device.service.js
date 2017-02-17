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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var Rx_1 = require('rxjs/Rx');
var io = require('socket.io-client');
var DeviceService = (function () {
    function DeviceService(http) {
        this.http = http;
        this.host = '192.168.100.2';
        //initialize variables
        this.devices = new Rx_1.BehaviorSubject([]);
        this.raspiPins = new Rx_1.BehaviorSubject([]);
        this.socket = null;
        this.socket = io("http://" + this.host + ":4444");
        console.log('device service');
        this.http = http;
        this.headers = new http_1.Headers();
        this.headers.append('Content-Type', 'application/json');
        //       this.getDevices();
    }
    //serving all devices
    DeviceService.prototype.getDevices = function () {
        var _this = this;
        return this.http.get('/all-devices').map(function (res) { return res.json(); })
            .subscribe(function (res) {
            _this.devices.next(res.devices);
            _this.raspiPins.next(res.avaibleGPIO);
        });
    };
    //changing device state (on/off)
    DeviceService.prototype.switchDeviceState = function (device) {
        return this.http.put('/sw-device/' + device._id, JSON.stringify(device), { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    // adding new device
    DeviceService.prototype.addDevice = function (device) {
        return this.http.post('/add-device', JSON.stringify(device), { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    // delete current device from _id
    // you can pass a object and to eliminate the for loop 
    DeviceService.prototype.deleteSingleDevice = function (_id) {
        var key = -1;
        for (var i = 0; i < this.devices._value.length; i++) {
            if (this.devices._value[i]._id === _id) {
                key = i;
                break;
            }
        }
        if (key !== -1) {
            var tmpDeviceArray = this.devices._value;
            this.raspiPins.next(this.helpGPIO(this.devices._value[key]));
            //with this way we will call subscribe method
            tmpDeviceArray.splice(key, 1);
            this.devices.next(tmpDeviceArray);
            return this.http.delete('/delete-device/' + _id)
                .map(function (res) { return res.json(); });
        }
    };
    // deleting all devices
    DeviceService.prototype.deleteAllDevices = function () {
        this.raspiPins.next(this.helpGPIO(this.devices._value));
        this.devices.next([]);
        return this.http.delete('/delete-all-devices')
            .map(function (res) { return res.json(); });
    };
    DeviceService.prototype.helpGPIO = function (devices) {
        var gpioArray = this.raspiPins._value;
        var deviceArray = [];
        // converting one device to array item
        if (!(devices instanceof Array)) {
            deviceArray.push(devices);
        }
        else {
            deviceArray = devices;
        }
        ;
        for (var i = 0; i < deviceArray.length; i++) {
            gpioArray.push(deviceArray[i].gpio);
        }
        return gpioArray;
    };
    //post request for timer
    DeviceService.prototype.setTimer = function (duration, trigger, device) {
        console.log("setTimer function in the device.service");
        var data = {
            duration: duration,
            trigger: trigger,
            device: device
        };
        return this.http.post('/set-timer/' + device._id.toString(), JSON.stringify(data), { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    //passing the socket variable to timer-modal 
    DeviceService.prototype.getSocket = function () {
        return this.socket;
    };
    DeviceService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DeviceService);
    return DeviceService;
}());
exports.DeviceService = DeviceService;
//# sourceMappingURL=device.service.js.map