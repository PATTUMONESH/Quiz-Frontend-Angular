import { Component } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-subject-add',
  templateUrl: './subject-add.component.html',
  styleUrl: './subject-add.component.css'
})
export class SubjectAddComponent {


constructor(private questionService:QuestionService,private route:Router,private formBuilder:FormBuilder){
    
  }


  subjectForm=this.formBuilder.group({
    subject:['']
  });


  addSubject() {
    const subjectFormData={
      "subject":this.subjectForm.value.subject
    };

    this.questionService.addSubject(subjectFormData).subscribe((val:any)=>{
      this.subjectForm.reset();
      console.log(val);
      
    })
    
    }



}
