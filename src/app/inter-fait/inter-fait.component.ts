import { Component, OnInit } from '@angular/core';
import socketIo from 'socket.io-client';

@Component({
  selector: 'app-inter-fait',
  templateUrl: './inter-fait.component.html',
  styleUrls: ['./inter-fait.component.css']
})
export class InterFaitComponent implements OnInit {

   TableauReport = [];
  Tmp = [];

  constructor() { }

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

}
