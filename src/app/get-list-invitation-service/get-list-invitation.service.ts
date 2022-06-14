import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const apiUrl="http://localhost:8080/api/getRegister";

@Injectable({
  providedIn: 'root'
})
export class GetListInvitationService {

  constructor(private http:HttpClient) { }
  get_invitation():Observable<any>{
    return this.http.get(`${apiUrl}`);
  }
}
