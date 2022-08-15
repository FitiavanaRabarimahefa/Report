import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const apiUrl = "http://localhost:8080/api/deleteCRGP";

interface identidication{
  id:String
}

@Injectable({
  providedIn: 'root'
})
export class DeleteCrgpService {

  constructor(private http: HttpClient) { }
  deleteCRGP(identifiant:identidication): Observable<any>{
    return this.http.post(`${apiUrl}`,identifiant);
  }
}
