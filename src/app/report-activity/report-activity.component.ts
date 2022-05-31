import { ServiceBAAFService } from './../serviceBAAF/service-baaf.service';
import { JsonService } from './../jsonService/json.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import data from '../files/report.json';

interface report{
  produit:String,
  realisation:String,
  valeurCible:String,
  pourcentageRealisation:String,
}

const EMPTY_MODEL:report={
  produit:'',
  realisation:'',
  valeurCible:'',
  pourcentageRealisation:''
}


@Component({
  selector: 'app-report-activity',
  templateUrl: './report-activity.component.html',
  styleUrls: ['./report-activity.component.css']
})
export class ReportActivityComponent implements OnInit {

listReport:{produit:string,realisation:string,valeurCible:string,pourcentage:string}=data;

addReport:report={...EMPTY_MODEL};

  constructor(private addjsonReport:ServiceBAAFService,
    private getServicejson:JsonService

    ) { }
    TableauReport:any=[];
  ngOnInit(): void {
      this.getServicejson.getData().subscribe({
        next:(res:any)=>{
         console.log(res);
         this.TableauReport.push(res);

        },
        error:(err)=>{
            return err;
        }
      })
  }

 // produit:string="";
  //realisation:string="";
  //valeurCible:string="";
 // pourcentageRealisation:string="";


// TableauReport=[];
selectedRegion:string='';
selectedcirfin:string='';
selectedMonth:string='';

changeValue(event:any){
    this.selectedRegion=event.target.value;
    console.log(this.selectedRegion)
}

cirfinValue(event:any){
  this.selectedcirfin=event.target.value;
  console.log(this.selectedcirfin)
}

monthValue(event:any){
  this.selectedMonth=event.target.value;
  console.log(this.selectedMonth)
}

sendReport(addReport:report,reportForm:NgForm){
  this.addjsonReport.addReport(addReport).subscribe({
      next:(res:any)=>{
      //this.TableauReport.push(res);
        // console.log(this.TableauReport);
         reportForm.reset();
      },
      error:(err)=>{
           console.log(err);
      }
  })
  /*this.TableauReport.push(reportForm.value);
  const jsonData=JSON.stringify(reportForm.value);
  localStorage.setItem('listReport',jsonData);*/
}

}
