import { Component, OnInit } from '@angular/core';
import socketIo from 'socket.io-client';
import CrgpModel from '../models/crgpModels';
import { DeleteCrgpService } from '../service-delete-crgp/delete-crgp.service';
import { SaveToMongoService } from '../service_mongo_crgp/save-to-mongo.service';



interface dataMongo{
  nom_rapport: String,
  numero: String,
  region: String,
  lieu: String,
  mois: String,
  cirfinValue: String,
  participant: Array<String>,
  ordreJour: Array<String>,
  observation: String,
  evaluation:Array<CrgpModel>;
}


interface identidication{
  id:String
}

const EMPTY_MODEL_CRGP: dataMongo={
  nom_rapport:'',
  numero:'',
  region:'',
  lieu:'',
  mois:'',
  cirfinValue:'',
  participant:[],
  ordreJour:[],
  observation:'',
  evaluation:[]
}

const EMPTY_MODEL_DELETE:identidication = {
    id:''
}



@Component({
  selector: 'app-inter-crgp',
  templateUrl: './inter-crgp.component.html',
  styleUrls: ['./inter-crgp.component.css']
})
export class InterCrgpComponent implements OnInit {

  TableauReport:any=[];
  Tmp: any = [];
  visibilitybtn = 'block';
  statusSend: boolean;


  addMongo: dataMongo = { ...EMPTY_MODEL_CRGP };
  IdDelete:identidication= { ...EMPTY_MODEL_DELETE };

  constructor(
    private serviceSendMongo: SaveToMongoService,
    private serviceDeleteCRGP:DeleteCrgpService,
  ) {}

  ngOnInit(): void {
     const storage=localStorage.getItem("Region");
    console.log(storage);

   const socket=socketIo('http://localhost:8080');
   socket.on('data3',(data)=>{
    console.log(JSON.parse(data));
    this.TableauReport=JSON.parse(data);
    console.log(this.TableauReport.length);
    function myFunction(value) {
      return value=!!value && value.region==storage && value.name_Report=="CRGP";
    }
    this.Tmp=this.TableauReport.filter(myFunction);
   });
  }

  sendMongo(id) {
    this.addMongo.nom_rapport = this.TableauReport[id-1].name_Report;
    this.addMongo.numero = this.TableauReport[id-1].numero;
    this.addMongo.region = this.TableauReport[id-1].region;
    this.addMongo.lieu = this.TableauReport[id-1].lieu;
    this.addMongo.mois = this.TableauReport[id-1].mois;
    this.addMongo.cirfinValue = this.TableauReport[id-1].cirfin;
    this.addMongo.ordreJour = this.TableauReport[id-1].ordreJour;
    this.addMongo.participant = this.TableauReport[id-1].participant;
    this.addMongo.observation = this.TableauReport[id-1].observation;
    this.addMongo.evaluation = this.TableauReport[id - 1].evaluation;

    this.serviceSendMongo.Save(this.addMongo).subscribe({
      next: (res: any) => {
          this.visibilitybtn = 'none';
          this.statusSend = true;

        setTimeout(() => {
            this.IdDelete.id = id;
          console.log(this.IdDelete);
             this.serviceDeleteCRGP.deleteCRGP(this.IdDelete).subscribe({
               next: (res: any) => {
                 console.log(res)
               },
               error: (err: any) => {
                 console.log(err);
               }
            })
          },200);


      },
      error: (err: any) => {
        console.log(err);
      }
      })
  }

}
