import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RecordService {
  private API_SERVER = 'http://localhost:8080'; 
  private readonly TOKEN_KEY = 'token';


  constructor(private http: HttpClient) { }

  getMovementHistory(accountNumber: string): Observable<any> {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (!token) {
      return new Observable(observer => {
        observer.error('No token found');
        observer.complete();
      });
    }

    const headers = new HttpHeaders({
      'Authorization': `JWT ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.http.get<any>(`${this.API_SERVER}/get_movement_record/?account_number=${accountNumber}`, { headers });
  }
}
