import { QuestionService, QuestionUpdateDto } from './../service/question.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  subjects: any[] = [];
    quesId:any;
  isUpdate: boolean = false;
      data:any;
  // question: any;
  
constructor(private route: Router, private formBuilder: FormBuilder, private questionService: QuestionService) {
    const navigation = this.route.getCurrentNavigation();
    console.log(navigation);
    const state = navigation?.extras.state as { ques: any };
    console.log(state);
    
    // if (state) {
    //   this.question = state.ques;
    //   console.log(this.question);  
    // }
  }

  ngOnInit(): void {
    this.questionService.getSubjectsList().subscribe((data: any[]) => {
      this.subjects = data;
    });
    
    
    const action = history.state.action;
    
    if (action === "update") {
      this.isUpdate=true;
       this.data = history.state.ques;
       console.log(history.state.ques);
       
      this.quesId = this.data.quesid;
      console.log(this.quesId);
      // console.log(typeof(this.data.subject.id));
      
      this.questionsform.patchValue({
       enterQuestion: this.data.question,
        option1: this.data.option1,
        option2: this.data.option2,
        option3: this.data.option3,
        option4: this.data.option4,
        answer: this.data.answer,
        subjectselect:this.data.subjectId

      })
    }

    // this.questionsform.get('subjectselect')?.valueChanges.subscribe({
    //   next: (res) => { console.log(res)},
    //   error(err) {console.error(err) } }); 

  }


//   updateQuestion(quesId:any): void {

//     const updateForm={
//       question:this.questionsform.value.enterQuestion,
//       option1:this.questionsform.value.option1,
//       option2:this.questionsform.value.option2,
//       option3:this.questionsform.value.option3,
//       option4:this.questionsform.value.option4,
//       answer:this.questionsform.value.answer,
//       subjectId:this.questionsform.value.subjectselect
//     }
    
//     if (quesId!=undefined || quesId!=null) {
// console.log(this.questionsform.value);
// this.questionService.updateQuestion(quesId,updateForm ).subscribe(() => {
//         this.route.navigate(['/viewQuestions']);
//       });
//     } else {
      
//     }
//   }


updateQuestion(quesId: any): void {
  if (quesId !== undefined && quesId !== null) {
    const updateForm:QuestionUpdateDto = {
      question: this.questionsform.value.enterQuestion,
      option1: this.questionsform.value.option1,
      option2: this.questionsform.value.option2,
      option3: this.questionsform.value.option3,
      option4: this.questionsform.value.option4,
      answer: this.questionsform.value.answer,
      subjectId: this.questionsform.value.subjectselect
    };

    console.log(this.questionsform.value);

    this.questionService.updateQuestion(quesId,updateForm).subscribe(() => {
      this.route.navigate(['/viewQuestions']);
    });
  } else {
    alert('Invalid question ID. Please provide a valid ID.'+quesId);
  }
}

questionsform = this.formBuilder.group({
    enterQuestion: [''],
    option1: [''],
    option2: [''],
    option3: [''],
    option4: [''],
    answer: [''],
    subjectselect: [null],
  })

  onView() {
    this.route.navigate(['/viewQuestions'])
  }

  onAdd() {
    const questionFormData = {
      "question": this.questionsform.value.enterQuestion,
      "option1": this.questionsform.value.option1,
      "option2": this.questionsform.value.option2,
      "option3": this.questionsform.value.option3,
      "option4": this.questionsform.value.option4,
      "answer": this.questionsform.value.answer,
      "subjectId": this.questionsform.value.subjectselect
    }
    this.questionService.addQuestion(questionFormData).subscribe((val: any) => {
      this.questionsform.reset();
      console.log(val)
    })
  }

}
