import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const apiUrl="http://localhost:8080/api/getFormation"

@Injectable({
  providedIn: 'root'
})
export class GetFormationService {

  constructor(private http: HttpClient) { }
  getFormation(): Observable<any>{
    return this.http.get(`${apiUrl}`)
  }
}
