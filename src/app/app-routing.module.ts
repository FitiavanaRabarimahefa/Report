import { ListUserComponent } from './list-user/list-user.component';
import { AdminComponent } from './admin/admin.component';
import { ReportActivityComponent } from './report-activity/report-activity.component';
import { ReportListComponent } from './report-list/report-list.component';
import { LocalComponent } from './local/local.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PdfBAAFComponent } from './pdf-baaf/pdf-baaf.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { ViewReportComponent } from './view-report/view-report.component';
import { ReportMensualComponent } from './report-mensual/report-mensual.component';
import { ReportActivityAllListComponent } from './report-activity-all-list/report-activity-all-list.component';
import { AdminDashboardReportComponent } from './admin-dashboard-report/admin-dashboard-report.component';
import { CRGPComponent } from './crgp/crgp.component';
import { AdminFaitMarquantComponent } from './admin-fait-marquant/admin-fait-marquant.component';
import { PatrimoineEtatComponent } from './patrimoine-etat/patrimoine-etat.component';
import { ExecutionBudgetaireComponent } from './execution-budgetaire/execution-budgetaire.component';
import { CentreInformatiqueComponent } from './centre-informatique/centre-informatique.component';
import { FinanceLocalesComponent } from './finance-locales/finance-locales.component';


const routes: Routes = [
  {component:LoginComponent,
    path:'',

  },
  {
    component:RegisterComponent,
    path:'register'
  },
  {
    component:LocalComponent,
    path:'acceuil',
    children:[
      {
        path:'',
        component:ReportListComponent,
        outlet:'report'
      },
      {
        path:'',
        component:LoginComponent,
        outlet:'login'
      }

    ]
  },

  { path:'report-activity/:id',
    component:ReportActivityComponent,
  },
  {
    path:'pdf-baaf',
    component:PdfBAAFComponent
  },
  {
    path:'admin-report-mensual',
    component:AdminComponent
  },
  {
    path:'admin-user',
    component:AdminUserComponent
  },
  {
    path:'list-user',
    component:ListUserComponent
  },
  {
    path: 'view-report',
    component:ViewReportComponent
  },
  {
    path: 'report-mensual/:id',
    component:ReportMensualComponent
  },
  {
    path: 'report-activity-list',
    component:ReportActivityAllListComponent
  },
  {
    path: 'admin-dashboard',
    component:AdminDashboardReportComponent
  },
  {
      path: 'CRGP',
      component:CRGPComponent
  },
  {
    path: 'admin-fait',
    component:AdminFaitMarquantComponent
  },
  {
    path: 'patrimoine-etat',
    component:PatrimoineEtatComponent
  },
{
  path: 'execution-budgetaire',
  component:ExecutionBudgetaireComponent
},
{
  path: 'centre-informatique',
  component:CentreInformatiqueComponent
  },
  {
    path: 'finance-locale',
    component:FinanceLocalesComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
