import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {NgxSpinnerModule} from "ngx-spinner"
import { OverlayModule} from '@angular/cdk/overlay';
import { AppComponent } from './app.component';
import{ViewComponent} from './components/device/view/view.component'

import { AddUserComponent } from './components/user/add-user/add-user.component'

import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip'
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';

import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatRadioModule } from "@angular/material/radio";


import { MatSidenavModule } from '@angular/material/sidenav';
import { AddComponent } from './components/device/add/add.component'

import { AddServiceComponent } from './components/service/add-service/add-service.component';
import { AddPatientComponent } from './components/patient/add-patient/add-patient.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component'
import { GuardsGuard } from './guards.guard'
import { TokenInterceptorService } from './token-interceptor.service';
import { ViewPatientComponent } from './components/patient/view-patient/view-patient.component';
import { ViewServiceComponent } from './components/service/view-service/view-service.component';
import { ViewUserComponent } from './components/user/view-user/view-user.component';
import { AddMapComponent } from './components/mapping/add-map/add-map.component';
import { ViewMapComponent } from './components/mapping/view-map/view-map.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MaintanenceComponent } from './components/maintanence/maintanence.component';
import { AddAssignComponent } from './components/assigndevice/add-assign/add-assign.component';
import { ViewAssignComponent } from './components/assigndevice/view-assign/view-assign.component';
import {NgxSpinnerService} from "ngx-spinner";
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import {Bread} from './components/breadcrumbs/bread';
import { HomeComponent } from './components/home/home.component';
import { UpdateUserComponent } from './components/user/update-user/update-user.component';
import { AddCountryComponent } from './components/countrycode/add-country/add-country.component';
import { ViewCountryComponent } from './components/countrycode/view-country/view-country.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { HelpandsupportComponent } from './components/helpandsupport/helpandsupport.component';
import { DocumentComponent } from './components/document/document.component';
import { AreaComponent } from './components/area/area.component'
import{UpdateComponent} from './components/device/update/update.component';
import { UpdateServiceComponent } from './components/service/update-service/update-service.component';
import { TopbarComponent } from './components/site/topbar/topbar.component';
import { SidebarComponent } from './components/site/sidebar/sidebar.component';
import { LogoComponent } from './components/site/logo/logo.component'
@NgModule({
  exports: [MatSidenavModule],

  declarations: [
    AppComponent,

    AddComponent,
    AddUserComponent,
    ViewComponent,
    UpdateComponent,
    AddServiceComponent,
    AddPatientComponent,
    LoginComponent,
    RegisterComponent,
    ViewPatientComponent,
    ViewServiceComponent,
    ViewUserComponent,
    AddMapComponent,
    ViewMapComponent,
    DashboardComponent,
    MaintanenceComponent,
    AddAssignComponent,
    ViewAssignComponent,
    BreadcrumbsComponent,
    HomeComponent,
    UpdateUserComponent,
    AddCountryComponent,
    ViewCountryComponent,
  
    MyprofileComponent,
    HelpandsupportComponent,
    DocumentComponent,
    AreaComponent,
    UpdateServiceComponent,
    TopbarComponent,
    SidebarComponent,
    LogoComponent,
  


  ],
  imports: [
    OverlayModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MatTooltipModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    MatSidenavModule,
    MatCardModule,
    MatSliderModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatGridListModule,
    MatInputModule,
    MatProgressBarModule,
    MatStepperModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule


  ],
  providers: [GuardsGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true, 
    },
    NgxSpinnerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
