
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BackendService } from 'src/app/backend.service';
import { query } from '@angular/animations';
import { NgxSpinnerService } from "ngx-spinner"
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  selectedFile:File=null;
  type: string[] = [ 'smartxengineer', 'admin'];
  multipleuser: string[] = ['ServiceProvider']
  gend: string[] = ['Male', 'Female', 'Do Not Want To Mention']
  code: any[];
  Userform: FormGroup;
  user: Boolean;
  sp: Boolean;
  userType;
  upload: any[];
  submitted = false;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service: BackendService,
    private spinnerservice: NgxSpinnerService
  ) {
    this.Userform = this.fb.group({
      userId: [''],
      password: '',
      userType: '',
      userName: '',
      gender: '',
      age: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(99)])],
      address: '',
      emailId: '',
      mobileNumber: ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10)])],
    address2:'',
    location:'',
      extraRole: '',
    
    })
  }


  get f() { return this.Userform.controls; }
  // uploadFile(file) {
  //   console.log(file)
  //   const formData = new FormData();
  //   formData.append('file', file.data);
  // }
 

  public localStorageItem(): boolean {
    var userInfo = JSON.parse(localStorage.getItem("userInfo"))
    if (userInfo.userType === "superadmin") {
      return true
    } else {
      return false;
    };
  }

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
    this.spinnerservice.show()
    this.user = this.localStorageItem();
    this.service.getservice().subscribe(
      result => {
        console.log(result)
        this.code = result.data
        console.log(this.code)
        setTimeout(() => {
          this.spinnerservice.hide();
        }, 1000);

      }
    )
  }
  

  // onFileSelected(event){
  //   console.log(event);
  //   this.selectedFile= <File>event.target.files[0];
  // }
  onSubmit() {
    this.Userform.value.userId = this.Userform.value.emailId;
    var userInfo = JSON.parse(localStorage.getItem("userInfo"))
    console.log(userInfo.userType)
    if (userInfo.userType === "admin") {
      this.Userform.value.userType = "ServiceProvider"
    }
    // console.log(this.Userform.value);
    // let formData = new FormData();
    // formData.append('file',this.selectedFile,this.selectedFile.name);
    // for(let key in this.Userform.value){
    //   formData.append(key,this.Userform.value[key]);
    // }

    this.service.adduser(this.Userform.value).subscribe(
      result => {
        console.log(result)
        console.log(result)
        alert(result['message']);
        setTimeout(() => {
          this.spinnerservice.hide();
        }, 1000);
        var x;
        x = confirm("Are You Sure You Want To Navigate To View Page")
        if (x == true) {
          this.router.navigate(['/view-user']);
        }
        else {
          this.Userform.reset()
        }

      },
      result => {
        console.log(result);
      }
    )
  }

}
