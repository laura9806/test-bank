import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypesAccountService {
  private API_SERVER = 'http://localhost:8080/get_types/'; 

  constructor(private http: HttpClient) { }

  public getTypes(): Observable<any>{
    return this.http.get(this.API_SERVER)
  }
}
