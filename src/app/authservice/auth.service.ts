import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
Observable

const apiUrl="http://localhost:8080/api/users/login";

interface VerificationUser{
  IM:Number,
  password:String
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
     login(UserVerification:VerificationUser){
       return this.http.post(`${apiUrl}`,UserVerification)
     }
}
