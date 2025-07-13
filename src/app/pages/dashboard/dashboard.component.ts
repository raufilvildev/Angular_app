import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardSidebarComponent } from '../../shared/layout/dashboard/dashboard-sidebar/dashboard-sidebar.component';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, DashboardSidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
