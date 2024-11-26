import { Component } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { data } from '../../assets/questions';

@Component({
  selector: 'app-question-type',
  templateUrl: './question-type.component.html',
  styleUrl: './question-type.component.css'
})
export class QuestionTypeComponent {



  constructor(private questionService:QuestionService,private route:Router,private formBuilder:FormBuilder){}

  typeForm=this.formBuilder.group({

    typeName:['']
  })

  addType() {
    const typeForm={
      "typeName":this.typeForm.value.typeName
    }
    this.questionService.addType(typeForm).subscribe((data=>{
      this.typeForm.reset();
      console.log(data);
      
    }))
    }

  

}
