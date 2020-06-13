import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { BackendService } from 'src/app/backend.service';
import {NgxSpinnerService} from "ngx-spinner"
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs-compat';
@Component({
  selector: 'app-update-service',
  templateUrl: './update-service.component.html',
  styleUrls: ['./update-service.component.css']
})
export class UpdateServiceComponent implements OnInit {
  selectedFile:File=null;
  code:any[];
  level: string[] = ['Midwife', 'Community health worker','Healthcare volunteer','PHC doctors','CDMO DHQ','CSMO SHQ'];
  updateservice:FormGroup
  constructor(
    private route:ActivatedRoute,
    private service: BackendService,
    private router: Router,
    private spinnerservice:NgxSpinnerService,
    private fb: FormBuilder
  ) {this.updateservice=this.fb.group({
    _id:'',
    OrganizationId:'',
    OrganizationName:'',
    address1:'',
    address2:'',
    state:'',
    district:'',
    pin:'',
    file:'',})

   }
   uploadFile(file) {
    console.log(file)
    const formData = new FormData();
    formData.append('file', file.data);
  }
  ngOnInit() {
    this.service.getserviceid(this.route.snapshot.params['id']).subscribe
    (
      result=>{
        console.log(result)
        this.updateservice.patchValue({
          _id:result.data[0]._id,
         OrganizationId:result.data[0].OrganizationId,
         OrganizationName:result.data[0].OrganizationName,
          address1:result.data[0].address1,
          address2:result.data[0].address2,
          state:result.data[0].state,
          district:result.data[0].district,
          pin:result.data[0].pin,
          //file:result.data[0].file
        })
          ,error=>{

          }
                   
      }
    )
  }
  onFileSelected(event){
    console.log(event);
    this.selectedFile= <File>event.target.files[0];
  }

  onSubmit(){
    this.spinnerservice.show()
    let formData = new FormData();
    formData.append('file',this.selectedFile,this.selectedFile.name);
    for(let key in this.updateservice.value){
      formData.append(key,this.updateservice.value[key]);
    }

    this.service.updateservice(formData).subscribe(
      result => {
        console.log(result)
        console.log(this.updateservice.value)
        alert( result['message']);
        setTimeout(() => {
          this.spinnerservice.hide();
         }, 1000);
         var x;
         x=confirm("Are You Sure You Want To Navigate To View Page")
         if(x==true){
          this.router.navigate(['/view-service']);}
        
         
      },
      result => {
        console.log(result);
      }
    )
  }

    

}
