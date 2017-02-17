import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


//for ng-model
import { FormsModule } from '@angular/forms';

//root component
import { AppComponent }  from './app.component';

//myComponents
import {AddDevicesComponent} from './addDevices/adddevices.component';
import {GetDevicesComponent} from './getDevices/getdevices.component';
import {DeleteModalComponent} from './delete-modal/delete-modal.component';
import {TimerModalComponent} from './timer-modal/timer-modal.component';


//ng-bootstrap 
import {TabsModule,ModalModule,PopoverModule,TimepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
//font-awesome
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';

// for nodejs
import { HttpModule} from '@angular/http';

//Authentication 
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { DeviceService} from './serviceDevices/device.service';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './authentication/login.component';


const appRoutes: Routes = [
  // { path: '', component: AppComponent },
  { path: 'user-login', component: LoginComponent },
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [ 
    BrowserModule,
    HttpModule,
    FormsModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    TimepickerModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    Angular2FontawesomeModule
    ],
  providers:[AUTH_PROVIDERS, DeviceService],
  declarations: [ AppComponent,
                  AddDevicesComponent,
                  GetDevicesComponent,
                  DeleteModalComponent,
                  TimerModalComponent,
                  LoginComponent],
  bootstrap:    [ AppComponent]
})
export class AppModule { }
