import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const apiUrl='http://localhost:8080/api/getAllRegister'

@Injectable({
  providedIn: 'root'
})
export class GetAllUserService {

  constructor(private http: HttpClient) { }
  getAllUser(): Observable<any>{
    return this.http.get(`${apiUrl}`)
  }

}
