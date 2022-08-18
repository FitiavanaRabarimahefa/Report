import { Component, OnInit } from '@angular/core';
import socketIo from 'socket.io-client';
import { DeleteReportService } from '../delelete-report-mensual-service/delete-report.service';
import { SaveMongoService } from '../save-report-mensual-mongo-service/save-mongo.service';

interface jsonToMongo{
  nom_rapport: String,
  numero: String,
  mois:String,
  cirfinValue: String,
  region: String,
  faits: String,
  observations,
}

interface identifiant{
  id:String
}



const EMPTY_MODEL_ToMongo: jsonToMongo = {
  nom_rapport:"",
  numero: "",
  mois:"",
  cirfinValue:"",
  region:"",
  faits:"",
  observations:"",
}

const EMPTY_MODEL_ToDelete: identifiant = {
    id:""
}

@Component({
  selector: 'app-inter-fait',
  templateUrl: './inter-fait.component.html',
  styleUrls: ['./inter-fait.component.css']
})
export class InterFaitComponent implements OnInit {

   TableauReport = [];
  Tmp = [];

  visibleSend = "block";
  visibileCheck = "none";

  jsonToDelete: identifiant = { ...EMPTY_MODEL_ToDelete };
  addToMongo:jsonToMongo={...EMPTY_MODEL_ToMongo}

  constructor(
    private serviceMongo: SaveMongoService,
    private serviceDelete:DeleteReportService
  ) { }

  ngOnInit(): void {
    const storage=localStorage.getItem("Region");
    console.log(storage);

   const socket=socketIo('http://localhost:8080');
   socket.on('data2',(data)=>{
    console.log(JSON.parse(data));
    this.TableauReport=JSON.parse(data);
    console.log(this.TableauReport.length);
    function myFunction(value) {
      return value=!!value && value.region==storage;
    }
    this.Tmp=this.TableauReport.filter(myFunction);
   });
    console.log(this.Tmp);
  }


  validate(id) {

    this.visibleSend = "none";
    this.visibileCheck = "block";

   this.addToMongo.nom_rapport = this.TableauReport[id-1].name_Report;
    this.addToMongo.numero = this.TableauReport[id-1].numero;
    this.addToMongo.mois = this.TableauReport[id-1].mois;
    this.addToMongo.cirfinValue = this.TableauReport[id-1].cirfin;
    this.addToMongo.region=this.TableauReport[id-1].region
    this.addToMongo.faits = this.TableauReport[id-1].faits;
    this.addToMongo.observations=this.TableauReport[id-1].observations

    console.log(this.addToMongo);

    this.serviceMongo.sendData(this.addToMongo).subscribe({
      next: (res: any) => {
        this.jsonToDelete.id = id;

        setTimeout(() => {
          this.serviceDelete.deleteJson(this.jsonToDelete).subscribe({
            next:(res: any)=>{
                return res
            },
            error: (err: any) => {
                return err
            }
             })
        }, 500);
      },
      error: (err: any) => {
        console.log(err);
      }
    })

  }

}
