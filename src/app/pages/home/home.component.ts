import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeHeaderComponent } from '../../shared/layout/home/home-header/home-header.component';
import { HomeFooterComponent } from '../../shared/layout/home/home-footer/home-footer.component';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, HomeHeaderComponent, HomeFooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
