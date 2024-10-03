import { QuestionService } from './../service/question.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog'; // Import dialog for material modal (if using)

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Ensure proper styleUrls here
})
export class LoginComponent implements OnInit {

  constructor(
    private route: Router, 
    private formBuilder: FormBuilder, 
    private questionService: QuestionService,
    private dialog: MatDialog // For modal dialogs
  ) { }

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  onLogin() {
    if (this.loginForm.valid) {
      const loginPayload = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };

      this.questionService.loginUserData(loginPayload).subscribe(
        (val: any) => {
          if (val && val.id) {
            // Set user details in localStorage
            localStorage.setItem("userIdFromBackEnd", val.id);
            localStorage.setItem("userfNameFromBackend", val.firstName);
            localStorage.setItem("userlNameFromBackend", val.lastName);
            localStorage.setItem("userRoleFromBackend", val.role.id);

            const roleId = val.role.id;

            // Navigate based on role
            if (roleId === 1) {
              this.route.navigate(['/welcome']);
            } else if (roleId === 2) {
              this.route.navigate(['/addQuestions']);
            }
          } else {
            // User not found or not registered
            this.showRegisterPrompt();
          }
        },
        (error) => {
          console.error('Error:', error);
          if (error.status === 404) {
            // Handle user not found (custom logic from backend)
            this.showRegisterPrompt();
          }
        }
      );
    }
  }

  // Function to show register prompt
  showRegisterPrompt() {
    alert('User not registered. Please sign up first.'); // Simple alert or replace with a material dialog/modal
  }

  @ViewChild('name') nameKey!: ElementRef;
  ngOnInit(): void {}

  onStartQuiz() {
    localStorage.setItem("name", this.nameKey.nativeElement.value);
  }
}
