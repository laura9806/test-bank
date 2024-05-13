import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CsrfTokenService {

  constructor(private http: HttpClient) { }

  getCsrfToken(): Observable<string> {
    return this.http.get<{ csrf_token: string }>('http://localhost:8080/csrf_token/')
      .pipe(map(response => response.csrf_token));
  }
}
