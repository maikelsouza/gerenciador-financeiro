import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { UserCredentials } from '../interfaces/user-credentials';
import { AuthTokenResponse } from '../interfaces/auth-token-response';
import { User } from '../interfaces/user';

function generateToken(): string {
  let token = '';
  const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
  for (let index = 0; index < 20; index++) {
    token+= caracteres.charAt(Math.floor(Math.random() * caracteres.length));    
  }
  return token;
}


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  login(payload: UserCredentials): Observable<AuthTokenResponse>{
    if(payload.user === 'admin' && payload.password === "123"){
      return of({token: generateToken() });
    }

    return throwError(
      () =>
        new HttpErrorResponse({
          status: 401,
          statusText: 'Unauthorized',
        }),
    );
  }

  logout() {
    return of({});   
  }

  getCurrentUser(token: string): Observable<User>  {
    return of({ username: 'admin'});
  }

  refreshToken(token: string){
    return of({ token: generateToken() })
  }

      
}
