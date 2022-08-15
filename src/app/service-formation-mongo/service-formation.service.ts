import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const apiUrl = "http://localhost:8080/api/saveMongoFormation";

interface dataMongo{

        nom_rapport:String,
        numero:String,
        mois:String,
        cirfinValue:String,
        region: String,
        debut: String,
        fin:String
        lieu:String,
        theme:String,
        sousTheme:String,
        objectif:String,
        formateur:Array<String>,
        participant:Array<String>,
        observation:String,
}


@Injectable({
  providedIn: 'root'
})
export class ServiceFormationService {

  constructor(private http: HttpClient) { }
  saveMongo(data: dataMongo): Observable<any>{
    return this.http.post(`${apiUrl}`,data)
  }
}
