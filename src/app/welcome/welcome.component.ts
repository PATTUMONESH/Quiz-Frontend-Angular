import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit {



  constructor(private route: Router) { }

  // @ViewChild('name') nameKey!:ElementRef;
  ngOnInit(): void {
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
