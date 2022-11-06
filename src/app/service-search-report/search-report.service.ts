import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



const apiUrl = "http://localhost:8080/api/getSearch";

interface search{
  region: String,
  mois: string,
  indice: number,
  reportName:String,
}

@Injectable({
  providedIn: 'root'
})
export class SearchReportService {

  constructor(private http:HttpClient) { }
  result(data: search): Observable<any>{
    return this.http.post(`${apiUrl}`,data)
  }
}
