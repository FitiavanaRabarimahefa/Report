import { Component, OnInit } from '@angular/core';
import { ServiceBAAFService } from '../serviceBAAF/service-baaf.service';
import socketIo from 'socket.io-client';

interface report{
  nameReport: String,
  numero:String,
  region:String,
  cirfinValue:String,
  mois:String,
  produit:String,
  realisation:String,
  valeurCible:String,
  pourcentageRealisation:String,
}


const EMPTY_MODEL_Json: report = {
  region: '',
  numero:'',
  nameReport:'',
  cirfinValue:'',
  mois:'',
  produit:'',
  realisation:'',
  valeurCible:'',
  pourcentageRealisation:''
}

@Component({
  selector: 'app-centre-informatique',
  templateUrl: './centre-informatique.component.html',
  styleUrls: ['./centre-informatique.component.css']
})
export class CentreInformatiqueComponent implements OnInit {

  addToJson:report={...EMPTY_MODEL_Json}

  constructor(
    private ServiceaddToJson: ServiceBAAFService
  ) {
    const storageRegion = localStorage.getItem("Region");
    this.addToJson.region=storageRegion
  }

  TableauReport = [];
  Tmp = [];
  nameReport = "Réalisations du Centre Informatique Régional";

  ngOnInit(): void {

    const storage = localStorage.getItem("Region");

    const socket=socketIo('http://localhost:8080');
   socket.on('data1',(data)=>{
    console.log(JSON.parse(data));
    this.TableauReport=JSON.parse(data);
    console.log(this.TableauReport.length);
    function myFunction(value) {
      return value=!!value && value.region==storage && value.name_Report=="Réalisations du Centre Informatique Régional";
    }
    this.Tmp=this.TableauReport.filter(myFunction);
   });
  }

selectedcirfin:string='';
  selectedMonth: string = '';
  selectedProduct: string = '';
  pourcentage: number=0;

  cirfinValue(event:any){
  this.selectedcirfin=event.target.value;
  this.addToJson.cirfinValue=this.selectedcirfin;
  console.log(this.selectedcirfin)
}

monthValue(event:any){
  this.selectedMonth=event.target.value;
  this.addToJson.mois=this.selectedMonth;
  console.log(this.selectedMonth)
}
  productValue(event: any) {
    this.selectedProduct = event.target.value;
    this.addToJson.produit = event.target.value;
    console.log(this.selectedProduct)

  }



  SaveToJson(addToJson: report) {
    function getPourcentage(a,b) {
         return (a / b) * 100;
    }
    this.pourcentage = getPourcentage(this.addToJson.realisation, this.addToJson.valeurCible);
    this.addToJson.pourcentageRealisation = this.pourcentage.toString();
    this.addToJson.nameReport = this.nameReport;

    this.ServiceaddToJson.addReport(addToJson).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any)=>{
          console.log(err)
      }
    })
  }

}
