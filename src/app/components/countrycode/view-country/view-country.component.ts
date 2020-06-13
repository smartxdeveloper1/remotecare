import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {BackendService} from 'src/app/backend.service';
import {NgxSpinnerService} from "ngx-spinner"

@Component({
  selector: 'app-view-country',
  templateUrl: './view-country.component.html',
  styleUrls: ['./view-country.component.css']
})
export class ViewCountryComponent implements OnInit {
  displayedColumns: string[] = ['countryCode' ];
  dataSource: MatTableDataSource<any>;
  code;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
    private service:BackendService,
    private spinnerservice:NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinnerservice.show()
   
    this.service.getcountry().subscribe((result)=>{
      console.log(result);
      this.code=result.data;
      console.log(this.code)

      // this.dataSource = new MatTableDataSource(result.data?result.data:[]);
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
      setTimeout(() => {
        this.spinnerservice.hide();
       }, 1000);
    },(error)=>{
      console.log(error);
    })
    
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter)
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

}
  }


