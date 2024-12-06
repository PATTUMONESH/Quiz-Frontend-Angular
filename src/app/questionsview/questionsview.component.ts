import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../service/question.service';
import {MatPaginatorModule} from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-questionsview',
  templateUrl: './questionsview.component.html',
  styleUrl: './questionsview.component.css',
  
})
export class QuestionsviewComponent implements OnInit {
  
  questions: any = [];
  totalQuestions: number = 0; // Total number of questions from backend
  pageSize: number = 10; // Number of questions per page
  pageIndex: number = 0; // Current page index


constructor(private route: Router, private questionService: QuestionService) {}

 baseURL = "http://localhost:8080/getImage?imageName="


adminLogout(){
  this.route.navigate(['/login']);
}

  // loadQuestions(){
  //   this.questionService.getTotalQuestions().subscribe((data: any[]) => {
  //     this.questions = data;
  //     console.log(this.questions);
      
  //   })
  // }

  

  // isImage(value: string):boolean{
  //   if(value?.match(/\.(jpg|jpeg|png|gif)$/i)){
  //     return true;
  //   }
  //   else{
  //     return false;
  //   }
  // }

  loadQuestions(page: number, size: number) {
    this.questionService.getTotalQuestions(page, size).subscribe((response: any) => {
      this.questions = response.content; // Content of the current page
      this.totalQuestions = response.totalElements; // Total number of questions
      console.log(this.questions);
    });
  }
 


  ngOnInit(): void {
    this.loadQuestions(this.pageIndex, this.pageSize);
  }

  handlePageEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadQuestions(this.pageIndex, this.pageSize); // Load questions for the new page
  }


  deleteQuestion(id: number): void {

    this.questionService.deleteQuestion(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.loadQuestions(this.pageIndex, this.pageSize);
      },
      error:(err)=>{
        console.error(err);
      }
    })

  }
  


  update(question: any): void {
  console.log(question);
  this.route.navigate(['/addQuestions'], { state: { action: "update", ques: question } })
  }

}





// this.questionService.getSubjectsList().subscribe((data:any[]) => {
//   this.subjects = data;
// });
