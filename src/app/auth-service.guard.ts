import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { NavigateService } from './navigate.service';

export const authServiceGuard: CanActivateFn = (route, state) => {
  const navigateService = inject(NavigateService);
  const router = inject(Router);

  // Check if the user is logged in
  if (navigateService.isLoggedIn()) {
    const userRole=localStorage.getItem('userRoleFromBackend');
    const isAdminRoute=state.url.includes('/adminWelcome');
    if(isAdminRoute && userRole !=='2'){
      router.navigate(['/welcome']);
      return false;
    }
    return true; // Allow navigation
  }

  // If not logged in, redirect to the login page
  router.navigate(['/login']);
  return false; // Prevent navigation
};
