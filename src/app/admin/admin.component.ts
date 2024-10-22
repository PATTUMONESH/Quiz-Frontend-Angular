import { QuestionService, QuestionUpdateDto } from './../service/question.service';
import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';

export interface DialogData {
 image:any;
  
}



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
  providers:[{
               provide:MAT_RADIO_DEFAULT_OPTIONS,
               useValue:{color:'primary'}
             }]
})
export class AdminComponent implements OnInit {
  baseURL = "http://localhost:8080/getImage?imageName="

  uploadedFile: any;
  subjects: any[] = [];
  typeDefintions!: any[];
  selectedFile:File | null=null;
    quesId:any;
  isUpdate: boolean = false;
      data:any;
      imageRef:any;
  // question: any;
  


  constructor(private route: Router, private formBuilder: FormBuilder, private questionService: QuestionService,public dialog: MatDialog) {
    const navigation = this.route.getCurrentNavigation();
    console.log(navigation);
    const state = navigation?.extras.state as { ques: any };
    console.log(state);
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
    console.log(value);
    
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

      console.log(this.data);

      
      // console.log(typeof(this.data.subject.id));
      this.questionsform.patchValue({
       enterQuestion: this.data.question,
        option1: this.data.option1,
        option2: this.data.option2,
        option3: this.data.option3,
        option4: this.data.option4,
        answer: this.data.answer,
        subjectselect:this.data.subjectId,
        QuestionTypeSelect:this.data.questionType,
        option1TypeSelect:this.data.option1Type,
        option2TypeSelect:this.data.option2Type,
        option3TypeSelect:this.data.option3Type,
        option4TypeSelect:this.data.option4Type,
        answerTypeSelect:this.data.answerType
      })
    }



  }

 

  onFileSelect(imageRef:any, event: any):void {
    const file=event.target.files[0];
    if(file){
      this.selectedFile=file;
      this.imageRef = imageRef;
      console.log('selected file:',this.selectedFile);
      console.log('image name:',this.imageRef);
      }
    }




    openDialog(imageRef: string): void {
      let imageUrl = '';
    
      // Construct the image URL based on the selected file or stored image name
      if (imageRef === 'question') {
        imageUrl = this.baseURL + this.questionsform.value.enterQuestion;
      } else if (imageRef === 'option1') {
        imageUrl = this.baseURL + this.questionsform.value.option1;
      } else if (imageRef === 'option2') {
        imageUrl = this.baseURL + this.questionsform.value.option2;
      } else if (imageRef === 'option3') {
        imageUrl = this.baseURL + this.questionsform.value.option3;
      } else if (imageRef === 'option4') {
        imageUrl = this.baseURL + this.questionsform.value.option4;
      }
    
      const dialogRef = this.dialog.open(ImageDialogExample, {
        width: '500px',
        height: '400px',
        data: {
          image: imageUrl // Pass the dynamically generated image URL
        }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
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
      subjectId: this.questionsform.value.subjectselect,
      QuestionType:this.questionsform.value.QuestionTypeSelect,
      option1Type:this.questionsform.value.option1TypeSelect,
      option2Type:this.questionsform.value.option2TypeSelect,
      option3Type:this.questionsform.value.option3TypeSelect,
      option4Type:this.questionsform.value.option4TypeSelect,
      answerType:this.questionsform.value.answerTypeSelect


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





@Component({
  selector: 'ImageDialog',
  templateUrl: 'ImageDialog.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})

export class ImageDialogExample {
baseURL = "http://localhost:8080/getImage?imageName="
  constructor(
    public dialogRef: MatDialogRef<ImageDialogExample>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
console.log(data);

  }

  onNoClick(): void {
    this.dialogRef.close();
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





        




    // this.questionsform.get('subjectselect')?.valueChanges.subscribe({
    //   next: (res) => { console.log(res)},
    //   error(err) {console.error(err) } }); 



    
    
    // openDialog(): void {
    //   const dialogRef = this.dialog.open(ImageDialogExample, {
    //     width:'500px',
    //     height:'400px',
    //     data:{
    //      image:this.questionsform.value.enterQuestion,
    //      image1:this.questionsform.value.option1
    //     }
    //  // data: {name: this.name, animal: this.animal},
    //   });
  
    //   dialogRef.afterClosed().subscribe((result:any) => {
    //     console.log('The dialog was closed');
    //   //  this.animal = result;
    //   });
    // }