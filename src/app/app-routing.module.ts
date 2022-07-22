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
    path: 'patrimoine-etat/:id',
    component:PatrimoineEtatComponent
  },
{
  path: 'execution-budgetaire/:id',
  component:ExecutionBudgetaireComponent
},
{
  path: 'centre-informatique/:id',
  component:CentreInformatiqueComponent
  },
  {
    path: 'finance-locale/:id',
    component:FinanceLocalesComponent
  },
  {
    path: 'admin-patrimoine',
    component:AdminPatrimoineComponent
  },
  {
    path: 'admin-crgp',
    component:AdminCrgpComponent
  },
  {
    path: 'admin-execution-budgetaire',
    component:AdminExecutionComponent
  },
   {
    path: 'admin-centre-informatique',
     component: AdminCentreInformatiqueComponent
  },
  {
    path: 'admin-finance-locales',
    component: AdminFinanceLocalesComponent
  },
  {
    path: 'rapport-formation',
    component:RapportFormationComponent
  },
  {
    path: 'inter-fait',
    component:InterFaitComponent
  },
  {
    path: 'inter-baaf',
    component:InterBaafComponent
  },
  {
    path: 'inter-patrimoine',
    component:InterPatrimoineComponent
  },
  {
    path: 'inter-execution-budgetaire',
    component:InterExecutionBudgetaireComponent
  },
  {
    path: 'inter-centre-informatique',
    component:InterCentreInformatiqueComponent
  },
  {
    path: 'inter-finance-locale',
    component:InterFinanceLocaleComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
