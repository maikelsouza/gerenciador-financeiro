import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToggleSidnavVisibilityComponent } from './toggle-sidnav-visibility/toggle-sidnav-visibility.component';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, ToggleSidnavVisibilityComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header {

   

}
