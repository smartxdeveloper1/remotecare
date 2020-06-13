import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendService } from 'src/app/backend.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {
spi:any[];
  constructor(
    private fb:FormBuilder,
    private service:BackendService
  ) { }

patientform=this.fb.group({
  dateTimeOfInstallation:'',
  installerServiceId:'',
  userId:'',
  deviceId:'',
  dateTimeOfUninstallation:''
})


  ngOnInit() {
    this.service.getuser(null).subscribe(
      result=>{
        console.log(result)
   
         this.spi=result.data
      }
    )
  }
  onSubmit(){
    this.service.addpatient(this.patientform.value).subscribe(
      result => {
        console.log(this.patientform.value)
        alert(result['success'] + "  " + result['message']);
      },
      result => {
        console.log(result);
      }
    )
  }

  

}