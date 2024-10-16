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
  typeDefintions!: any[];
  selectedFile:File | null=null;
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
  questionsform = this.formBuilder.group({
    enterQuestion: [''],
    option1: [''],
    option2: [''],
    option3: [''],
    option4: [''],
    answer: [''],
    subjectselect: [null],
    QuestionTypeSelect:[null],
    option1TypeSelect:[null],
    option2TypeSelect:[null],
    option3TypeSelect:[null],
    option4TypeSelect:[null],
     answerTypeSelect:[null]
  })

  setAnswer(value:any){
    this.questionsform.get('answer')?.setValue(value)
  }
  ngOnInit(): void {
    this.questionService.getSubjectsList().subscribe((data: any[]) => {
      this.subjects = data;
    });

    this.questionService.getTypeList().subscribe((data:any[])=>{
      this.typeDefintions =data;
      console.log(data);
    })
    
    
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
        subjectselect:this.data.subjectId,
        

      })
    }


    // this.questionsform.get('subjectselect')?.valueChanges.subscribe({
    //   next: (res) => { console.log(res)},
    //   error(err) {console.error(err) } }); 

  }

  imageRef:any;

  onFileSelect(imageRef:any, event: any):void {
    const file=event.target.files[0];
    if(file){
      this.selectedFile=file;
      this.imageRef = imageRef;
      console.log('selected file:',this.selectedFile);
      console.log('image name:',this.imageRef);
      }
    }


    



   onUpload():void{
    if(this.selectedFile){
      this.questionService.uploadImage(this.selectedFile).subscribe({
        next:(res)=>{
          let imageName= res.imageName;
          console.log(imageName);
          this.questionsform.get(this.imageRef)?.setValue(imageName);
        }
      });
    }else{
      console.log("no file selected");
      
    }

   }

    onAdd() {
      const questionFormData = {

        
        "question": this.questionsform.value.enterQuestion,
        "option1": this.questionsform.value.option1,
        "option2": this.questionsform.value.option2,
        "option3": this.questionsform.value.option3,
        "option4": this.questionsform.value.option4,
        "answer": this.questionsform.value.answer,
        "subjectId": this.questionsform.value.subjectselect,
        "questionType":this.questionsform.value.QuestionTypeSelect,
        "option1Type":this.questionsform.value.option1TypeSelect,
        "option2Type":this.questionsform.value.option2TypeSelect,
        "option3Type":this.questionsform.value.option3TypeSelect,
        "option4Type":this.questionsform.value.option4TypeSelect,
        "answerType":this.questionsform.value.answerTypeSelect


      };
      
      this.questionService.addQuestion(questionFormData).subscribe((val: any) => {
        this.questionsform.reset();
        console.log(val)
      })
    }


   


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



  onView() {
    this.route.navigate(['/viewQuestions'])
  }

 

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