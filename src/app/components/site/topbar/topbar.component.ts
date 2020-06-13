import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor(
    public router: Router,
  ) { }

  ngOnInit() {
  }
  logout() {
    var x;
    x = confirm("Are You Sure You Want To Logout")
    if (x == true) {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }
}
