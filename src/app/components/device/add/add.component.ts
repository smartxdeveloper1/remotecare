import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BackendService } from 'src/app/backend.service';
import {NgxSpinnerService} from "ngx-spinner"

import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  
  regForm: FormGroup
  type: string[] = ['wearable', 'handheld'];
  myDate = Date.now();
  constructor(
    private service: BackendService,
    private router: Router,
    private spinnerservice:NgxSpinnerService,
    private fb: FormBuilder) {
    this.regForm = this.fb.group({
      deviceId:['',Validators.compose([Validators.required,Validators.maxLength(12),Validators.minLength(12)])],
      deviceType: '',
      deviceManufacturer: '',
      imeiNumber: '',
      deviceTestEngineer: '',
      dateOfFirstRelease: '',
      simNumber: '',
      

    })
    
  }

 
  get f() { return this.regForm.controls; }
  ngOnInit() {

  }
  onSubmit() {
    this.spinnerservice.show()
    this.service.adddevice(this.regForm.value).subscribe(
      result => {
        console.log(this.regForm.value)
        console.log(result)
        alert(result['message']);
        setTimeout(() => {
          this.spinnerservice.hide();
         }, 1000);
         var x;
         x=confirm("Are You Sure You Want To Navigate To View Page")
         if(x==true){
          this.router.navigate(['/view']);}
         else{
           this.regForm.reset()
         }
         
      },
      err => {


      }
    )
  }



}
