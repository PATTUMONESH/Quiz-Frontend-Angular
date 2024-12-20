import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { Router } from '@angular/router';
import { QuizResultServiceService } from '../quiz-result-service.service';
import { SharedQuizService } from '../shared-quiz.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {

baseURL="http://localhost:8080/getImage?imageName=";

  userId?:any;
   userName: string = '';
  questionList: any = [];
   subjectId:any;
  currentQuestion: number = 0;
  isLastQuestion: boolean = false;
  isLoading: boolean = false;
  selectedAnswers: Map<any, any> = new Map<any, any>();
//public selectedAnswers: { [key: string]: any } = {};
isQuizCompleted: boolean = false;
  isOptionSelected: boolean = false;
  selectedOption:string='';
  progress: number = 0; // Progress percentage
  totalTime: number = 600; // Total time in seconds (e.g., 10 minutes)
  timer: any;
  minutes: number = 10;
  seconds: number = 0;
  isSubmited :boolean=false;

 

  constructor(private questionService: QuestionService, private route: Router,private quizResultsService:QuizResultServiceService,private questionListLengthService:SharedQuizService) { }
  ngOnInit(): void {

    window.addEventListener('beforeunload',(event)=>{
      event.preventDefault();
      event.returnValue=''; // Show a confirmation dialog in supported browsers
    })

    //prevent back navigation
    history.pushState(null,'',location.href);
    window.onpopstate =()=>{
      history.pushState(null,'',location.href);
      alert('Back navigation is disabled');

    }

    this.userName = localStorage.getItem('name')!;
    this.userId=localStorage.getItem('userIdFromBackEnd');
    console.log(this.userId);
    this.questionService.getQuestionsList().subscribe((data: any[]) => {
   // this.questionList = data;
   this.questionList=this.shuffleArray(data);
   console.log(this.questionList);
   
   this.subjectId = this.questionList[0].subjectId;
   // Shuffle options for each question
    this.questionList.forEach((question: { option1: any; option2: any; option3: any; option4: any; }) => {
      const options = [
        question.option1,
        question.option2,
        question.option3,
        question.option4
      ];
      const shuffledOptions = this.shuffleArray(options);
      question.option1 = shuffledOptions[0];
      question.option2 = shuffledOptions[1];
      question.option3 = shuffledOptions[2];
      question.option4 = shuffledOptions[3];
    });
 this.startTimer();
})
  }
  
   
 
  


  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  

  startTimer() {
    this.timer = setInterval(() => {
      if (this.totalTime > 0) {
        this.totalTime--;
        this.minutes = Math.floor(this.totalTime / 60);
        this.seconds = this.totalTime % 60;
      } else {
        this.endTimer(); 
      }
    }, 1000);
  }
  
  endTimer() {
    if (this.timer) {
      clearInterval(this.timer); 
      this.timer = null; 
    }
 console.log( this.questionList.length);

 if(!this.isSubmited){
  this.onSubmitQuiz(); 
 }
  }
  // public selectedAnswers:{[key:string]:any}={};
 onLogout() {
    localStorage.clear();
    this.route.navigate(['/login']);
  }
  
// answer(selectedOption: any,quesId:any) {
//         console.log(selectedOption);
//         this.selectedOption=selectedOption;
//         this.selectedAnswers.set(quesId,selectedOption);

//       }

// nextQuestion(option: string, quesId: any) {
//   // Save the selected option before moving to the next question
//   //this.selectedAnswers.set(quesId, option);
//   // Proceed to the next question
//   if (this.currentQuestion < this.questionList.length - 1) {
//     this.currentQuestion++;
//   }

//   // Retrieve the selected answer for the next question
//   const nextQuesId = this.questionList[this.currentQuestion]?.quesid;
//   if (this.selectedAnswers.has(nextQuesId)) {
//     this.selectedOption = this.selectedAnswers.get(nextQuesId) as string;  // Set the selected option if available
//   } else {
//     this.selectedOption = '';  // Reset if no answer was selected for the next question
//   }
//   this.progress=((this.currentQuestion+1)/this.questionList.length)*100;
// //       console.log('Progress:',this.progress);
// }

// previousQuestion(quesId: number) {
//   this.currentQuestion--;  // Move to the previous question
//   console.log(quesId);
//   // Retrieve the selected answer for the previous question
//   const prevQuesId = this.questionList[this.currentQuestion]?.quesid;
//   if (this.selectedAnswers.has(prevQuesId)) {
//     this.selectedOption = this.selectedAnswers.get(prevQuesId) as string;  // Set the selected option if available
//   } else {
//     this.selectedOption = '';  // Reset if no answer was selected for the previous question
//   }
//   this.progress=((this.currentQuestion+1)/this.questionList.length)*100;
// }

