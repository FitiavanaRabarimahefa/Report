import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const apiUrl = "http://localhost:8080/api/sendAdminMail";

interface mailUser{
  mail: String;
}

@Injectable({
  providedIn: 'root'
})
export class SendAdminMailService {

  constructor(private http: HttpClient) { }
  validateAdmin(getmail: mailUser): Observable<any>{
    return this.http.post(`${apiUrl}`, getmail);
  }
}
