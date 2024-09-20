import { QuestionService } from './../service/question.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',

})
export class LoginComponent implements OnInit {

  constructor(private route: Router, private formBuilder: FormBuilder, private questionService: QuestionService) { }

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  onLogin() {

    if(this.loginForm.valid){
      const loginPayload = {
        "email": this.loginForm.value.email,
        "password": this.loginForm.value.password,
      }
this.questionService.loginUserData(loginPayload).subscribe(
  (val: any) => {
      console.log(val);
      localStorage.setItem("userIdFromBackEnd", val.id);
      localStorage.setItem("userfNameFromBackend", val.firstName);
      localStorage.setItem("userlNameFromBackend", val.lastName);

      localStorage.setItem("userRoleFromBackend",val.role.id);

      const roleId=val.role.id;
      console.log(roleId);
      

     if(roleId===1){
      this.route.navigate(['/welcome'])

     }
     else if(roleId===2){
      this.route.navigate(['/addQuestions'])
     }
     // this.route.navigate(['/welcome'])
      // console.log(this.loginForm.value);
    },
      error => {

        console.error('Error:', error);
        console.log(error.status);
      })
  }
  }
  @ViewChild('name') nameKey!: ElementRef;
  ngOnInit(): void { }
  onStartQuiz() {
    localStorage.setItem("name", this.nameKey.nativeElement.value);
  }
}
