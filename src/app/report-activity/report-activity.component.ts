import { SendjsonserviceService } from './../sendjsonservice/sendjsonservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceBAAFService } from './../serviceBAAF/service-baaf.service';
import { JsonService } from './../jsonService/json.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, NgModel } from '@angular/forms';


interface editReport{
  id:String,
  produit:String,
  realisation:String,
  valeurCible:String,
  pourcentageRealisation:String,
}

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

const EMPTY_MODEL_json:editReport={
  id:'',
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

  visibleAddList='block';
  visibleEditList='none';



addReport:report={...EMPTY_MODEL};
editJsonReport:editReport={...EMPTY_MODEL_json};



  constructor(private addjsonReport:ServiceBAAFService,
    private getServicejson:JsonService,
    private router:Router,
    private route:ActivatedRoute,
    private editJsonService:SendjsonserviceService

    ) { }
    TableauReport:any=[];
    Tmp:any=[];
    id='';


  ngOnInit(): void {

      this.getServicejson.getData().subscribe({
        next:(res:any)=>{
         console.log(JSON.parse(res));
         this.TableauReport=JSON.parse(res);
         this.Tmp=this.TableauReport.filter(x=>!!x);

        },
        error:(err)=>{
            return err;
        }
      })
  }
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
        console.log(res);
        if (res){
          this.router.routeReuseStrategy.shouldReuseRoute=()=>false;
          this.router.onSameUrlNavigation='reload';
        }
         reportForm.reset();

      },
      error:(err)=>{
           console.log(err);
      }
  })
};
validateEditReport(reportForm:NgForm){
  //console.log(reportForm.value);

  this.visibleAddList="block";
  this.visibleEditList="none";

  this.route.paramMap.subscribe(params   => {
    this.id = params.get('id');
  });

  this.editJsonReport.id=this.id;
  this.editJsonReport.produit=reportForm.value.produit;
  this.editJsonReport.realisation=reportForm.value.realisation;
  this.editJsonReport.valeurCible=reportForm.value.valeurCible;
  this.editJsonReport.pourcentageRealisation=reportForm.value.pourcentage;

  this.editJsonService.editJson(this.editJsonReport).subscribe({
    next:(res:any)=>{
        reportForm.reset();
        console.log(res);
    },
    error:(err)=>{
      console.log(err);
    }
  })

};

editData(id,reportForm:NgForm){
  this.visibleEditList='block';
  this.visibleAddList='none';
  reportForm.controls['produit'].setValue(this.TableauReport[id-1].produit);
  reportForm.controls['realisation'].setValue(this.TableauReport[id-1].realisation);
  reportForm.controls['valeurCible'].setValue(this.TableauReport[id-1].valeurCible);
  reportForm.controls['pourcentage'].setValue(this.TableauReport[id-1].pourcentageRealisation);
};
deleteData(){
    alert("deleteData");
};
sendData(){
    alert("sendData")
}
}
