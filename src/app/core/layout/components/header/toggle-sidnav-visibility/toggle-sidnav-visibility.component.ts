import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MobileLayoutService } from '@core/layout/services/mobile-layout.service';
import { SidenavVisibilityStore } from '@core/layout/stores/sidenav-visibility.store';

@Component({
  selector: 'app-toggle-sidnav-visibility',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './toggle-sidnav-visibility.component.html',
  styleUrl: './toggle-sidnav-visibility.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleSidnavVisibilityComponent {


  private readonly sidenavVisibilityStore = inject(SidenavVisibilityStore);

  private readonly mobileLayoutService = inject(MobileLayoutService);

  toggleSidenavVisibility() {
    this.sidenavVisibilityStore.toggle(); 
  }

  isMobile = this.mobileLayoutService.isMobile();   

}
