import { Component , Input ,ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { DeviceService } from '../serviceDevices/device.service';
import {Device} from '../Device';

@Component({
    moduleId: module.id,
    selector: 'delete',
    templateUrl:"./delete-modal.html",
})

export class DeleteModalComponent{
  @Input() device:Device;
  @ViewChild('lgModal') public lgModal: ModalDirective;

  constructor(private deviceservice:DeviceService){}
  
  DeleteFunction(){
    this.deviceservice.deleteSingleDevice(this.device._id).subscribe(res => console.log("Single device deleted"));
    this.hide();
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
