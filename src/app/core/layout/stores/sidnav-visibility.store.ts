import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidnavVisibilityStore {

  private state = signal(false);

  isVisible = computed(() => this.state());

  toggle() {
    this.state.update(state => !state);
  }

  

  
}
