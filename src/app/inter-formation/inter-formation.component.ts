import { Component, OnInit } from '@angular/core';
import socketIo from 'socket.io-client';
import { DeleteFormationService } from '../service-delete-formation/delete-formation.service';
import { ServiceFormationService } from '../service-formation-mongo/service-formation.service';


interface dataMongo{

        nom_rapport:String,
        numero:String,
        mois:String,
        cirfinValue:String,
        region: String,
        debut: String,
        fin:String,
        lieu:String,
        theme:String,
        sousTheme:String,
        objectif:String,
        formateur:Array<String>,
        participant:Array<String>,
        observation:String,
}


interface identification{
  id:String
}

const EMPTY_MODEL_FORMATION: dataMongo={

        nom_rapport:'',
        numero:'',
        mois:'',
        cirfinValue:'',
        region: '',
        debut: '',
        fin:'',
        lieu:'',
        theme:'',
        sousTheme:'',
        objectif:'',
        formateur:[],
        participant:[],
        observation:'',

}

const EMPTY_MODEL_DELETE: identification={
  id:''
}

@Component({
  selector: 'app-inter-formation',
  templateUrl: './inter-formation.component.html',
  styleUrls: ['./inter-formation.component.css']
})
export class InterFormationComponent implements OnInit {

  TableauReport:any=[];
  Tmp: any = [];
  visibilitybtn = 'block';
  statusSend: boolean;

  saveMongo: dataMongo = { ...EMPTY_MODEL_FORMATION };
  idDelete: identification = { ...EMPTY_MODEL_DELETE };

  constructor(
    private serviceMongo: ServiceFormationService,
    private serviceDelete:DeleteFormationService
  ) { }

  ngOnInit(): void {
     const storage=localStorage.getItem("Region");
    console.log(storage);

   const socket=socketIo('http://localhost:8080');
   socket.on('data4',(data)=>{
    console.log(JSON.parse(data));
    this.TableauReport=JSON.parse(data);
    console.log(this.TableauReport.length);
    function myFunction(value) {
      return value=!!value && value.region==storage && value.name_Report=="formation";
    }
    this.Tmp=this.TableauReport.filter(myFunction);
   });
  }

  sendMongo(id) {
    this.saveMongo.nom_rapport = this.TableauReport[id-1].name_Report;
    this.saveMongo.region = this.TableauReport[id-1].region;
    this.saveMongo.cirfinValue = this.TableauReport[id-1].cirfin;
    this.saveMongo.mois = this.TableauReport[id-1].mois;
    this.saveMongo.debut = this.TableauReport[id-1].debut;
    this.saveMongo.fin = this.TableauReport[id-1].fin;
    this.saveMongo.lieu = this.TableauReport[id-1].lieu;
    this.saveMongo.numero = this.TableauReport[id-1].numero;
    this.saveMongo.theme = this.TableauReport[id-1].theme;
    this.saveMongo.sousTheme = this.TableauReport[id-1].sousTheme;
    this.saveMongo.objectif = this.TableauReport[id-1].objectif;
    this.saveMongo.formateur = this.TableauReport[id - 1].formateur;
    this.saveMongo.participant = this.TableauReport[id-1].participant;
    this.saveMongo.observation = this.TableauReport[id-1].observation;

    this.serviceMongo.saveMongo(this.saveMongo).subscribe({
      next: (res: any) => {
        if (res.success) {

          this.visibilitybtn = 'none';
          this.statusSend = true;

          this.idDelete.id = id;


            setTimeout(() => {
             this.serviceDelete.formationDelete(this.idDelete).subscribe({
               next: (res: any) => {
                 console.log(res)

               },
               error: (err: any) => {
                      console.log(err)
               }
             })
              this.statusSend = false;
           },2000);


         }

      },
      error: (err: any) => {
         console.log(err)
      }
    })

  }

}
