import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {BackendService} from 'src/app/backend.service';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.css']
})
export class ViewPatientComponent implements OnInit {

  displayedColumns: string[] = ['dateTimeOfInstallation', 'installerServiceId', 'userId', 'deviceId','dateTimeOfUninstallation'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private service:BackendService
  ) {
  
  }
  ngOnInit() {
    this.service.getpatient().subscribe((result)=>{
      console.log(result);
      this.dataSource = new MatTableDataSource(result.data?result.data:[]);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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