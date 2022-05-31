import { AuthService } from './../authservice/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private ServiceLogin: AuthService, private route: Router) {}

  ngOnInit(): void {}

  succes = {};
  authmessage = false;
  delay = 6;

  Auth(UserVerification: VerificationUser) {
    this.ServiceLogin.login(UserVerification).subscribe({
      next: (res: any) => {
        console.log(res.token);
         this.succes=res;
       console.log(this.succes);
       if((this.succes!="Votre champ est vide") && (this.succes!="Ereur authentification Mot de passe invalide" )) {
         const lien=['acceuil']
         this.authmessage=true;

         setInterval(() => {
           this.delay -= 1;
           if(this.delay == 0){
             this.route.navigate(lien);
             clearInterval();
           }

         }, 2000);
     }
      },
      error: (err) => {
        console.error('Login error', err.error.error);
      },
    });
  }
  
}
