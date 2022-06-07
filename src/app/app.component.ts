import { Component, OnInit } from '@angular/core';
//import socketIo from 'socket.io-client';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'project_angular';


ngOnInit(): void {

      //const socket=socketIo('http://localhost:8080');
      //socket.on('hello',(data)=>console.log(data));

}
}
;
