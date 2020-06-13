import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BackendService } from 'src/app/backend.service';
import { Observable } from 'rxjs-compat';
import {NgxSpinnerService} from "ngx-spinner"
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { keyframes, query } from '@angular/animations';

@Component({
  selector: 'app-add-map',
  templateUrl: './add-map.component.html',
  styleUrls: ['./add-map.component.css']
})
export class AddMapComponent implements OnInit {
  mapForm: FormGroup
  deviceid:Array<any>[];
  patient:any[];
  spi:any[];
  arr:any[];
  userType:Boolean
  constructor(
    public service: BackendService,
    private router: Router,
    private spinnerservice:NgxSpinnerService,
    private fb: FormBuilder) {
    this.mapForm = this.fb.group({
      deviceId: '',
      
      serviceProviderId: '',
      // patientId:'',
     

    })
  }
//   readLocalStorageValue(key) {
//     return localStorage.getItem(key);
// }
public localStorageItem(): boolean {
  console.log(localStorage.getItem("userInfo"))
  var userInfo = JSON.parse(localStorage.getItem("userInfo"))
  console.log(userInfo)
  if (userInfo.userType === "admin") {
    return true
  } else {
    return false;
  };
}


  ngOnInit() {
    this.spinnerservice.show()
    // this.userType=this.readLocalStorageValue('key');
    this.userType = this.localStorageItem();
 
    console.log(this.userType)
    Observable.forkJoin([
      this.service.notassdevice(query),
      this.service.getuser(null),

      this.service.notasspatient(query),
      this.service.spi(),
    
    
      ]).subscribe(
        result=>{
          console.log(result)
          this.deviceid=result[0].data
        // let info={...this.deviceid}
        // console.log(info)
        // let device=[]
        // device.push(info)////////////////////////////
        // console.log(device)
      
          this.arr=this.deviceid
       
console.log(this.arr)
      console.log(result[3].data)
          this.spi=result[3].data
          setTimeout(() => {
            this.spinnerservice.hide();
           }, 1000);
         
        }

      )


  }
  onSubmit() {
    this.spinnerservice.show()
    this.service.addmap(this.mapForm.value).subscribe(
      result => {
        console.log(this.mapForm.value)
        console.log(result)
        alert( result['message']);
        setTimeout(() => {
          this.spinnerservice.hide();
         }, 1000);
         var x;
         x=confirm("Are You Sure You Want To Navigate To View Page")
         if(x==true){
          this.router.navigate(['/view-map']);}
         else{
           this.mapForm.reset()
         }
           
      },
      err => {


      }
    )
  }



}
