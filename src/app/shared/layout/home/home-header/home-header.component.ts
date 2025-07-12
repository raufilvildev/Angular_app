import { Component } from '@angular/core';
import { ButtonComponent } from '../../../components/button/button.component';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { HeaderLiNavComponent } from './components/header-li-nav/header-li-nav.component';

@Component({
  selector: 'app-home-header',
  imports: [ButtonComponent, MatIcon, RouterLink, HeaderLiNavComponent],
  templateUrl: './home-header.component.html',
  styleUrl: './home-header.component.css',
})
export class HomeHeaderComponent {
  showNavList: boolean = false;
}
