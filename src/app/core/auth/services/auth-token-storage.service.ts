import { inject, Injectable } from '@angular/core';
import { localStorageToken } from '../tokens/local-storage';

@Injectable({
  providedIn: 'root',
})
export class AuthTokenStorageService {


  localStorageToken = inject(localStorageToken);

  private readonly key: string = 'auth-token';

  set(token: string): void {
    this.localStorageToken.setItem(this.key, token);
  }  

  has(): boolean{
    return Boolean(this.get());
  }

  get(): string | null{
    return this.localStorageToken.getItem(this.key);
  }

  remove(): void{
    this.localStorageToken.removeItem(this.key);
  }


  
}
