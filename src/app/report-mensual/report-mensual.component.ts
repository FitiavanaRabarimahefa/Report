import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MensualReportJsonService } from '../mensual-report-servive-json/mensual-report-json.service';
import socketIo from 'socket.io-client'
import { DeleteReportService } from '../delelete-report-mensual-service/delete-report.service';

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
const EMPTY_MODEL_ToDelete: identifiant = {
    id:""
}

@Component({
  selector: 'app-report-mensual',
  templateUrl: './report-mensual.component.html',
  styleUrls: ['./report-mensual.component.css']
})
export class ReportMensualComponent implements OnInit {


  addToJson: report = { ...EMPTY_MODEL_Json };
  jsonToDelete: identifiant = { ...EMPTY_MODEL_ToDelete };

  constructor(
    private ServiceSaveJson: MensualReportJsonService,
    private ServiceDelete:DeleteReportService,
  ) { }
  TableauReport = [];
  Tmp = [];

  ngOnInit(): void {
    const storage=localStorage.getItem("Region");
    console.log(storage);

   const socket=socketIo('http://localhost:8080');
   socket.on('data2',(data)=>{
    console.log(JSON.parse(data));
    this.TableauReport=JSON.parse(data);
    console.log(this.TableauReport.length);
    function myFunction(value) {
      return value=!!value;
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
  modification() {

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
  sendToMongo() {

  }

}
