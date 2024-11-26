import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  showNavbar: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Adjust the routes where you want the navbar to be visible
        const adminRoutes = ['/adminWelcome', '/questionType', '/addSubject', '/addQuestions', '/viewScores','/viewQuestions'];
        this.showNavbar = adminRoutes.includes(event.urlAfterRedirects);
      }
    });
  }
}
