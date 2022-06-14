import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const apiUrl = "http://localhost:8080/api/sendEmail";

interface search_mail{
   mail:String
}

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor(private http: HttpClient) { }
  validation(search:search_mail): Observable<any>{
    return this.http.post(`${apiUrl}`,search);
  }       
}
