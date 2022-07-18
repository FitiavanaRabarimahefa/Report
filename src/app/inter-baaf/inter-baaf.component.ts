import { Component, OnInit } from '@angular/core';
import socketIo from 'socket.io-client';

@Component({
  selector: 'app-inter-baaf',
  templateUrl: './inter-baaf.component.html',
  styleUrls: ['./inter-baaf.component.css']
})
export class InterBaafComponent implements OnInit {

  constructor() { }

 TableauReport:any=[];
  Tmp: any = [];

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

}
