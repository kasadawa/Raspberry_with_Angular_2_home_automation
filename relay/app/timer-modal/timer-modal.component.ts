import { Component,ViewChild,Input,Output,EventEmitter } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { DeviceService } from '../serviceDevices/device.service';
import {Device} from '../Device';

@Component({
    moduleId: module.id,
    selector: 'timer',
    templateUrl:"./timer-modal.html",
    
})

export class TimerModalComponent{
  @Input() device:Device;
  @Input() buttonStrings:any; 
  //bind the function chageDeviceState from GetDevicesComponent
  @Output() changeDevicestate:EventEmitter<any> = new EventEmitter();
  
  @ViewChild('lgModal') public lgModal: ModalDirective;



  public startTime: Date = new Date();
  public endTime: Date = new Date();
  public devices:any = [] ; 
  //for socket io 
  private socket:any ; 
  constructor(private deviceservice:DeviceService){
    this.devices = this.deviceservice.devices._value ;
    this.socket = this.deviceservice.getSocket();
  }
  ngOnInit(){
        this.socket.on('getTimer', (device:any)=>{   
            for(let index = 0 ; index  < this.devices.length ; index++)
            {
                if(this.devices[index]._id == device._id){
                        this.devices[index].onTimer = device.onTimer;
                        this.devices[index].state = device.state; 
                        this.buttonStrings[index] = device.state ? 'Turn Off' : 'Turn On';
                        break; 
                    // }
                }
            };
        });
  }

  setTimer(device:any , trigger:boolean){

    let duration = this.getDurationTime();

    if (duration < 0 )
    { 
      alert("The duration is not properly setted! ")
      return ; 
    }
    this.device.onTimer = trigger; 

    var data = {
        duration : duration , 
        trigger  : trigger , 
        device   : device, 
    }
    this.socket.emit('setTimer',data);
  }


getDurationTime(){
    let minutes = this.endTime.getMinutes() - this.startTime.getMinutes();  
    let hours = this.endTime.getHours() - this.startTime.getHours();
    //
    if(hours != 0 ) hours *=60 ;
    return Math.round(minutes + hours) ; 
}
  // specific for the modal  
  public show(){
    //workaround for version 2.2.xx
    this.lgModal.config.backdrop = false ;
    this.lgModal.show();   
  }

  public hide():void{
    this.lgModal.config.backdrop = true ;
    this.lgModal.hide();
  }

}
