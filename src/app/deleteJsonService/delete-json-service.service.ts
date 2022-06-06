import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const apiUrl="http://localhost:8080/api/deleteJson";

interface identification{
  id:String,
}

@Injectable({
  providedIn: 'root'
})
export class DeleteJsonServiceService {

  constructor(private http:HttpClient) { }
  deleteJson(identifiant:identification):Observable<any>{
    return this.http.post(`${apiUrl}`,identifiant);
  }
}
