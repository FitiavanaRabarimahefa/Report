import { Component, OnInit } from '@angular/core';
import socketIo from 'socket.io-client';

@Component({
  selector: 'app-inter-crgp',
  templateUrl: './inter-crgp.component.html',
  styleUrls: ['./inter-crgp.component.css']
})
export class InterCrgpComponent implements OnInit {

  TableauReport:any=[];
  Tmp:any=[];

  constructor() { }

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

}
