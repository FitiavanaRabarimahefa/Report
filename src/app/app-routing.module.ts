import { AdminComponent } from './admin/admin.component';
import { ReportActivityComponent } from './report-activity/report-activity.component';
import { ReportListComponent } from './report-list/report-list.component';
import { LocalComponent } from './local/local.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PdfBAAFComponent } from './pdf-baaf/pdf-baaf.component';


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
    path:'pdf-BAAF',
    component:PdfBAAFComponent
  },
  {
    path:'admin',
    component:AdminComponent
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
