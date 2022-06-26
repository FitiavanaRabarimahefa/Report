import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const apiUrl = "http://localhost:8080/api/saveMongoReportActivity";

interface jsonToMongo{
  nom_rapport: String,
  mois:String,
  numero:String,
  cirfinValue: String;
  region: String,
  faits: String,
  observations:String,
}

@Injectable({
  providedIn: 'root'
})
export class SaveMongoService {

  constructor(private http: HttpClient) { }
  sendData(data:jsonToMongo):Observable<any>{
    return this.http.post(`${apiUrl}`, data);
  }
}
