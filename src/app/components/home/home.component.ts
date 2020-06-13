import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/backend.service';

import {Router} from '@angular/router'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userType:Boolean
  constructor(
    public service :BackendService,
    public router:Router,
  ) { }

  public showMenu(){
    var userInfo = JSON.parse(localStorage.getItem("userInfo"))
  
    if (userInfo.userType === "superadmin") {
      return true
    } else {
      return false;
    };
  }
  
  public user(){
    var userInfo = JSON.parse(localStorage.getItem("userInfo"))
  
    if (userInfo.userType === "admin") {
      return true
    } else {
      return false;
    };
  }
  public showuser(){
    var userInfo = JSON.parse(localStorage.getItem("userInfo"))
  
    if (userInfo.userType === "superadmin"||userInfo.userType === "smartxengineer") {
      return true
    } else {
      return false;
    };
  }
  public code(){
    var userInfo = JSON.parse(localStorage.getItem("userInfo"))
  
    if (userInfo.userType === "superadmin"||userInfo.userType === "admin") {
      return true
    } else {
      return false;
    };

  }

  ngOnInit() {
  }

}
