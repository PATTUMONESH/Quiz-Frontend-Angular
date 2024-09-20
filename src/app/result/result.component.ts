import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizResultServiceService } from '../quiz-result-service.service';
import { QuestionService } from '../service/question.service';
import { SharedQuizService } from '../shared-quiz.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent implements OnInit {
  public quizResults:any;
  public questionList: any = [];
  questionListLength:any;


  
  unAttemptedQuestion: number = 0;
  AttemptedQuestions:number=0;

  constructor(private route:Router,private quizResultsService:QuizResultServiceService,private questionService:QuestionService,private questionLengtSignal:SharedQuizService){}

  ngOnInit(): void {

this.questionListLength=this.questionLengtSignal.getQuestionListLength();


   this.quizResults=this.quizResultsService.getQuizResults();
   console.log(this.quizResults);
   
  }
  canExit(): boolean {
    // Prevent exit by default
    const userConfirmed = confirm('Are you sure you want to exit the result page?');
    return userConfirmed; // Only allow exit if the user confirms
  }

 
 onLogout() {
 localStorage.clear();
  this.route.navigate(['/login']);
}

}
