import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-admin-welcome-page',
  templateUrl: './admin-welcome-page.component.html',
  styleUrl: './admin-welcome-page.component.css'
})
export class AdminWelcomePageComponent implements OnInit{



constructor(private route:Router,private questionService:QuestionService){}

ngOnInit(): void {
  
}
viewScores() {
this.route.navigate(["/viewScores"]);
}
toAddQuestion() {
  this.route.navigate(["/addQuestions"])
  }

}
