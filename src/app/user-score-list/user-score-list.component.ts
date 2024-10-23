import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-user-score-list',
  templateUrl: './user-score-list.component.html',
  styleUrl: './user-score-list.component.css'
})
export class UserScoreListComponent implements OnInit{
search(arg0: any) {
throw new Error('Method not implemented.');
}



  userScores:any=[];


constructor(private route:Router,private questionService:QuestionService){}



  ngOnInit(): void {
    this.loadUserScores();

  }

  deleteScore(id:any):void{
    this.questionService.deleteScore(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.loadUserScores();
        
      },error:(err)=>{
        console.error(err);
        
      }
    })

  }


  loadUserScores(){
    this.questionService.getUserScores().subscribe((data:any[])=>{
      this.userScores=data;
      console.log(this.userScores);
      
    })
  }


}
