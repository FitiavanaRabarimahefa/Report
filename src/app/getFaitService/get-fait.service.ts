import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const apiUrl="http://localhost:8080/api/getFait"

@Injectable({
  providedIn: 'root'
})
export class GetFaitService {

  constructor(private http: HttpClient) { }
  getFaitData(): Observable<any>{
    return this.http.get(`${apiUrl}`)
  }
}
