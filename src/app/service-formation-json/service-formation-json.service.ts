import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const apiUrl = "http://localhost:8080/api/formationJson";

interface formationJson{
  nom_rapport: String,
  numero: String,
  region: String,
  lieu: String,
  mois: String,
  cirfinValue: String,
  debut: String,
  fin: String,
  theme: String,
  sousTheme: String,
  objectif:String,
  formateur:Array<String>,
  participant: Array<String>,
  observation: String,

}

@Injectable({
  providedIn: 'root'
})
export class ServiceFormationJsonService {

  constructor(private http: HttpClient) { }
  saveJson(data: formationJson): Observable<any>{
    return this.http.post(`${apiUrl}`, data);
  }
}
