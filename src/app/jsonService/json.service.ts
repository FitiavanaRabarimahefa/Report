import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

 
const apiUrl = "http://localhost:8080/api/getJson";

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  constructor(private http:HttpClient) {}
     getData():Observable<any>{
       return this.http.get(`${apiUrl}`);
     }
   }

   

