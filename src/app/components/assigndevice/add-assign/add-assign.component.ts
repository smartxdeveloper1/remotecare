import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BackendService } from 'src/app/backend.service';
import { Observable } from 'rxjs-compat';
import{NgxSpinnerService} from "ngx-spinner"

import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { keyframes, query } from '@angular/animations';

@Component({
  selector: 'app-add-assign',
  templateUrl: './add-assign.component.html',
  styleUrls: ['./add-assign.component.css']
})
export class AddAssignComponent implements OnInit {
  assignForm: FormGroup
  deviceid:Array<any>[];
  admin:any[];
  constructor(public service: BackendService,
    private router: Router,
    private spinnerservice:NgxSpinnerService,
    private fb: FormBuilder) {
    this.assignForm = this.fb.group({
      deviceId: '',
      
      assignedToAdmin: '',

     

    })
  }



  ngOnInit() {
    this.spinnerservice.show()
    Observable.forkJoin([
      this.service.admins(),
      
      this.service.notmap(),
    
    
      ]).subscribe(
        result=>{
          console.log(result)
          this.admin=result[0].data
//           this.arr=this.deviceid
       
// console.log(this.arr)
      console.log(result[1].data)
          this.deviceid=result[1].data
          setTimeout(() => {
            this.spinnerservice.hide();
           }, 1000);
  
        }

      )
    
    
  }
  onSubmit() {
    this.spinnerservice.show()
    // this.service.assign(this.assignForm.value).subscribe(
      this.service.assign({deviceId:this.assignForm.value.deviceId,assignedToAdmin:this.assignForm.value.assignedToAdmin}).subscribe(
      result => {
        console.log(this.assignForm.value)
        console.log(result)
        alert(result['message']);
        setTimeout(() => {
          this.spinnerservice.hide();
         }, 1000);
         var x;
         x=confirm("Are You Sure You Want To Navigate To View Page")
         if(x==true){
          this.router.navigate(['/view-assign']);}
         else{
           this.assignForm.reset()
         }
        
        
      },
      err => {


      }
    )
  }
}
