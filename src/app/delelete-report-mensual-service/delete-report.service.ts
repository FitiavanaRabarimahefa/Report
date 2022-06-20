import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const apiUrl = "http://localhost:8080/api/deleteData"

interface identifiant{
  id:String
}

@Injectable({
  providedIn: 'root'
})
export class DeleteReportService {

  constructor(private http: HttpClient) { }
  deleteJson(id: identifiant): Observable<any>{
    return this.http.post(`${apiUrl}`, id);
  }
}
