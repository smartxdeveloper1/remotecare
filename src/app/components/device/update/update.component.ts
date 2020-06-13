import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BackendService } from 'src/app/backend.service';
import {NgxSpinnerService} from "ngx-spinner"
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs-compat';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  updatedevice: FormGroup
  type: string[] = ['wearable', 'handheld'];
  myDate = Date.now();
  constructor(
    private route:ActivatedRoute,
    private service: BackendService,
    private router: Router,
    private spinnerservice:NgxSpinnerService,
    private fb: FormBuilder
  ) {
    this.updatedevice = this.fb.group({
      _id:'',
      deviceId:['',Validators.compose([Validators.required,Validators.maxLength(12),Validators.minLength(12)])],
      deviceType: '',
      deviceManufacturer: '',
      imeiNumber: '',
      deviceTestEngineer: '',
      dateOfFirstRelease: '',
      simNumber: '',
      

    })
   }
   get f() { return this.updatedevice.controls; }
  ngOnInit() {
    this.service.getdeviceid(this.route.snapshot.params['id']).subscribe
    (
      result=>{
        console.log(result)
        this.updatedevice.patchValue({
          _id:result.data[0]._id,
         deviceType:result.data[0].deviceType,
          deviceId:result.data[0].deviceId,
          deviceManufacturer:result.data[0].deviceManufacturer,
          deviceTestEngineer:result.data[0].deviceTestEngineer,
          dateOfFirstRelease:result.data[0].dateOfFirstRelease,
          simNumber:result.data[0].simNumber,
          imeiNumber:result.data[0].imeiNumber})
          ,error=>{

          }
                   
      }
    )
   
   }
   onSubmit() {
    this.spinnerservice.show()
    this.service.updatedevice(this.
      updatedevice.value).subscribe(
      result => {
        console.log(this.updatedevice.value)
        console.log(result)
        alert(result['message']);
        setTimeout(() => {
          this.spinnerservice.hide();
         }, 1000);
         var x;
         x=confirm("Are You Sure You Want To Navigate To View Page")
         if(x==true){
          this.router.navigate(['/view']);}
         
         
      },
      err => {


      }
    )
  }


}
