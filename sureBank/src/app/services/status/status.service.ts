import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private API_SERVER = 'http://localhost:8080/get_status/'; 

  constructor(private http: HttpClient) { }

  public getStatus(): Observable<any>{
    return this.http.get(this.API_SERVER)
  }
}
