import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import CrgpModel from '../models/crgpModels';


const apiUrl = "http://localhost:8080/api/CRGPReport";

interface crgpReport{
  name_Report: String,
  numero: String,
  region: String,
  lieu: String,
  mois: String,
  cirfinValue: String,
  participant: Array<String>,
  ordreJour: Array<String>,
  observation: String,
  evaluation:Array<CrgpModel>;
}

@Injectable({
  providedIn: 'root'
})
export class CrgpServiceService {

  constructor(private http: HttpClient) { }
  saveToJson(data:crgpReport): Observable<any>{
    return this.http.post(`${apiUrl}`, data);
  }
}
