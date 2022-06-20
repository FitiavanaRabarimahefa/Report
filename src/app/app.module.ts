import { CarouselModule } from './carousel/carousel.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LocalComponent } from './local/local.component';
import { ReportListComponent } from './report-list/report-list.component';
import { RegisterComponent } from './register/register.component';
import { ReportActivityComponent } from './report-activity/report-activity.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PdfBAAFComponent } from './pdf-baaf/pdf-baaf.component';
import { AdminComponent } from './admin/admin.component';
import {NgToastModule} from 'ng-angular-popup';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { ViewReportComponent } from './view-report/view-report.component';
import { PdfReportMensualComponent } from './pdf-report-mensual/pdf-report-mensual.component';
import { ReportMensualComponent } from './report-mensual/report-mensual.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LocalComponent,
    ReportListComponent,
    RegisterComponent,
    ReportActivityComponent,
    PdfBAAFComponent,
    AdminComponent,
    AdminUserComponent,
    ListUserComponent,
    ViewReportComponent,
    PdfReportMensualComponent,
    ReportMensualComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    CarouselModule,
    ReactiveFormsModule,
    NgToastModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
