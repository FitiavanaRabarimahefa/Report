import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import socketIo from 'socket.io-client';
import { ServiceFormationJsonService } from '../service-formation-json/service-formation-json.service';


interface formationJson{
  name_Report: String,
  numero: String,
  region: String,
  lieu: String,
  mois: String,
  cirfinValue: String,
  debut: String,
  fin: String,
  theme: String,
  sousTheme: String,
  objectif:String,
  formateur:Array<String>,
  participant: Array<String>,
  observation: String,

}

const EMPTY_MODEL_JSON: formationJson={

  name_Report:'',
  numero:'',
  region:'',
  lieu:'',
  mois:'',
  cirfinValue:'',
  debut:'',
  fin:'',
  theme:'',
  sousTheme:'',
  objectif:'',
  formateur:[],
  participant:[],
  observation:'',

}

@Component({
  selector: 'app-rapport-formation',
  templateUrl: './rapport-formation.component.html',
  styleUrls: ['./rapport-formation.component.css']
})
export class RapportFormationComponent implements OnInit {

  tabParticipant: string[] = [];
  tabFormateur: string[] = [];
  indexPartcipantModify: number;
  indexFormateurModify: number;

  constructor(private serviceToJson: ServiceFormationJsonService) {
     const storageRegion = localStorage.getItem("Region");
     this.addToJson.region= storageRegion;
  }

  TableauReport:any=[];
  Tmp:any=[];
  addToJson:formationJson={...EMPTY_MODEL_JSON}

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

  visibleAddFormateur = "block";
  visibleAddParticipant = "block";
  visibleAddList = "block";

  visibleEditFormateur = "none";
  visibleEditParticipant = "none";
  visibleViewList="none"

  selectedcirfin:string='';
  selectedMonth: string = '';
  pourcentage: number=0;


// changeValue(event:any){
//     this.selectedRegion=event.target.value;
//     this.addReport.region=this.selectedRegion;
//     console.log(this.selectedRegion)
// }

cirfinValue(event:any){
  this.selectedcirfin=event.target.value;
  this.addToJson.cirfinValue = event.target.value;
  console.log(this.selectedcirfin)
}

monthValue(event:any){
  this.selectedMonth=event.target.value;
  this.addToJson.mois=this.selectedMonth;
  console.log(this.selectedMonth)
}



  AddFormateur(form:NgForm) {
    this.tabFormateur.push(form.value.formateur);
    this.addToJson.formateur = this.tabFormateur;

  }

  onEditFormateur(form:NgForm, numero: number) {
  this.visibleEditFormateur = "block";
  this.visibleAddFormateur = "none";

    form.controls['formateur'].setValue(this.tabFormateur[numero]);
    this.indexFormateurModify = numero;
  }

  onModifyFormateur(form: NgForm) {
    this.visibleAddFormateur= "block";
    this.visibleEditFormateur = "none";
    this.tabFormateur[this.indexFormateurModify] = form.value['formateur'];

  }

  onDeleteFormateur(form:NgForm, numero:number){
    this.tabFormateur.splice(numero,1);

  }


  AddParticipant(form:NgForm) {
    this.tabParticipant.push(form.value.participant);
    this.addToJson.participant = this.tabParticipant;

  }

  onEditParticipant(form:NgForm, numero: number) {
  this.visibleEditParticipant = "block";
  this.visibleAddParticipant = "none";

    form.controls['participant'].setValue(this.tabParticipant[numero]);
    this.indexPartcipantModify = numero;
  }

  onModifyParticipant(form: NgForm) {
    this.visibleAddParticipant = "block";
  this.visibleEditParticipant = "none";
    this.tabParticipant[this.indexPartcipantModify] = form.value['participant'];

  }

  onDeleteParticipant(form:NgForm, numero:number){
    this.tabParticipant.splice(numero,1);

  }

  sendToSuperior(addToJson: formationJson,form:NgForm) {
    this.addToJson.name_Report = "formation";
    this.serviceToJson.saveJson(addToJson).subscribe({
      next: (res: any) => {
        if (res) console.log("okey");
        form.reset();
      },
      error: (err: any) => {
        if(err) console.log("bad request")
      }
    })
  }



}
