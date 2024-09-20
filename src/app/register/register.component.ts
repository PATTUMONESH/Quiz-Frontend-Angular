import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private route: Router, private formBuilder: FormBuilder, private questionService: QuestionService) { }

  roles=[];
  profileForm = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    gender: [''],
    email: [''],
    password: [''],
    phno: [],
    address: [''],
    roleId:['']
  })

  onSubmit() {
    const userDetails = {
      "firstName": this.profileForm.value.firstName,
      "lastName": this.profileForm.value.lastName,
      "gender": this.profileForm.value.gender,
      "email": this.profileForm.value.email,
      "password": this.profileForm.value.password,
      "phno": this.profileForm.value.phno,
      "address": this.profileForm.value.address,
      "roleId":this.profileForm.value.roleId
    }
    this.questionService.createUser(userDetails)
      .subscribe((val: any) => {

        console.log(val)
        if (val.status == 201) {
        this.route.navigate(['/login'])
          console.log(this.profileForm.value);
        }
      },
        error => {
          console.error('Error:', error);
        })
  }
}
