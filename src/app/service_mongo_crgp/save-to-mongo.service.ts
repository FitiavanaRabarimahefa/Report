import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import CrgpModel from '../models/crgpModels';

const apiUrl = "http://localhost:8080/api/CRGPMongo";

interface dataMongo{
  nom_rapport: String,
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
export class SaveToMongoService {

  constructor(private http: HttpClient) { }
  Save(data: dataMongo): Observable<any>{
    return this.http.post(`${apiUrl}`, data);
  }
}
