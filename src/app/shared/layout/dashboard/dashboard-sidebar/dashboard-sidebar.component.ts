import { Component, inject, Input } from '@angular/core';
import { DashboardSidebarLiComponent } from './dashboard-sidebar-li/dashboard-sidebar-li.component';
import { DashboardSidebarProfileComponent } from './dashboard-sidebar-profile/dashboard-sidebar-profile.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-sidebar',
  imports: [
    RouterLink,
    DashboardSidebarLiComponent,
    DashboardSidebarProfileComponent,
  ],
  templateUrl: './dashboard-sidebar.component.html',
  styleUrl: './dashboard-sidebar.component.css',
})
export class DashboardSidebarComponent {
  private router = inject(Router);

  logout() {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    this.router.navigate(['/home']);
  }
}
