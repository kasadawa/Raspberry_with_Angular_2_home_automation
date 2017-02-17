"use strict";
var Device = (function () {
    function Device(state, gpio, icon, type, name) {
        this.state = state;
        this.gpio = gpio;
        this.icon = icon;
        this.type = type;
        this.name = name;
        this.onTimer = false;
    }
    return Device;
}());
exports.Device = Device;
//# sourceMappingURL=Device.js.map