import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-questionsview',
  templateUrl: './questionsview.component.html',
  styleUrl: './questionsview.component.css'
})
export class QuestionsviewComponent implements OnInit {
  
  questions: any = [];


  constructor(private route: Router, private questionService: QuestionService) {
}

 baseURL = "http://localhost:8080/getImage?imageName="


adminLogout(){
  this.route.navigate(['/login']);
}

  loadQuestions(){
    this.questionService.getTotalQuestions().subscribe((data: any[]) => {
      this.questions = data;
      console.log(this.questions);
      
    })
  }

  

  // isImage(value: string):boolean{
  //   if(value?.match(/\.(jpg|jpeg|png|gif)$/i)){
  //     return true;
  //   }
  //   else{
  //     return false;
  //   }
  // }
 


  ngOnInit(): void {
   this.loadQuestions();
  }

  deleteQuestion(id: number): void {

    this.questionService.deleteQuestion(id).subscribe({
      next:(res)=>{
        console.log(res);
       this.loadQuestions();
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
