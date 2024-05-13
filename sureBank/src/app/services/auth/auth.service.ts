import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_SERVER = 'http://localhost:8080';
  private isLoggedIn: boolean = false;

  private readonly TOKEN_KEY = 'token';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http.post<any>(this.API_SERVER + '/api/login/', { username, password })
      .pipe(
        tap(response => {
          localStorage.setItem(this.TOKEN_KEY, response.token);
          this.isLoggedIn = true;
        })
      );
  }

  logout(): void {
    this.isLoggedIn = false;
    this.router.navigate(['/login']); // Redirige al login después de cerrar sesión
  }

  isAuthenticated(): boolean {
    // Verifica si el usuario está autenticado
    return this.isLoggedIn;
  }

  register(username: string, password: string, email: string, firstName: string, lastName: string) {
    return this.http.post<any>(this.API_SERVER + '/api/register/', { username, password, email, firstName, lastName });
  }

  getUserAccounts(): Observable<any> {
    // Obtener el token JWT del almacenamiento local
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (!token) {
      // Si no hay token, retorna un Observable con un error
      return new Observable(observer => {
        observer.error('No token found');
        observer.complete();
      });
    }
    // Configurar los encabezados de la solicitud con el token JWT
    const headers = new HttpHeaders().set('Authorization', `JWT ${token}`);
    // Realizar la solicitud al backend para obtener las cuentas del usuario
    console.log(headers);
    return this.http.get<any>(`${this.API_SERVER}/user_accounts/`, { headers });
  }

}
