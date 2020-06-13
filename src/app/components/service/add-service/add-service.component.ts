import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { BackendService } from 'src/app/backend.service';
import {NgxSpinnerService} from "ngx-spinner"
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {
  selectedFile:File=null;
  randomNumber; //Line 1 added
  code:any[];
  level: string[] = ['Midwife', 'Community health worker','Healthcare volunteer','PHC doctors','CDMO DHQ','CSMO SHQ'];
  serviceform:FormGroup
  constructor(
    private fb:FormBuilder,
    private router:Router,
    private service:BackendService,
    private spinnerservice:NgxSpinnerService
  ) {
    this.serviceform=this.fb.group({
      OrganizationId:'',
      OrganizationName:'',
      address1:'',
      address2:'',
      state:'',
      district:'',
      pin:'',
      file:'',
    }) }
    uploadFile(file) {
      console.log(file)
      const formData = new FormData();
      formData.append('file', file.data);
    }


  ngOnInit(): void {
    
  }
  onFileSelected(event){
    console.log(event);
    this.selectedFile= <File>event.target.files[0];
  }

  onSubmit(){
    this.spinnerservice.show()
    this.randomNumber = Math.floor(Math.random() * 90000) + 10000; //Line 2 added
    let formData = new FormData();
    formData.append('file',this.selectedFile,this.selectedFile.name);
    for(let key in this.serviceform.value){
      formData.append(key,this.serviceform.value[key]);
    }
    formData.append("logoName", this.randomNumber); // Line 3 added
    this.service.addservice(formData).subscribe(
      result => {
        console.log(result)
        console.log(this.serviceform.value)
        alert( result['message']);
        setTimeout(() => {
          this.spinnerservice.hide();
         }, 1000);
         var x;
         x=confirm("Are You Sure You Want To Navigate To View Page")
         if(x==true){
          this.router.navigate(['/view-service']);}
         else{
           this.serviceform.reset()
         }
         
      },
      result => {
        console.log(result);
      }
    )
  }

    
  
}