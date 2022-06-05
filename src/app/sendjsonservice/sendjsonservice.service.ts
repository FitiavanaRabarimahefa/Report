import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const apiUrl="http://localhost:8080/api/editJson";

interface report{
  id:String,
  produit:String,
  realisation:String,
  valeurCible:String,
  pourcentageRealisation:String,
}

@Injectable({
  providedIn: 'root'
})
export class SendjsonserviceService {

  constructor(private http:HttpClient) { }
  editJson(editReport:report):Observable<any>{
   return this.http.post(`${apiUrl}`,editReport);
  }
}
