import { Component } from '@angular/core';
import { AddDevicesComponent } from './addDevices/adddevices.component';
import { GetDevicesComponent } from './getDevices/getdevices.component';
import { DeviceService} from './serviceDevices/device.service';
import {Auth} from './authentication/auth.service';
import {LoginComponent} from './authentication/login.component';

import {Device} from './Device';
@Component({
  moduleId:module.id , 
  selector: 'my-app',
  templateUrl: 'app.html',
  entryComponents: [AddDevicesComponent,GetDevicesComponent,LoginComponent],
  providers:[Auth],
  styleUrls: ['../../node_modules/font-awesome/css/font-awesome.css'],

})

export class AppComponent {
  constructor(private deviceservice:DeviceService , private auth:Auth){
    this.auth.handleAuthentication();
    if(this.auth.isAuthenticated) this.deviceservice.getDevices();

  }


}