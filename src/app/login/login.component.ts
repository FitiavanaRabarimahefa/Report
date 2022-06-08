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
         this.succes=res.success;
         if(this.succes!=""){
           localStorage.setItem("token",res.token);
           localStorage.setItem("Region",res.Region);
           const data=localStorage.getItem("Region");
           //console.log(data);
         }

         /*setInterval(() => {
           this.delay -= 1;
           if(this.delay == 0){
             this.route.navigate(lien);
             clearInterval();
           }

         }, 2000);*/

      },
      error: (err) => {
        console.error('Login error', err.error.error);
      },
    });
  }

}
