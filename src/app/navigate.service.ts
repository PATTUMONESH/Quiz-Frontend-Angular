import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigateService {

  constructor(private router: Router) {}
        redirectToLogin() {
        this.router.navigate(['/login']);
  }

isLoggedIn():boolean{
  return !!localStorage.getItem('userIdFromBackEnd')
}

logout():void{
  localStorage.removeItem('userIdFromBackEnd')
}

}
