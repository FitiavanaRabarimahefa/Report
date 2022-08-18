import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../registerservice/register.service';
import {NgToastService} from 'ng-angular-popup'
import { NgForm } from '@angular/forms';

interface UserRegister{
  IM:Number,
  Mail:String,
  Region:String,
  Password:String
}

const EMPTY_Model:UserRegister={
  IM:0,
  Mail:'',
  Region:'',
  Password:'',
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  newUser:UserRegister={...EMPTY_Model};


 success=''

  constructor(
    private ServiceRegister:RegisterService,
    private toast:NgToastService
  ) { }

  ngOnInit(): void {
  }

  regionValue(event) {
    this.newUser.Region = event.target.value;
  }

  validation(newUser: UserRegister, register: NgForm): void {
    console.log(newUser);
    this.ServiceRegister.registration(newUser).subscribe({
       next:(res:any) =>{
          if(res.success){
            this.toast.success({ detail: "Authentification succes", summary: res.success, duration: 2000 });
            register.reset();

          }else if(res.error){
            this.toast.error({detail:"Authentification succes",summary:res.error,duration:2000});

          }

      },
      error:(err:any) =>{
              console.log('Erreur enregistrement',err);
      }
    })

  }
}
