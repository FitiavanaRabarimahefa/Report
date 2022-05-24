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
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PdfBAAFComponent } from './pdf-baaf/pdf-baaf.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LocalComponent,
    ReportListComponent,
    RegisterComponent,
    ReportActivityComponent,
    PdfBAAFComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }