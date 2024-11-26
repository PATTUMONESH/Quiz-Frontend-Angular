import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  
const router=new Router();

const userId=localStorage.getItem('userIdFromBackEnd');

if(userId){
  return true;
}else{
  router.navigate(['/login']);
  return false;
}



};
