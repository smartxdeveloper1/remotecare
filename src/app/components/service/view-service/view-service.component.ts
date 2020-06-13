import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {BackendService} from 'src/app/backend.service';
import {NgxSpinnerService} from "ngx-spinner"

@Component({
  selector: 'app-view-service',
  templateUrl: './view-service.component.html',
  styleUrls: ['./view-service.component.css']
})
export class ViewServiceComponent implements OnInit {
  userType:Boolean;
  displayedColumns: string[] = ['OrganizationId', 'OrganizationName', 'address1', 'address2','district','state','pin','delete','edit'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private service:BackendService,
    private spinnerservice:NgxSpinnerService
  ) {
  
  }
  public localStorageItem(): boolean {
    console.log(localStorage.getItem("userInfo"))
    var userInfo = JSON.parse(localStorage.getItem("userInfo"))
    console.log(userInfo)
    if (userInfo.userType === "superadmin") {
      return true
    } else {
      return false;
    };
  }
  ngOnInit() {
    this.spinnerservice.show()
    this.userType = this.localStorageItem();
    this.service.getservice().subscribe((result)=>{
      console.log(result);
      this.dataSource = new MatTableDataSource(result.data?result.data:[]);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      setTimeout(() => {
        this.spinnerservice.hide();
       }, 1000);
    },(error)=>{
      console.log(error);
    })
    
  }
  delete(_id){
    this.service.deleteservice(_id).subscribe(
      result=>{
        console.log(result)
        alert( result['message']);
      }
    
    )
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter)
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

}
}