answer(option: any, quesId: any) {
  // Check if this option is already selected for the question
  if (this.selectedAnswers.has(quesId)) {
    // If the same option is clicked again, unselect it
    if (this.selectedAnswers.get(quesId) === option) {
      this.selectedAnswers.delete(quesId);  // Unselect the option
    } else {
      // Select the new option
      this.selectedAnswers.set(quesId, option);
    }
  } else {
    // If no option is selected for the question, select this one
    this.selectedAnswers.set(quesId, option);
  }
}

isSelected(option: any, quesId: any) {
  // Check if the current option is selected
  return this.selectedAnswers.get(quesId) === option;
}




nextQuestion(option: string, quesId: any) {
  if (this.currentQuestion < this.questionList.length - 1) {
    this.currentQuestion++;
  }
  
  // Retrieve the selected answer for the next question
  const nextQuesId = this.questionList[this.currentQuestion]?.quesid;
  if (this.selectedAnswers.has(nextQuesId)) {
    this.selectedOption = this.selectedAnswers.get(nextQuesId) as string; // Set the selected option if available
  } else {
    this.selectedOption = ''; // Reset if no answer was selected for the next question
  }
  
  // Ensure the option disabling is reset for the new question
  this.questionList[this.currentQuestion].isOptionDisabled = !!this.selectedAnswers.has(nextQuesId);
  this.progress = ((this.currentQuestion + 1) / this.questionList.length) * 100;
}

previousQuestion(quesId: number) {
  this.currentQuestion--;  // Move to the previous question

  // Retrieve the selected answer for the previous question
  const prevQuesId = this.questionList[this.currentQuestion]?.quesid;
  if (this.selectedAnswers.has(prevQuesId)) {
    this.selectedOption = this.selectedAnswers.get(prevQuesId) as string; // Set the selected option if available
  } else {
    this.selectedOption = ''; // Reset if no answer was selected for the previous question
  }
  
  // Ensure the option disabling is reset for the previous question
  this.questionList[this.currentQuestion].isOptionDisabled = !!this.selectedAnswers.has(prevQuesId);
  this.progress = ((this.currentQuestion + 1) / this.questionList.length) * 100;
}





//   ngOnInit(): void {
//     this.userName = localStorage.getItem('name')!;
//     this.userId=localStorage.getItem('userIdFromBackEnd');
//     console.log(this.userId);
//     this.questionService.getQuestionsList().subscribe((data: any[]) => {
//    // this.questionList = data;
//    this.questionList=this.shuffleArray(data);
//    this.subjectId = this.questionList[0].subjectId;
//    // Shuffle options for each question
//     this.questionList.forEach((question: { option1: any; option2: any; option3: any; option4: any; }) => {
//       const options = [
//         question.option1,
//         question.option2,
//         question.option3,
//         question.option4
//       ];
//       const shuffledOptions = this.shuffleArray(options);
//       question.option1 = shuffledOptions[0];
//       question.option2 = shuffledOptions[1];
//       question.option3 = shuffledOptions[2];
//       question.option4 = shuffledOptions[3];
//     });
//  this.startTimer();
// })
//   }






// nextQuestion(selectedOption:any,quesId:any) {
//        // console.log(`${selectedOption} ${quesId}`); 
   

//        this.selectedOption=this.selectedAnswers[quesId]||'';
//        this.selectedAnswers[quesId] = selectedOption;
//        console.log(`Stored selectedAnswer for quesId ${quesId}:`, this.selectedAnswers[quesId]);
//     //  this.selectedOption = "";
     
//       console.log(this.selectedAnswers);


//        console.log(this.questionList.length);
//         console.log(this.currentQuestion);
//         console.log(this.selectedAnswers);
//         console.log(quesId);
//         console.log(selectedOption);


//         console.log(this.questionList[this.currentQuestion+1]);
//         console.log(this.questionList[this.currentQuestion+1].quesid);
//         // this.selOpt=this.selectedAnswers[this.questionList[this.currentQuestion+1].quesid];
        
        
//         console.log(this.selectedAnswers[quesId]);
      
//       //  console.log(this.questionList);
//         if (this.currentQuestion === (this.questionList.length -1)) {
//         // this.isLastQuestion = true;
//          // Last question reached
//          this.onSubmitQuiz();
//       } else {
//         this.currentQuestion++; // Move to the next question
        
//       }
     
//      this.progress=((this.currentQuestion+1)/this.questionList.length)*100;
//       console.log('Progress:',this.progress);
//       }


// previousQuestion(quesId:any)
// {
//   console.log(quesId);
// console.log(this.selectedAnswers);

// }





// previousQuestion(quesid:any) {
//   console.log(this.selectedAnswers); 
//   console.log(this.questionList);
//   console.log(quesid); //34
//   if(this.currentQuestion>0){
// this.currentQuestion--; //move to the previous question
// // const previousQuestionId=this.questionList[this.currentQuestion]?.quesId;
// console.log('Selected answers object:', this.selectedAnswers);
// console.log(this.selectedOption);
// //set the selected option to the previous seleceted answer
// this.selectedOption=this.selectedAnswers[quesid] || '';
// console.log(`Restored answer for quesId ${quesid}:`, this.selectedOption);
// this.progress=((this.currentQuestion+1)/this.questionList.length)*100;
// }
// }






