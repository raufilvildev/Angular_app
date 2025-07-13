import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { AuthenticationService } from '../services/authentication.service';

const authenticationGuard = (
  routeType: 'public' | 'private'
): CanActivateFn => {
  return async (route, state) => {
    const router = inject(Router);
    const usersService = inject(UsersService);
    const authenticationService = inject(AuthenticationService);

    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      return await handleAccessWithRefreshToken(
        router,
        routeType,
        authenticationService
      );
    }

    try {
      const userResponseDto = await usersService.get();

      if (routeType === 'public') {
        await router.navigate(['dashboard']);
        return false;
      }

      return true;
    } catch (error: any) {
      if (error.status === 401 && error.type === 'expired') {
        return await handleAccessWithRefreshToken(
          router,
          routeType,
          authenticationService
        );
      }

      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');
      if (routeType === 'private') {
        await router.navigate(['/home']);
        return false;
      }

      return true;
    }
  };
};

const handleAccessWithRefreshToken = async (
  router: Router,
  routeType: 'public' | 'private',
  authenticationService: AuthenticationService
) => {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    if (routeType === 'public') return true;

    await router.navigate(['home']);
    return false;
  }

  try {
    const { accessToken } = await authenticationService.refreshAccessToken(
      refreshToken
    );

    localStorage.setItem('accessToken', accessToken);
    if (routeType === 'public') {
      await router.navigate(['/dashboard']);
      return false;
    }
    return true;
  } catch (error) {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    if (routeType === 'private') {
      await router.navigate(['/home']);
      return false;
    }
    return true;
  }
};

export const authenticationGuardPublic: CanActivateFn =
  authenticationGuard('public');
export const authenticationGuardPrivate: CanActivateFn =
  authenticationGuard('private');
