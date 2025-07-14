import { Component, inject } from '@angular/core';
import { UserResponseDto } from '../../../../../core/interfaces/users/user-response-dto.interface';
import { UsersService } from '../../../../../core/services/users.service';

@Component({
  selector: 'app-dashboard-sidebar-profile',
  imports: [],
  templateUrl: './dashboard-sidebar-profile.component.html',
  styleUrl: './dashboard-sidebar-profile.component.css',
})
export class DashboardSidebarProfileComponent {
  private usersService = inject(UsersService);

  user?: UserResponseDto;

  async ngOnInit() {
    try {
      this.user = await this.usersService.get();
    } catch (error) {
      return;
    }
  }
}
