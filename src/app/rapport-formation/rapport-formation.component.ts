import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiceFormationJsonService } from '../service-formation-json/service-formation-json.service';


interface formationJson{
  nom_rapport: String,
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

  nom_rapport:'',
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

        addToJson:formationJson={...EMPTY_MODEL_JSON}

  ngOnInit(): void {
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

  sendToSuperior(addToJson: formationJson) {
    this.addToJson.nom_rapport = "formation";
    this.serviceToJson.saveJson(addToJson).subscribe({
      next: (res: any) => {
           if(res) console.log("okey")
      },
      error: (err: any) => {
        if(err) console.log("bad request")
      }
    })
  }



}
