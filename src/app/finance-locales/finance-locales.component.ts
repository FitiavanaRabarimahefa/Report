import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeleteJsonServiceService } from '../deleteJsonService/delete-json-service.service';
import { SaveReportService } from '../saveReportService/save-report.service';
import { SendjsonserviceService } from '../sendjsonservice/sendjsonservice.service';
import { ServiceBAAFService } from '../serviceBAAF/service-baaf.service';
import socketIo from 'socket.io-client';
import { NgForm } from '@angular/forms';



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

interface editReport{
  id:String,
  produit:String,
  realisation:String,
  valeurCible:String,
  pourcentageRealisation:String,
}

interface identification{
  id:String,
}


interface Sendreport{
  region: String,
  numero: String,
  mois:String,
  cirfinValue:String,
  nom_rapport:String,
  produit:String,
  realisation:String,
  valeurCible:String,
  pourcentageRealisation:String,
}

const EMPTY_MODEL_EditJson:editReport={
  id:'',
  produit:'',
  realisation:'',
  valeurCible:'',
  pourcentageRealisation:''
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

const EMPTY_MODEL_id:identification={
  id:'',
}


const EMPTY_MODEL_SEND: Sendreport = {
  region: '',
  numero: '',
  mois:'',
  cirfinValue:'',
  nom_rapport:'',
  produit:'',
  realisation:'',
  valeurCible:'',
  pourcentageRealisation:''
}

@Component({
  selector: 'app-finance-locales',
  templateUrl: './finance-locales.component.html',
  styleUrls: ['./finance-locales.component.css']
})
export class FinanceLocalesComponent implements OnInit {

   visibleAddList='block';
  visibleEditList = 'none';
  visibleBtnEdit = 'block';
  visibleBtnSend = 'block';

  addToJson: report = { ...EMPTY_MODEL_Json }
  editJson: editReport = { ...EMPTY_MODEL_EditJson }
  identifiant: identification = { ...EMPTY_MODEL_id }
  sendJson:Sendreport={...EMPTY_MODEL_SEND}

  constructor(
    private ServiceaddToJson: ServiceBAAFService,
    private editJsonService: SendjsonserviceService,
    private deleteJsonService: DeleteJsonServiceService,
    private sendToMongoService: SaveReportService,
    private route:ActivatedRoute
  ) {
    const storageRegion = localStorage.getItem("Region");
    this.addToJson.region=storageRegion
  }

  TableauReport = [];
  Tmp = [];
  id ='';
  nameReport = "Réalisations de la Division Chargée des Finances Locales et Tutelle des EPN";

  ngOnInit(): void {
    const storage = localStorage.getItem("Region");

    const socket=socketIo('http://localhost:8080');
   socket.on('data1',(data)=>{
    console.log(JSON.parse(data));
    this.TableauReport=JSON.parse(data);
    console.log(this.TableauReport.length);
    function myFunction(value) {
      return value=!!value && value.region==storage && value.name_Report=="Réalisations de la Division Chargée des Finances Locales et Tutelle des EPN";
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
    this.editJson.produit = event.target.value;
    console.log(this.selectedProduct)

  }

  SaveToJson(addToJson: report) {
    function getPourcentage(a,b) {
         return (a / b) * 100;
    }
    this.pourcentage =getPourcentage(this.addToJson.realisation, this.addToJson.valeurCible);
    this.addToJson.pourcentageRealisation = this.pourcentage.toFixed(2).toString();
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

  editData(id, form:NgForm, opt0, opt1, opt2, opt3, opt4,opt5,opt6,opt7) {

     this.visibleEditList='block';
     this.visibleAddList='none';

    switch (this.TableauReport[id-1].produit) {
      case"Budgets primitifs visés": opt0.selected = true;
        break;
      case "Budgets rectificatifs visés": opt1.selected = true;
        break;
      case "Budgets additionnels visés": opt2.selected = true;
        break;
      case "Comptes administratifs visés": opt3.selected = true;
        break;
      case "Dossiers de personnel EPN Visés : renouvellement, recrutement, retraite…": opt4.selected = true;
        break;
      case "CTD formées en Budget de Programmes": opt5.selected = true;
        break;
      case "Responsables appuyés et assistés sur l’élaboration de Budget primitif": opt6.selected = true;
        break;
      case "Responsables appuyés et assistés sur l’élaboration de compte administratif": opt7.selected = true;

    }

    form.controls['realisation'].setValue(this.TableauReport[id-1].realisation);
    form.controls['valeurCible'].setValue(this.TableauReport[id-1].valeurCible);

  }

  validateModification(form:NgForm) {

     this.visibleAddList="block";
     this.visibleEditList="none";

     this.route.paramMap.subscribe(params   => {
       this.id = params.get('id');

     });

        function getPourcentage(a,b) {
         return (a / b) * 100;
        }

     this.pourcentage =getPourcentage(form.value.realisation,form.value.valeurCible);

    this.editJson.id = this.id;
    this.editJson.realisation = form.value.realisation;
    this.editJson.valeurCible = form.value.valeurCible;
    this.editJson.pourcentageRealisation = this.pourcentage.toFixed(2).toString();

    this.editJsonService.editJson(this.editJson).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
           console.log(err)
      }
    })


  }

  deleteData(id) {
    this.identifiant.id = id;
    this.deleteJsonService.deleteJson(this.identifiant).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any)=>{
        console.log(err);
      }
    })
  }


  sendMongo(id) {
    //  this.visibleBtnEdit = 'none';
    //  this.visibleBtnSend='none'
    this.sendJson.nom_rapport = this.nameReport;
    this.sendJson.cirfinValue = this.TableauReport[id-1].cirfin;
    this.sendJson.numero = this.TableauReport[id-1].numero;
    this.sendJson.mois = this.TableauReport[id - 1].mois;
    this.sendJson.region = this.TableauReport[id - 1].region;
    this.sendJson.realisation = this.TableauReport[id - 1].realisation;
    this.sendJson.produit = this.TableauReport[id-1].produit;
    this.sendJson.valeurCible = this.TableauReport[id - 1].valeurCible;
    this.sendJson.pourcentageRealisation = this.TableauReport[id - 1].pourcentageRealisation;

    this.sendToMongoService.sendJson(this.sendJson).subscribe({
      next: (res: any) => {
        console.log(res);

      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

}
