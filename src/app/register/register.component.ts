import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { QuestionService } from '../service/question.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private route: Router, private formBuilder: FormBuilder, private questionService: QuestionService,private snackBar:MatSnackBar) { }

  roles=[];
  profileForm = this.formBuilder.group({
    firstName: ['',[Validators.required,Validators.minLength(2)]],
    lastName: ['',[Validators.required,Validators.minLength(2)]],
    gender: ['',[Validators.required]],
    email: ['',[Validators.required,Validators.email]],
    password: ['',[Validators.required,Validators.minLength(4)]],
    phno: ['',[Validators.required,Validators.pattern('^[0-9]{10}$')]],
    address: ['',Validators.required],
    roleId:['',Validators.required]
  })

  onSubmit() {

if(this.profileForm.invalid){
  this.snackBar.open('please fill all required details correctly','Close',{duration:3000,horizontalPosition: 'center',verticalPosition: 'top',});
  return;

}



    const userDetails = {
      "firstName": this.profileForm.value.firstName,
      "lastName": this.profileForm.value.lastName,
      "gender": this.profileForm.value.gender,
      "email": this.profileForm.value.email,
      "password": this.profileForm.value.password,
      "phno": this.profileForm.value.phno,
      "address": this.profileForm.value.address,
      "roleId":this.profileForm.value.roleId
    };
    this.questionService.createUser(userDetails)
      .subscribe((val: any) => {

        console.log(val)
        if (val.status == 201) {
        this.route.navigate(['/login'])
          console.log(this.profileForm.value);
        }
      },
        error => {
          if(error.status==409){

            this.snackBar.open(`user with ${userDetails.email} alraedy exists`,'Close',{duration:3000})
          }else{
            console.error('Error:', error);
          }
          
        })
  }
}
