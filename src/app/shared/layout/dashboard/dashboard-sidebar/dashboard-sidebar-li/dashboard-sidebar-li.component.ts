import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-dashboard-sidebar-li',
  imports: [MatIcon],
  templateUrl: './dashboard-sidebar-li.component.html',
  styleUrl: './dashboard-sidebar-li.component.css',
})
export class DashboardSidebarLiComponent {
  @Input() text = '';
  @Input() icon = '';
}
