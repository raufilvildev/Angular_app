import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-li-nav',
  imports: [RouterLink],
  templateUrl: './header-li-nav.component.html',
  styleUrl: './header-li-nav.component.css',
})
export class HeaderLiNavComponent {
  @Input() text = '';
  @Input() to: String[] = [];
}
