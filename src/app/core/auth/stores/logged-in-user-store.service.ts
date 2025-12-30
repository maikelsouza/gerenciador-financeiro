import { computed, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class LoggedInUserStoreService {

  private readonly stage = signal<User | null>(null);

  currentUser = computed(() => this.stage());

  isLoggedIn = computed(() => this.stage() !== null);

  setUser(user: User) {
    this.stage.set(user);
  } 

  logout(): void {
    this.stage.set(null);
  }

  
}
