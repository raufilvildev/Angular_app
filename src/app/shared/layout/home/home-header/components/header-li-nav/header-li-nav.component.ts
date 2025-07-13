import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-li-nav',
  imports: [],
  templateUrl: './header-li-nav.component.html',
  styleUrl: './header-li-nav.component.css',
})
export class HeaderLiNavComponent {
  @Input() text = '';
}
