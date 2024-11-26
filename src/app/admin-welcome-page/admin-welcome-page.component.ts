import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../service/question.service';
import { of } from 'rxjs';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-admin-welcome-page',
  templateUrl: './admin-welcome-page.component.html',
  styleUrl: './admin-welcome-page.component.css'
})
export class AdminWelcomePageComponent implements OnInit{

adminData:any;
adminId:any | null;

constructor(private route:Router,private questionService:QuestionService){}

ngOnInit(): void {
  // Retrieve userId from local storage
  this.adminId = localStorage.getItem('userIdFromBackEnd');

  // Check if adminId exists and fetch admin details using switchMap
  of(this.adminId).pipe(
    switchMap(id => {
      if (id) {
        return this.questionService.getAdminById(id);
      } else {
        // Handle case if id is not found in local storage
        console.warn('Admin ID not found in local storage.');
        return of(null);
      }
    })
  ).subscribe(
    (data) => {
      if (data) {
        this.adminData = data;
        console.log('Admin Data:', this.adminData);
      }
    },
    (error) => {
      console.error('Error fetching admin data:', error);
    }
  );
}



viewScores() {
this.route.navigate(["/viewScores"]);
}
toAddQuestion() {
  this.route.navigate(["/addQuestions"])
  }

  toAddQuestionType(){
    this.route.navigate(["/questionType"])
  }

  toAddSubject() {
    this.route.navigate(['/addSubject'])
    }


}
