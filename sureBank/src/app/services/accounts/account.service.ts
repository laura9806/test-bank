import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private API_SERVER = 'http://localhost:8080'; 
  private readonly TOKEN_KEY = 'token';


  constructor(private http: HttpClient) { }

  createAccount(accountData: any): Observable<any> {
    const csrfToken = this.getCookie('csrftoken');
    const token = localStorage.getItem(this.TOKEN_KEY);

    if (!token) {
      return new Observable(observer => {
        observer.error('No token found');
        observer.complete();
      });
    }
    const headers = new HttpHeaders({
      'Authorization': `JWT ${token}`,
      'X-CSRFToken': csrfToken,
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = this.serializeData(accountData);
    
    return this.http.post<any>(`${this.API_SERVER}/create_account/`, body, { headers });
  }
  
  private getCookie(name: string): string {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() || '' : '';
  }
  
  
  serializeData(data: any): string {
    let params = new HttpParams();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        params = params.set(key, data[key]);
      }
    }
    return params.toString();
  }
  


  deposit(accountNumber: number, amount: number, password: number): Observable<any> {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const csrfToken = this.getCookie('csrftoken');

    if (!token) {
      return new Observable(observer => {
        observer.error('No token found');
        observer.complete();
      });
    }
    const headers = new HttpHeaders({
      'Authorization': `JWT ${token}`,
      'X-CSRFToken': csrfToken,
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    body.set('account_number', accountNumber.toString());
    body.set('amount', amount.toString());
    body.set('password', password.toString());
    const serializedData = body.toString();

    return this.http.post<any>(`${this.API_SERVER}/consign/`, serializedData, { headers });
  }

  withdraw(accountNumber: number, amount: number, password: number): Observable<any> {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const csrfToken = this.getCookie('csrftoken');
    if (!token) {
      return new Observable(observer => {
        observer.error('No token found');
        observer.complete();
      });
    }

    const headers = new HttpHeaders({
      'Authorization': `JWT ${token}`,
      'X-CSRFToken': csrfToken,
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    body.set('account_number', accountNumber.toString());
    body.set('amount', amount.toString());
    body.set('password', password.toString());
    const serializedData = body.toString();

    return this.http.post<any>(`${this.API_SERVER}/withdraw/`, serializedData, { headers });
  }

  checkBalance(accountNumber: string): Observable<any> {
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
    return this.http.get<any>(`${this.API_SERVER}/check_balance/?account_number=${accountNumber}`, { headers });
  }

  
}
