import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const apiUrl = "http://localhost:8080/api/deleteFormation";

interface identification{
  id:String
}

@Injectable({
  providedIn: 'root'
})
export class DeleteFormationService {

  constructor(private http: HttpClient) { }
  formationDelete(identifiant: identification): Observable<any>{
    return this.http.post(`${apiUrl}`,identifiant)
  }
}
