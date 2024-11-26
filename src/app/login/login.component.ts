import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { QuestionService } from './../service/question.service';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {}

  constructor(private route: Router,private formBuilder: FormBuilder,private questionService: QuestionService,private snackBar: MatSnackBar) { }

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
          console.log(val);
          
          if (val && val.id) {
            localStorage.setItem("userIdFromBackEnd", val.id);
            localStorage.setItem("userfNameFromBackend", val.firstName);
            localStorage.setItem("userlNameFromBackend", val.lastName);
            localStorage.setItem("userRoleFromBackend", val.role.id);

            const roleId = val.role.id;
            if (roleId === 1) {
              this.route.navigate(['/welcome']);
            } else if (roleId === 2) {
              this.route.navigate(['/adminWelcome']);
              
            }
          }
        },
        (error) => {
          console.error('Error:', error);
          if (error.status === 400) {
            this.showErrorMessage(error.error.message); // Show error in snackbar
          }
        }
      );
    }
  }

  // Method to show the error message in a snackbar
  showErrorMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000, // Duration in milliseconds
      horizontalPosition: 'center', // Horizontal position (start, center, end)
      verticalPosition: 'top', // Vertical position (top, bottom)
      panelClass: ['snackbar-error'] // Custom class for styling
    });
  }

  
}
