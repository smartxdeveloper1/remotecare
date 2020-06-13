import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/backend.service';
import { Router } from '@angular/router';
import {NgxSpinnerService} from "ngx-spinner"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userDetails = {userId:"",password:""}
  constructor(
    private service:BackendService,
    private router:Router,
    private spinnerservice:NgxSpinnerService
  ) { }

  ngOnInit(): void {
    
  }
  login(){
 
    console.log(this.userDetails)
    this.spinnerservice.show()
    this.service.login(this.userDetails).subscribe(
      result => {
        console.log(result)
      if(result.success===false){
        alert(result['message'])
      }
        console.log(result.data.userType)
        if(result.data.userType==="ServiceProvider"||result.data.userType==="patient"){
           alert('login using mobile app') 
        }

       else if(result.success){
          localStorage.setItem('token',result.token);
          localStorage.setItem('userInfo',JSON.stringify(result.data));
          this.router.navigate(['/home']);
        }
        else{
          alert(result.message);
        }
        setTimeout(() => {
          this.spinnerservice.hide();
         }, 1000);
       
      },
      error=>{
        console.log(error);
        alert('internal error occured')
      })
    }
  

  }


