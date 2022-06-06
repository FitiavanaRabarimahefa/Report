import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const apiUrl="http://localhost:8080/api/saveReport";

interface Sendreport{
  produit:String,
  realisation:String,
  valeurCible:String,
  pourcentageRealisation:String,
}


@Injectable({
  providedIn: 'root'
})
export class SaveReportService {

  constructor(private http:HttpClient) { }
  sendJson(reportData:Sendreport):Observable<any>{
    return this.http.post(`${apiUrl}`,reportData)
  }
}
