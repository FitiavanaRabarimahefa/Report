import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const apiUrl = "http://localhost:8080/api/mensualReport";

interface reportBaaf{
    produit:String,
    realisation:String,
    valeurCible:String,
    pourcentageRealisation:String,
}


@Injectable({
  providedIn: 'root'
})
export class ServiceBAAFService {

  constructor( private http:HttpClient ) { }
  addReport(newReport:reportBaaf):Observable<any>{
       return this.http.post(`${apiUrl}`,newReport);
  }

}