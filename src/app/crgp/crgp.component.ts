import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import CrgpModel from '../models/crgpModels';
import { CrgpServiceService } from '../service-crgp-json/crgp-service.service';
import { SaveToMongoService } from '../service_mongo_crgp/save-to-mongo.service';




interface crgpReport{
  name_Report: String,
  numero: String,
  region: String,
  lieu: String,
  mois: String,
  cirfinValue: String,
  participant: Array<String>,
  ordreJour: Array<String>,
  observation: String,
  evaluation:Array<String>,
}

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

const EMPTY_MODEL_Json: crgpReport={
  name_Report:'',
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

const EMPTY_MODEL_Mongo: dataMongo = {
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
@Component({
  selector: 'app-crgp',
  templateUrl: './crgp.component.html',
  styleUrls: ['./crgp.component.css']
})
export class CRGPComponent implements OnInit {

  addToJson: crgpReport = { ...EMPTY_MODEL_Json };
  addToMongo: dataMongo = { ...EMPTY_MODEL_Mongo };

  tabParticipant: string[] = [];
  indexPartcipantModify: number;
  tabEvaluation: CrgpModel[] = [];
  indexEvaluationModify: number;
  observationArray: string[] = [];
dailyOrder:string[] = [];
enableCheckbox:boolean[] = [false,false,false,false,false];
  disableInputOther: boolean = true;
  indexEditingObsesrvation!: number;


  constructor(
    private serviceSaveToJson: CrgpServiceService,
    private serviceToMongo: SaveToMongoService
  ) {
    const storageRegion = localStorage.getItem("Region");
    this.addToMongo.region = storageRegion;


   }

  ngOnInit(): void {
  }


selectedcirfin:string='';
selectedMonth: string = '';
nameReport = "CRGP";


  visibleAddPerson = "block";
  visibleModifyPerson = "none";
  visibleAddTab = "block";
  visibleModifyTab="none"


  cirfinValue(event:any){
  this.selectedcirfin=event.target.value;
    this.addToJson.cirfinValue = this.selectedcirfin;
    this.addToMongo.cirfinValue = this.selectedcirfin;
  console.log(this.selectedcirfin)
}

monthValue(event:any){
  this.selectedMonth=event.target.value;
  this.addToJson.mois = this.selectedMonth;
  this.addToMongo.mois = this.selectedMonth;
  console.log(this.selectedMonth)
}

   onChange(event:any,form:NgForm,nom:string) {

    if(form.value[nom]===true && this.dailyOrder.length < 2){
      this.dailyOrder.push(event.target.value);
      this.addToJson.ordreJour = this.dailyOrder;
      //console.log(this.addToJson.ordreJour);
      if(event.target.value == 'Autres')
      {
        if(this.disableInputOther === true)
          this.disableInputOther = false;
      }
      if(this.dailyOrder.length >= 2){
        this.enableCheckbox[0]=true;
        this.enableCheckbox[1]=true;
        this.enableCheckbox[2]=true;
        this.enableCheckbox[3]=true;
        this.enableCheckbox[4]=true;
        this.dailyOrder.forEach( (element) => {
          switch (element) {
            case 'Formation Circulaire d\'Exécution Budgétaire LFI':
              this.enableCheckbox[0]=false;
              break;
            case 'Dialogue de gestion pour l\'exécution budgétaire':
              this.enableCheckbox[1]=false;
              break;
            case 'Formation Circulaire d\'Exécution Budgétaire LFR':
              this.enableCheckbox[2]=false;
              break;
            case 'Dialogue de gestion sur la clôture de gestion':
              this.enableCheckbox[3]=false;
              break;
            case 'Autres':
              this.enableCheckbox[4]=false;
              break;
          }
        });
      }
    }
    else {
      this.dailyOrder.splice(this.dailyOrder.indexOf(event.target.value),1);
      this.enableCheckbox[0]=false;
      this.enableCheckbox[1]=false;
      this.enableCheckbox[2]=false;
      this.enableCheckbox[3]=false;
      this.enableCheckbox[4]=false;
      this.disableInputOther = true;
    }
   }

  AddParticipant(form:NgForm) {
    this.tabParticipant.push(form.value.participant);
    this.addToJson.participant = this.tabParticipant;

    console.log(this.addToJson.participant)

  }

  onEditParticipant(form: NgForm, numero: number) {
  this.visibleAddPerson = "none";
  this.visibleModifyPerson = "block";

    form.controls['participant'].setValue(this.tabParticipant[numero]);
    this.indexPartcipantModify = numero;
  }

  onModifyParticipant(form: NgForm) {
    this.visibleAddPerson = "block";
  this.visibleModifyPerson = "none";
    this.tabParticipant[this.indexPartcipantModify] = form.value['participant'];

  }

  onDeleteParticipant(form:NgForm, numero:number){
    this.tabParticipant.splice(numero,1);

  }
/* OBSERVATION
  onAddObservation(form:NgForm){

    const observation: string = form.value['observation'];
    this.observationArray.push(observation);
    form.reset();
  }

  onEditObservation(form:NgForm, indexObservation:number){
    form.controls['observation'].setValue(this.observationArray[indexObservation]);
    this.indexEditingObsesrvation = indexObservation;
  }

  onDeleteObservation(form:NgForm, indexObservation:number){
    this.observationArray.splice(indexObservation,1);
    form.reset();
  }

  onModifyObservation(form:NgForm){
    this.observationArray[this.indexEditingObsesrvation] = form.value['observation'];
    form.reset();
  }
*/
//   SendToJson(addToJson: crgpReport) {
//     this.addToJson.nameReport = this.nameReport

//  const ObjectEvaluation = {
//    theme:this.addToJson.theme,
//    probleme:this.addToJson.probleme,
//    solution:this.addToJson.solution,
//  }
//     this.addToJson.evaluation=ObjectEvaluation,
//     this.serviceSaveToJson.saveToJson(addToJson).subscribe({
//       next: (res: any) => {
//         console.log(res);
//       },
//       error: (err: any) => {
//         console.log(err);
//       }
//   })
// }

  AddToList(form: NgForm) {
    const ObjectEvaluation: CrgpModel = {
        id: this.tabEvaluation.length == 0 ? 1 : this.tabEvaluation[this.tabEvaluation.length - 1].id +1 ,
        theme: form.value.theme,
        probleme:form.value.probleme,
        solution:form.value.solution
      }

    this.tabEvaluation.push(ObjectEvaluation);

    console.log(this.tabEvaluation);
  }


  onAddReportCrgp(form:NgForm){
    const reportCrgp: CrgpModel = {
      id: this.tabEvaluation.length == 0 ? 1 : this.tabEvaluation[this.tabEvaluation.length - 1].id +1 ,
      theme: form.value['theme'],
      probleme: form.value['probleme'],
      solution: form.value['solution']
    };
    this.tabEvaluation.push(reportCrgp);
    //form.reset();
  }

  onDeleteReportCrgp(form:NgForm, indeCrgp:number){
    this.tabEvaluation.splice(indeCrgp, 1);
    //form.reset();

  }

  onEditingReportCrgp(form: NgForm, indexEdit: number) {
 this.visibleAddTab = "none";
 this.visibleModifyTab="block"
    form.controls['theme'].setValue(this.tabEvaluation[indexEdit].theme);
    form.controls['probleme'].setValue(this.tabEvaluation[indexEdit].probleme);
    form.controls['solution'].setValue(this.tabEvaluation[indexEdit].solution);
    this.indexEvaluationModify = indexEdit;
  }

  onModifyReportCrgp(form: NgForm) {
 this.visibleAddTab = "block";
 this.visibleModifyTab="none"
    this.tabEvaluation[this.indexEvaluationModify].theme = form.value['theme'];
    this.tabEvaluation[this.indexEvaluationModify].probleme = form.value['probleme'];
    this.tabEvaluation[this.indexEvaluationModify].solution = form.value['solution'];
    //form.reset();
  }
  SaveMongo(form: NgForm) {
   const indice = this.dailyOrder.indexOf('Autres')
      if(indice != -1){
          this.dailyOrder.splice(this.dailyOrder.indexOf('Autres'),1);
          this.dailyOrder.push(form.value['other']);
        this.addToMongo.ordreJour = this.dailyOrder;
      } else {
        this.addToMongo.ordreJour = this.dailyOrder;
      }

  this.addToMongo.nom_rapport="CRGP";
  this.addToMongo.lieu = form.value.lieu;
  this.addToMongo.numero = form.value.numero;
  this.addToMongo.participant = this.tabParticipant;
  this.addToMongo.observation = form.value.observation;
  this.addToMongo.evaluation = this.tabEvaluation;

  console.log(this.addToMongo);

  this.serviceToMongo.Save(this.addToMongo).subscribe({
    next: (res: any) => {
       console.log("succes")
    },
    error: (err: any) => {
      console.log(err)
    }
  })
}


}
