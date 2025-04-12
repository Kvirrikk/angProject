import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getApi(url : string) : Observable<any>{
    return  this.http.get<any>(url)
}

  getCategory(url : string) : Observable<any[]>{
    return  this.http.get<any[]>(url)
}

getProdCategory(url : string): Observable<any> {
  return this.http.get<any>(url);
}

getFiltered(params: any): Observable<any> {
  let httpParams = new HttpParams({ fromObject: params });
  return this.http.get<any>(`https://restaurant.stepprojects.ge/api/Products/GetFiltered$`, { params: httpParams });
}



}
