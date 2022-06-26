import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MensualReportJsonService } from '../mensual-report-servive-json/mensual-report-json.service';
import socketIo from 'socket.io-client'
import { DeleteReportService } from '../delelete-report-mensual-service/delete-report.service';
import { EditJsonService } from '../Service-edit-ReportMensual/edit-json.service';
import { ActivatedRoute } from '@angular/router';
import { SaveMongoService } from '../save-report-mensual-mongo-service/save-mongo.service';

interface report{
        id:String,
        nameReport:String,
        region:String,
        mois:String,
        numero:Number,
        cirfinValue:String,
        faits:String,
        observations:String
}
interface identifiant{
  id:String
}
interface newJson{
  id: String;
   faits:String,
   observations:String,
}

const EMPTY_MODEL_Json: report = {
        id:"",
        nameReport:"",
        region:"",
        mois:"",
        numero:0,
        cirfinValue:"",
        faits:"",
        observations: ""
}

interface jsonToMongo{
  nom_rapport: String,
  numero: String,
  mois:String,
  cirfinValue: String,
  region: String,
  faits: String,
  observations,
}

const EMPTY_MODEL_ToDelete: identifiant = {
    id:""
}

const EMPTY_MODEL_ToEdit: newJson = {
  id: "",
  faits: "",
  observations:""
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

@Component({
  selector: 'app-report-mensual',
  templateUrl: './report-mensual.component.html',
  styleUrls: ['./report-mensual.component.css']
})
export class ReportMensualComponent implements OnInit {

  visibleAddList='block';
  visibleEditList='none';

  addToJson: report = { ...EMPTY_MODEL_Json };
  jsonToDelete: identifiant = { ...EMPTY_MODEL_ToDelete };
  jsonToEdit: newJson = { ...EMPTY_MODEL_ToEdit };
  addToMongo:jsonToMongo={...EMPTY_MODEL_ToMongo}

  constructor(
    private ServiceSaveJson: MensualReportJsonService,
    private ServiceDelete: DeleteReportService,
    private ServiceEdit: EditJsonService,
    private ServiceMongo:SaveMongoService,
    private route:ActivatedRoute
  ) {
    const storageRegion = localStorage.getItem("Region");
    this.addToJson.nameReport = "Rapport d'activité mensuel";
    this.addToJson.region=storageRegion
  }
  TableauReport = [];
  Tmp = [];
  id = ""
  nameReport = "Rapport d'activité mensuel";


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
  }

selectedRegion:string='';
selectedcirfin:string='';
selectedMonth:string='';


changeValue(event:any){
    this.selectedRegion=event.target.value;
    this.addToJson.region=this.selectedRegion;
    console.log(this.selectedRegion)
}

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


AddJson(addToJson:report,reportForm:NgForm) {
  this.ServiceSaveJson.saveToJson(addToJson).subscribe({
    next: (res: any) => {
      reportForm.reset();
      if (res) console.log(res);
    },
    error: (err: any)=>{
      console.log(err);
    }
   })
}
  modification(id, Form: NgForm) {
     this.visibleAddList="none";
     this.visibleEditList="block";
    Form.controls['faits'].setValue(this.TableauReport[id-1].faits);
    Form.controls['observations'].setValue(this.TableauReport[id-1].observations);

  }
  deleteJson(id) {
    this.Tmp.splice(id - 1, 1);
    this.jsonToDelete.id = id;
    this.ServiceDelete.deleteJson(this.jsonToDelete).subscribe({
      next: (res: any) => {
        if (res) console.log(res);
      },
      error: (err: any) => {
        console.log(err)
      }
  })

  }

  ValidateModification(form: NgForm) {
    this.visibleAddList="block";
     this.visibleEditList="none";
    this.route.paramMap.subscribe(params   => {
    this.id = params.get('id');

    });

  this.jsonToEdit.id=this.id;
  this.jsonToEdit.faits=form.value.faits;
  this.jsonToEdit.observations = form.value.observations;

    form.reset();

    this.ServiceEdit.editJson(this.jsonToEdit).subscribe({
      next: (res: any) => {
        if (res) console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      }
    })

  }
  sendToMongo(id) {
    this.addToMongo.nom_rapport = this.TableauReport[id-1].name_Report;
    this.addToMongo.numero = this.TableauReport[id-1].numero;
    this.addToMongo.mois = this.TableauReport[id-1].mois;
    this.addToMongo.cirfinValue = this.TableauReport[id-1].cirfin;
    this.addToMongo.region=this.TableauReport[id-1].region
    this.addToMongo.faits = this.TableauReport[id-1].faits;
    this.addToMongo.observations=this.TableauReport[id-1].observations

    console.log(this.addToMongo);

    this.ServiceMongo.sendData(this.addToMongo).subscribe({
      next: (res: any) => {
          console.log(res)
      },
      error: (err: any) => {
        console.log(err);
      }
    })

  }

}
