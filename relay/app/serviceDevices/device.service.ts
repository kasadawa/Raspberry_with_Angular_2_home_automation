import {Injectable} from '@angular/core';
import {Http,Headers} from '@angular/http';
import { Device } from '../Device';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/Rx';
import * as io from 'socket.io-client';



@Injectable()
export class DeviceService{
    private host = '192.168.100.2';
    //initialize variables
    public devices:any = new BehaviorSubject([]);
    public raspiPins:any = new BehaviorSubject([]); 

    private headers:Headers ; 
    private socket:any = null;

    constructor(private http:Http){
        this.socket = io("http://"+ this.host +":4444");
        console.log('device service');  
        this.http = http ;
        this.headers = new Headers();
        this.headers.append('Content-Type','application/json');
 //       this.getDevices();

    }


    //serving all devices
    getDevices(){ 
        return  this.http.get('/all-devices').map(res=>res.json())
                .subscribe((res)=>{
                    this.devices.next(res.devices);
                    this.raspiPins.next(res.avaibleGPIO);
                });
    }

    //changing device state (on/off)
    switchDeviceState(device:Device){
        return this.http.put('/sw-device/'+ device._id ,JSON.stringify(device),{headers:this.headers})
            .map(res => res.json());
    }


    // adding new device
    addDevice(device:Device) {
        return this.http.post('/add-device',JSON.stringify(device),{headers:this.headers})
           .map(res => res.json());
    }

    // delete current device from _id
    // you can pass a object and to eliminate the for loop 
    deleteSingleDevice(_id:any){
        var key = -1; 
        for(let i = 0; i < this.devices._value.length;i++){
            if(this.devices._value[i]._id === _id){
                key = i ; 
                break ; 
            }
        }
        
        if(key !== -1){
            var tmpDeviceArray = this.devices._value ;

            this.raspiPins.next(this.helpGPIO(this.devices._value[key]));
          
            //with this way we will call subscribe method
            tmpDeviceArray.splice(key,1);
            this.devices.next(tmpDeviceArray);


            return this.http.delete('/delete-device/'+ _id )
                .map(res => res.json());
        } 

    }

    
    // deleting all devices
    deleteAllDevices(){

        this.raspiPins.next(this.helpGPIO(this.devices._value));
        this.devices.next([]);

        return this.http.delete('/delete-all-devices')
                .map(res => res.json());
    }

    helpGPIO(devices:any){
        var gpioArray = this.raspiPins._value ;
        var deviceArray:any = [] ; 
        // converting one device to array item
        if(!(devices instanceof Array)){
           deviceArray.push(devices);
        }else{ deviceArray = devices};

        for(var i = 0 ; i < deviceArray.length ;i++){
            gpioArray.push(deviceArray[i].gpio);
        }
        return gpioArray ; 
    }

    //post request for timer
    setTimer(duration:any,trigger:boolean,device:any) {
        console.log("setTimer function in the device.service");
        var data = {
             duration: duration,
             trigger: trigger,
             device: device
            };
         
        return this.http.post('/set-timer/' + device._id.toString(),JSON.stringify(data),{headers:this.headers})
          .map(res => res.json());
    }


    //passing the socket variable to timer-modal 
    getSocket(){
        return this.socket;
    }
}