//correct
//   onSubmitQuiz() {
//     this.isLoading = true;
//    const requestBody={
//     selectedOption:this.selectedAnswers
//   };

//  console.log('Submitting quiz with the following answers:', requestBody);
// this.questionService.submitQuiz(requestBody,this.userId,this.subjectId).subscribe((response:any)=>{
//     console.log(response); 
//     console.log(this.questionList.length);
//     this.questionListLengthService.setQuestionListLength(this.questionList.length);
//     this.quizResultsService.setQuizResults(response);
//     this.route.navigate(['/result']);
//     this.isSubmited=true;
//   })
// }


onSubmitQuiz() {
  this.isLoading = true;

  // Convert the Map to a plain object
  const selectedOptionsObj = Object.fromEntries(this.selectedAnswers);

// const apple=Object.keys({
//   1:"monesh",
//   2:"jai"
// });
// console.log(apple);

       
  console.log(this.selectedAnswers);
  

  console.log('Converted selectedAnswers Map to Object:', selectedOptionsObj);

  // Prepare the request body
  const requestBody = {
    selectedOption: selectedOptionsObj
  };

  console.log('Submitting quiz with the following answers:', requestBody);

  // Call the submitQuiz API method
  this.questionService.submitQuiz(requestBody, this.userId, this.subjectId).subscribe(
    (response: any) => {
      console.log('Response from the server:', response);

      // Store quiz results and navigate to the result page
      this.questionListLengthService.setQuestionListLength(this.questionList.length);
      this.quizResultsService.setQuizResults(response);

      this.route.navigate(['/result']);
      this.isSubmited = true;
      this.isLoading = false;
    },
    (error: any) => {
      console.error('Error while submitting quiz:', error);
      this.isLoading = false;
    }
  );
}













}




  // previousQuestion() {
  //   this.currentQuestion--;
  // }

  // getProgressPercent() {
  //   this.progress = (
  //     (this.currentQuestion / this.questionList.length) * 100
  //   ).toString();
  //   return this.progress;
  // }






// correctAnswer: number = 0;
  // inCorrectAnswer: number = 0;
  // unAttemptedQuestion: number = 0;



// if(randomNumber===0){
// this.questionList = data.questions;
// }else if(randomNumber===1){
//   this.questionList = data2.questions;
// }


// getAllQuestions() {
//   this.questionService.getQuestionJson()
//     .subscribe(res => {
//       this.questionList = res.questions;
//     })
// }




// this.onSelectedOption();
// if (!this.isOptionSelected) {
//   this.unAttemptedQuestion++;
// }



// setTimeout(() => {
//   this.currentQuestion++;
//   this.resetCounter();
//   this.getProgressPercent();
// }, 1000);



// resetQuiz() {
//   this.resetCounter();
//   // this.getAllQuestions();
//   this.points = 0;
//   this.counter = 60;
//   this.currentQuestion = 0;
//   this.progress = "0";

// }


// this.isOptionSelected = true;




//     if (option.correct) {
//       this.points += 10;
//       this.correctAnswer++;
//     } else {
//       this.inCorrectAnswer++;
//       this.points -= 10;
//     }
  

  // startCounter() {
  //   this.interval$ = interval(1000).subscribe((val) => {
  //     this.counter--;
  //     if (this.currentQuestion == 8) {
  //       setTimeout(() => {
  //         this.interval$.unsubscribe();
  //       }, 600000);
  //     }
  //     if (this.counter === 0 && this.currentQuestion != 8) {
  //       this.currentQuestion++;
  //       this.counter = 60;
  //       this.points -= 10;
  //     }
  //   });
  //   setTimeout(() => {
  //     this.interval$.unsubscribe();
  //   }, 600000);
  // }

  // stopCounter() {
  //   this.interval$.unsubscribe();
  //   this.counter = 0;
  // }


  // resetCounter() {
  //   this.stopCounter();
  //   this.counter = 60;
  //   this.startCounter();
  // }

    // this.isOptionSelected = false;
    // this.currentQuestion++;
   // this.resetCounter();


  //  onSubmitQuiz() {
  //   this.unAttemptedQuestion =
  //     this.questionList.length - (this.correctAnswer + this.inCorrectAnswer);

  //   this.questionService.submitUserScore(this.points, this.correctAnswer, this.inCorrectAnswer, this.unAttemptedQuestion, this.questionList.length).subscribe({
  //     next: (res: any) => {
  //       console.log(res);
  //     },
  //     error: (error: Error) => {
  //       console.error(error);
  //     },
  //   });

  //   this.isQuizCompleted = true;
  //   //this.stopCounter();
  // }



    // public points: number = 0;
  // counter = 600;
  // interval$: any;
  // progress: string = '0';
  
    // this.questionService.checkAnswer(selectedOption,quesId).subscribe((data:any)=>{
      //   console.log(data);
      // })
     // this.getProgressPercent(); 