import { QuestionService, QuestionUpdateDto } from './../service/question.service';
import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  selectedFiles: { [key: string]: File | null } = {
    enterQuestion: null,
    option1: null,
    option2: null,
    option3: null,
    option4: null,
  };
  messages: { [key: string]: string } = {
    enterQuestion: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
  };



// viewScores() {

// this.route.navigate(['/viewScores']);


// }
  baseURL = "http://localhost:8080/getImage?imageName="

  uploadedFile: any;
  subjects: any[] = [];
  typeDefintions!: any[];
  selectedFile:File | null=null;
  onSucessFileUpload:any;
    quesId:any;
  isUpdate: boolean = false;
      data:any;
      imageRef:any;
      message:any;
      isTouched: { [key: string]: boolean } = {};
      questionMessage:string='';
      option1Message:string='';
      option2Message:string='';
      option3Message:string='';
      option4Message:string='';

      isSuccess:boolean=false;
      questionFile: File | null = null;
option1File: File | null = null;
option2File: File | null = null;
option3File: File | null = null;
option4File: File | null = null;
  // question: any;
  


  constructor(private route: Router, private formBuilder: FormBuilder, private questionService: QuestionService,public dialog: MatDialog) {
    const navigation = this.route.getCurrentNavigation();
    console.log(navigation);
    const state = navigation?.extras.state as { ques: any };
    console.log(state);
  }
 
  questionsform = this.formBuilder.group({
    enterQuestion: ['',[Validators.required]],
    option1: ['',[Validators.required]],
    option2: ['',[Validators.required]],
    option3: ['',[Validators.required]],
    option4: ['',[Validators.required]],
    answer: [[Validators.required]],
    subjectselect: [null,[Validators.required]],
    QuestionTypeSelect:[null,[Validators.required]],
    option1TypeSelect:[null,[Validators.required]],
    option2TypeSelect:[null,[Validators.required]],
    option3TypeSelect:[null,[Validators.required]],
    option4TypeSelect:[null,[Validators.required]],
    answerTypeSelect:[null,[Validators.required]]
  })

  setAnswer(value:any){
    console.log(value);
    
    this.questionsform.get('answer')?.setValue(value)
  }

  onTouch(controlName: string): void {
    this.isTouched[controlName] = true;
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

 


    onFileSelect(imageRef: string, event: any): void {
      const file = event.target.files[0];
      if (file) {
        this.selectedFiles[imageRef] = file;
        this.messages[imageRef] = ''; // Reset message when a file is selected
        console.log('Selected file:', file);
        console.log('Image name:', imageRef);
      }
    }


    onUpload(imageRef: string): void {
      if (this.selectedFiles[imageRef]) {
        //this.messages[imageRef] = 'File uploaded successfully';
        this.uploadFile(this.selectedFiles[imageRef]!, imageRef);
      } else {
        this.messages[imageRef] = 'Please select the file first';
        console.log("No file selected for:", imageRef);
      }
    }
    


    uploadFile(file: File, imageRef: string): void {
      this.questionService.uploadImage(file).subscribe({
        next: (res) => {
          console.log(res);
          
          let imageName = res.imageName;
          let message=res.message;
          console.log(message);
          this.messages[imageRef] = message;
          let onSucessFileUpload=res.code;
          console.log(onSucessFileUpload);
          

          this.questionsform.get(imageRef)?.setValue(imageName);
          console.log('Image uploaded, name:', imageName);
        },
        error: (err) => {
          console.error('Upload error:', err);
        },
      });
    }




  // onFileSelect(imageRef:any, event: any):void {
  //   const file=event.target.files[0];
  //   if(file){
  //     this.selectedFile=file;
  //     this.imageRef = imageRef;
  //     console.log('selected file:',this.selectedFile);
  //     console.log('image name:',this.imageRef);
  //     }
  //   }



   



    // onUpload():void{
      
    //     if(this.selectedFile){
    //         this.message='File Upload Scuccessfully';
    //         this.isSuccess=true;
    //         this.questionService.uploadImage(this.selectedFile).subscribe({
    //           next:(res)=>{
    //             let imageName= res.imageName;
    //             console.log(imageName);
    //             this.questionsform.get(this.imageRef)?.setValue(imageName);
    //           }
    //         });
    //       }else{
    //         this.message='Please select the file';
    //         this.isSuccess=false;
    //         console.log("no file selected");
            
    //       }
      
    //      }






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
      questionType:this.questionsform.value.QuestionTypeSelect,
      option1Type:this.questionsform.value.option1TypeSelect,
      option2Type:this.questionsform.value.option2TypeSelect,
      option3Type:this.questionsform.value.option3TypeSelect,
      option4Type:this.questionsform.value.option4TypeSelect,
      answerType:this.questionsform.value.answerTypeSelect


    };

    console.log(this.questionsform.value);
    console.log(updateForm);
    

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