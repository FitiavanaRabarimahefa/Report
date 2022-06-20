import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const apiUrl="http://localhost:8080/api/getAllData"

@Injectable({
  providedIn: 'root'
})
export class GetReportMongoService {

  constructor(private http: HttpClient) { }
  getData(): Observable<any>{
    return this.http.get(`${apiUrl}`);
  }
}
