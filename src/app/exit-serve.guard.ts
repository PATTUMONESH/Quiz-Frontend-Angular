import { CanDeactivateFn } from '@angular/router';
import { ResultComponent } from './result/result.component';

export const exitServeGuard: CanDeactivateFn<ResultComponent> = (component, currentRoute, currentState, nextState) => {
  return component.canExit();
};
