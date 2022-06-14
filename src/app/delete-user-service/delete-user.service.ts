import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const apiUrl ="http://localhost:8080/api/deleteUser"
interface identifiant{
  id:Number
}

@Injectable({
  providedIn: 'root'
})
export class DeleteUserService {

  constructor(private http: HttpClient) { }
  delete_user(user:identifiant): Observable<any>{
    return this.http.post(`${apiUrl}`, user);
  }
}
