import { Component, computed, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavItemsComponent } from './components/sidenav-items/sidenav-items.component';
import { MobileLayoutService } from '@core/layout/services/mobile-layout.service';
import { SidnavVisibilityStore } from '@core/layout/stores/sidnav-visibility.store';


@Component({
  selector: 'app-sidenav',
  imports: [MatSidenavModule, SidenavItemsComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {

  private readonly mobileLayoutService = inject(MobileLayoutService);

  private readonly sidnavVisibilityStore = inject(SidnavVisibilityStore);

  isMobile = this.mobileLayoutService.isMobile();

  sidenavMode = computed(() => this.isMobile() ? 'over' : 'side');

  isSidevOpened = computed(() => {    
    if (!this.isMobile()) {
      return true
    }
    return this.sidnavVisibilityStore.isVisible();
  });

}
