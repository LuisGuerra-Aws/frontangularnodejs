import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Rol } from '../models/rol.model';


const urlBackend = "http://localhost:4500/api/rol";
const urlBackendAll  = "http://127.0.0.1:8080/api/rol/all";

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private http : HttpClient) { 
   
  }

  getAll(): Observable<any>{
    const all = "all";
    return this.http.get(`${urlBackend}`);
  }

  get(id : string) : Observable<any> {
    return this.http.get(`${urlBackend}/${id}`);
  }

  save(data : Rol): Observable<any> {
    return this.http.post(urlBackend, data);
  }

  updatebyobject(data : Rol): Observable<any> {
    return this.http.put(urlBackend, data);
  }

  updatebyid(id : string, data : Rol): Observable<any> {
    return this.http.put(`${urlBackend}/${id}`, data);
  }

  delete(id : string) : Observable<any> {
    return this.http.delete(`${urlBackend}/${id}`);
  }


}
