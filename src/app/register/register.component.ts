import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../registerservice/register.service';

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
    private ServiceRegister:RegisterService
  ) { }

  ngOnInit(): void {
  }

 validation(newUser:UserRegister):void{
    console.log(newUser);
    this.ServiceRegister.registration(newUser).subscribe(
      res =>{
          this.success=res;
         console.log('register success',this.success);
      },
      err =>{
              console.log('Erreur enregistrement',err);
      }
    )

  }
}
