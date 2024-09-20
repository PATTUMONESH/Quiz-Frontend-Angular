import { CanDeactivateFn, Router } from '@angular/router';
import { ResultComponent } from './result/result.component';
import { inject } from '@angular/core';
import { NavigateService } from './navigate.service';


// Define the component interface that requires confirmation to deactivate
export interface CanExit {
  canExit: () => boolean; // Method to check if the component allows navigation away
}

export const exitGuard: CanDeactivateFn<CanExit> = (component) => { 
   // Inject NavigationService
  const navigationService =inject(NavigateService);

  // Check if the component implements the `canExit` method and call it
  if (component.canExit && !component.canExit()) {
    // If canExit returns false, use NavigationService to redirect
    navigationService.redirectToLogin();
    return false; // Prevent navigation
  }

  return true; // Allow navigation if canExit returns true or is not implemented
};
