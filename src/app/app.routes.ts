import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LandingPageComponent } from './pages/home/landing-page/landing-page.component';
import { SignupComponent } from './pages/home/signup/signup.component';
import { LoginComponent } from './pages/home/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DashboardHomeComponent } from './pages/dashboard/dashboard-home/dashboard-home.component';
import { DashboardSettingsComponent } from './pages/dashboard/dashboard-settings/dashboard-settings.component';
import { DashboardMailboxComponent } from './pages/dashboard/dashboard-mailbox/dashboard-mailbox.component';
import { ErrorComponent } from './pages/error/error.component';
import {
  authenticationGuardPrivate,
  authenticationGuardPublic,
} from './core/guards/authentication.guard';
import { DashboardCoursesComponent } from './pages/dashboard/dashboard-courses/dashboard-courses.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: '',
    component: HomeComponent,
    canActivate: [authenticationGuardPublic],
    children: [
      { path: 'home', component: LandingPageComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'login', component: LoginComponent },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authenticationGuardPrivate],
    children: [
      { path: '', component: DashboardHomeComponent },
      { path: 'settings', component: DashboardSettingsComponent },
      { path: 'mailbox', component: DashboardMailboxComponent },
      { path: 'courses', component: DashboardCoursesComponent },
    ],
  },
  { path: '**', component: ErrorComponent },
];
