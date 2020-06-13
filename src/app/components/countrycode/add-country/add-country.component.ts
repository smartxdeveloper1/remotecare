import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { BackendService } from 'src/app/backend.service';
import {NgxSpinnerService} from "ngx-spinner"
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css']
})
export class AddCountryComponent implements OnInit {
  countryform:FormGroup
  constructor(
    private fb:FormBuilder,
    private router:Router,
    private service:BackendService,
    private spinnerservice:NgxSpinnerService
  ) {
    this.countryform=this.fb.group({
      countryCode:'',
      
    })
   }

  ngOnInit() {
  }
  onSubmit(){
  this.spinnerservice.show()
  this.service.addcountry(this.countryform.value).subscribe(
    result => {
      console.log(result)
      console.log(this.countryform.value)
      alert( result['message']);
      setTimeout(() => {
        this.spinnerservice.hide();
       }, 1000);
       var x;
       x=confirm("Are You Sure You Want To Navigate To View Page")
       if(x==true){
        this.router.navigate(['/view-country']);}
       else{
         this.countryform.reset()
       }
       
    },
    result => {
      console.log(result);
    }
  )
}

}
