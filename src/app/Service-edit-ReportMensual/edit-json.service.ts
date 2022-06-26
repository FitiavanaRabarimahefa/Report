import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const apiUrl = "http://localhost:8080/api/editMensualReport"

interface newJson{
  id: String;
   faits:String,
   observations:String,
}

@Injectable({
  providedIn: 'root'
})
export class EditJsonService {

  constructor(private http: HttpClient) { }
  editJson(jsonEdit: newJson): Observable<any>{
    return this.http.post(`${apiUrl}`,jsonEdit)
  }
}
