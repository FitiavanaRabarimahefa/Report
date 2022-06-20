import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const apiUrl = "http://localhost:8080/api/saveMensualReport";

interface report{
        id:String,
        nameReport:String,
        region:String,
        mois:String,
        numero:Number,
        cirfinValue:String,
        faits:String,
        observations:String
}

@Injectable({
  providedIn: 'root'
})
export class MensualReportJsonService {

  constructor(private http: HttpClient) { }
  saveToJson(reportJson:report): Observable<any>{
      return this.http.post(`${apiUrl}`,reportJson)
  }
}
