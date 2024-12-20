import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit {

  // @ViewChild('name') nameKey!:ElementRef;


  constructor(private route: Router) { }

  ngOnInit(): void {
    //prevent back navigation
    history.pushState(null,'',location.href);
    window.onpopstate =()=>{
      history.pushState(null,'',location.href);
      alert('Back navigation is disabled');
    }

    
  }






  addQuestion() {
    this.route.navigate(['/addQuestions'], { state: { action: "create" } })
  }
  startQuiz(){
    this.route.navigate(['/question'])
  }


  logout(): void {
    localStorage.removeItem('authToken');
    this.route.navigate(['/login']);
  }
  
}
