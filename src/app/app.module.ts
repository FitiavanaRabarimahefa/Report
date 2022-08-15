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
import { ReportActivityAllListComponent } from './report-activity-all-list/report-activity-all-list.component';
import { AdminDashboardReportComponent } from './admin-dashboard-report/admin-dashboard-report.component';
import { AdminReportListComponent } from './admin-report-list/admin-report-list.component';
import { AdminReportActivityAllListComponent } from './admin-report-activity-all-list/admin-report-activity-all-list.component';
import { CRGPComponent } from './crgp/crgp.component';
import { AdminFaitMarquantComponent } from './admin-fait-marquant/admin-fait-marquant.component';
import { PatrimoineEtatComponent } from './patrimoine-etat/patrimoine-etat.component';
import { ExecutionBudgetaireComponent } from './execution-budgetaire/execution-budgetaire.component';
import { CentreInformatiqueComponent } from './centre-informatique/centre-informatique.component';
import { FinanceLocalesComponent } from './finance-locales/finance-locales.component';
import { AdminPatrimoineComponent } from './admin-patrimoine/admin-patrimoine.component';
import { AdminCrgpComponent } from './admin-crgp/admin-crgp.component';
import { AdminExecutionComponent } from './admin-execution-budgetaire/admin-execution/admin-execution.component';
import { AdminCentreInformatiqueComponent } from './admin-centre-informatique/admin-centre-informatique.component';
import { AdminFinanceLocalesComponent } from './admin-finance-locales/admin-finance-locales.component';
import { RapportFormationComponent } from './rapport-formation/rapport-formation.component';
import { InterFaitComponent } from './inter-fait/inter-fait.component';
import { InterBaafComponent } from './inter-baaf/inter-baaf.component';
import { InterPatrimoineComponent } from './inter-patrimoine/inter-patrimoine.component';
import { InterExecutionBudgetaireComponent } from './inter-execution-budgetaire/inter-execution-budgetaire.component';
import { InterCentreInformatiqueComponent } from './inter-centre-informatique/inter-centre-informatique.component';
import { InterFinanceLocaleComponent } from './inter-finance-locale/inter-finance-locale.component';
import { InterCrgpComponent } from './inter-crgp/inter-crgp.component';
import { InterFormationComponent } from './inter-formation/inter-formation.component';

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
    ReportMensualComponent,
    ReportActivityAllListComponent,
    AdminDashboardReportComponent,
    AdminReportListComponent,
    AdminReportActivityAllListComponent,
    CRGPComponent,
    AdminFaitMarquantComponent,
    PatrimoineEtatComponent,
    ExecutionBudgetaireComponent,
    CentreInformatiqueComponent,
    FinanceLocalesComponent,
    AdminPatrimoineComponent,
    AdminCrgpComponent,
    AdminExecutionComponent,
    AdminCentreInformatiqueComponent,
    AdminFinanceLocalesComponent,
    RapportFormationComponent,
    InterFaitComponent,
    InterBaafComponent,
    InterPatrimoineComponent,
    InterExecutionBudgetaireComponent,
    InterCentreInformatiqueComponent,
    InterFinanceLocaleComponent,
    InterCrgpComponent,
    InterFormationComponent
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
