import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const apiUrl = "http://localhost:8080/api/users/register";

interface User {
  IM:Number,
  Password:String
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }
  registration(newUser:User):Observable<any>{
         return this.http.post(`${apiUrl}`,newUser);
  }
}
