import { Component,OnInit} from '@angular/core';
import {DeviceService} from '../serviceDevices/device.service';
import {Device} from '../Device' ; 
import {TimerModalComponent} from '../timer-modal/timer-modal.component';
import {DeleteModalComponent} from '../delete-modal/delete-modal.component';


@Component({
    moduleId: module.id,
    selector:'get-devices', 
    templateUrl: './getdevices.html',
    entryComponents:[TimerModalComponent,DeleteModalComponent],
})
export class GetDevicesComponent implements OnInit{

    // create fresh copy of the devices array
    devices:Device[] = []; 
    
    //button on/off text
    public buttonStr:String[] = []; 


    constructor(private deviceservice:DeviceService){}

    ngOnInit(){
        //getting all devices objects
        this.deviceservice.devices.subscribe((res:any)=>{
            this.devices = res;
            this.changeButtonString(this.devices);
        });
    }

    
    changeButtonString(devices:any,index:any = -1){
            if(index === -1){
                // init all 
                // include one 
                // delete one
                // delete all 

                this.buttonStr.length = 0 ; 
                for(var i = 0; i < devices.length;i++){
                    if(devices[i].state === false) this.buttonStr.push('Turn On');
                    else this.buttonStr.push('Turn Off');
                }
            }

            // special for switchDeviceState() function 

            // if you add [devices].length in the conditions it's not that faster
            if( index !== -1){
                let tmp:String = '';
                if(devices.state) tmp = 'Turn Off';
                else tmp ='Turn On' ; 
                this.buttonStr[index] = tmp ; 
            }
    }

    changeDeviceState(index:any){
        this.deviceservice.switchDeviceState(this.devices[index]).subscribe(updated_device => {
            this.devices[index].state = updated_device.state;
            // if(this.devices[index].onTimer != up)
            this.changeButtonString(this.devices[index],index);
       });    
    }


  
    deleteAllDevices():void{
        this.deviceservice.deleteAllDevices().subscribe(res => console.log('devices are deleted'));
    }

 
}