import { AuthService } from './../authservice/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgToastService} from 'ng-angular-popup';

interface VerificationUser {
  IM: Number;
  password: String;
}

const EMPTY_MODEL: VerificationUser = {
  IM: 0,
  password: '',
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  UserVerification: VerificationUser = { ...EMPTY_MODEL };

  constructor(private ServiceLogin: AuthService, private route: Router,private toast:NgToastService) {}

  ngOnInit(): void {}

  succes = {};
  authmessage = false;
  delay =3;

  Auth(UserVerification: VerificationUser) {
    this.ServiceLogin.login(UserVerification).subscribe({
      next: (res: any) => {
        console.log(res);
         if(res.validation==false){
           this.toast.warning({detail:"Erreur d'authentification ",summary:"Votre compte n'a pas été encore valider",duration:2000})
         } else if (res.validation == true) {
           if (res.superAdmin == true) {
               localStorage.setItem("token", res.token);
               localStorage.setItem("Region", res.Region);
             this.toast.success({ detail: "Authentification succes", summary: res.success, duration: 2000 });
             setInterval(() => {
               this.delay -= 1;
               const lien = ['admin-user'];
               if (this.delay == 0) {
                 this.route.navigate(lien);
                 clearInterval();
               }
             }, 800);

           }else if (res.adminStatus == true) {
             localStorage.setItem("token", res.token);
             localStorage.setItem("Region", res.Region);
             this.toast.success({ detail: "Authentification succes", summary: res.success, duration: 2000 });
             setInterval(() => {
               this.delay -= 1;
               const lien = ['inter-local'];
               if (this.delay == 0) {
                 this.route.navigate(lien);
                 clearInterval();
               }
             }, 800);

           } else {
             localStorage.setItem("token", res.token);
             localStorage.setItem("Region", res.Region);
             this.toast.success({ detail: "Authentification succes", summary: res.success, duration: 2000 });
             setInterval(() => {
               this.delay -= 1;
               const lien = ['acceuil'];
               if (this.delay == 0) {
                 this.route.navigate(lien);
                 clearInterval();
               }
             }, 800);
           }
        }else{
          this.toast.error({detail:"Erreur d'authentification ",summary:res.error,duration:2000})
        }
      },
      error: (err) => {
        console.error('Login error', err.error.error);
        this.toast.error({detail:"Erreur d'authentification ",summary:err.error,duration:2000})

      },
    });
  }

}
