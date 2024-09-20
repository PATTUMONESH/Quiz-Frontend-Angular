import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedQuizService {
  constructor() { }
private questionListLenghtSignal=signal(0);

setQuestionListLength(length:any){
  this.questionListLenghtSignal.set(length);
}

getQuestionListLength(){
  return this.questionListLenghtSignal;
}



}
