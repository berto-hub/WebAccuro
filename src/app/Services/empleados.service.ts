import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Empleado } from '../Interfaces/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  private endpoint:string = environment.endPoint;
  private apiUrl:string = this.endpoint + "/api/Empleado";

  constructor(private http:HttpClient) { }

  getEmployeeList(nombre:string, pagina:number):Observable<Empleado[]>{
    return this.http.get<Empleado[]>(`${this.apiUrl}?nombre=${nombre}&pag=${pagina}&tamanio=10`);
  }

  addEmployee(request:Empleado):Observable<Empleado>{
    return this.http.post<Empleado>(this.apiUrl, request);
  }
}
