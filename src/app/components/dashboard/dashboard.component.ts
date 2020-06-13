import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs-compat';
import {NgxSpinnerService} from "ngx-spinner"
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/backend.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
devices;
users;
serviceProvider;
Patients;
alert={
  totalNo:10, redAlert:7}
user:Boolean
  constructor(
    private service:BackendService,
  ) { }

  public show(): boolean {
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
    this.user=this.show()
   
    this.service.dashboarddetails()
  
    .subscribe(
      result=>{
        console.log(result)
        this.devices=result.device
        console.log(this.devices)
        this.users=result.Users
        console.log(this.users)
        this.serviceProvider=result.serviceProvider
        this.Patients=result.Patients
  
      }
    )
  }

}
