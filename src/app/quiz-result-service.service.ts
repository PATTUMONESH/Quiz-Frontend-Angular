import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizResultServiceService {

  private quizResults:any[]=[];

  constructor() { }


  setQuizResults(results:any[]):void{
    this.quizResults=results;
  }

  getQuizResults():any[]{
    return this.quizResults;

  }
}
