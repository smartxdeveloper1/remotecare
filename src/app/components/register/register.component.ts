import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  Details = {email:"",password:""} ;

  constructor(
    private service:BackendService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }
  register(){
    console.log(this.Details)
    this.service.register(this.Details).subscribe(
      result => {
        console.log(result)
       
        console.log(this.Details)
        alert(result['success'] + "  " + result['message']);
      },
      result => {
        console.log(result);
      }
    )
  }

  }
