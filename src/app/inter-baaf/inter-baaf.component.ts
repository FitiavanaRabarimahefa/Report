import { Component, OnInit } from '@angular/core';
import socketIo from 'socket.io-client';
import { DeleteJsonServiceService } from '../deleteJsonService/delete-json-service.service';
import { SaveReportService } from '../saveReportService/save-report.service';


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


interface identification{
  id:String,
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

const EMPTY_MODEL_id:identification={
  id:'',
}

@Component({
  selector: 'app-inter-baaf',
  templateUrl: './inter-baaf.component.html',
  styleUrls: ['./inter-baaf.component.css']
})
export class InterBaafComponent implements OnInit {

  constructor(
    private saveMongo: SaveReportService,
    private deleteJsonService:DeleteJsonServiceService,
  ) { }

 TableauReport:any=[];
  Tmp: any = [];
  visibleSend='block'
  visibileCheck = 'none';

  sendJson: Sendreport = { ...EMPTY_MODEL_SEND };
  identifiant:identification={...EMPTY_MODEL_id};

  ngOnInit(): void {
       const storage=localStorage.getItem("Region");
    console.log(storage);

   const socket=socketIo('http://localhost:8080');
   socket.on('data1',(data)=>{
    console.log(JSON.parse(data));
    this.TableauReport=JSON.parse(data);
    console.log(this.TableauReport.length);
    function myFunction(value) {
      return value=!!value && value.region==storage && value.name_Report=="Réalisations du Bureau des Affaires Administratives et Financières";
    }
    this.Tmp=this.TableauReport.filter(myFunction);
   });
  }

  validate(id) {

    this.sendJson.nom_rapport = this.TableauReport[id-1].name_Report;
    this.sendJson.numero = this.TableauReport[id-1].numero;
    this.sendJson.mois = this.TableauReport[id-1].mois;
    this.sendJson.cirfinValue = this.TableauReport[id-1].cirfin;
    this.sendJson.region=this.TableauReport[id-1].region,
    this.sendJson.produit=this.TableauReport[id-1].produit;
    this.sendJson.realisation=this.TableauReport[id-1].realisation;
    this.sendJson.valeurCible=this.TableauReport[id-1].valeurCible;
    this.sendJson.pourcentageRealisation=this.TableauReport[id-1].pourcentageRealisation;

    console.log(this.sendJson)

      this.saveMongo.sendJson(this.sendJson).subscribe({
        next: (res: any) => {
          this.identifiant.id = id;

             setTimeout(() => {
               this.deleteJsonService.deleteJson(this.identifiant).subscribe({
                 next: (res: any) => {
                   return res;
                 },
                 error: (err: any) => {
                   return err;
                 }
                  })
             }, 500);
        },
        error:(err:any)=>{
                console.log(err);

        }
      })
  }
}
