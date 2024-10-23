import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { Observable } from 'rxjs';


export interface QuestionUpdateDto {
  question: string | null | undefined;
  option1: string | null | undefined;
  option2: string | null | undefined;
  option3: string | null | undefined;
  option4: string | null | undefined;
  answer: string | null | undefined;
  subjectId: number | null | undefined;
  questionType:number | null | undefined;
  option1Type:number | null | undefined;
  option2Type:number | null | undefined;
  option3Type:number | null | undefined;
  option4Type:number | null | undefined;
  answerType:number | null | undefined;


  
}

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  
  baseURL = "http://localhost:8080";
  constructor(private httpClient: HttpClient) { }

  getQuestionJson() {
    return this.httpClient.get<any>("assets/questions.json")
  }

  createUser(dataFromRegisterForm: any) {
    console.log(dataFromRegisterForm);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    const options = { headers: headers }
    return this.httpClient.post(`${this.baseURL}/RegisterUsers`, dataFromRegisterForm, options)
  }


  addQuestion(inputFromAdmin: any) {
    console.log(inputFromAdmin);
    return this.httpClient.post(`${this.baseURL}/addQuestions`, inputFromAdmin)
  }




  // Method to update a question by ID
  updateQuestion(id: number, questionUpdateDto: QuestionUpdateDto): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'id': id
    });

    return this.httpClient.put(`${this.baseURL}/updateQuestion`, questionUpdateDto, { headers: headers }
    );
  }

  getSubjectsList(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseURL}/getAllSubjects`);
  }

  getUserScores():Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.baseURL}/getAllUserScores`);
  }

  getTypeList(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseURL}/getAllTypes`);
  }

  checkAnswer(id: any, answer: any): Observable<any> {
    let params = new HttpParams().set('selectedOption', answer);
    const url = `${this.baseURL}/checkAnswer${params.toString()}`;
    const headers = new HttpHeaders({
    })
    return this.httpClient.post<any>(`${this.baseURL}/checkAnswer`, null, { headers: headers, params: params })
  }

  deleteQuestion(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'id': id
    })
    const options = { headers: headers }
    return this.httpClient.delete(`${this.baseURL}/deleteQuestion`, options);
  }

  deleteScore(id:any):Observable<any>{
   const headers=new HttpHeaders({
    'Content-Type': 'application/json',
    'id':id
   }) 
   const options={headers:headers}
   return this.httpClient.delete(`${this.baseURL}/deleteUserScore`,options)
  }

  getQuestionsList(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseURL}/getAllQuestionsForUser`);
  }

  getTotalQuestions(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseURL}/getAllQuestionsForAdmin`);
  }

  loginUserData(dataFromLoginForm: any) {
    console.log(dataFromLoginForm);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    const options2 = { headers: headers }
    return this.httpClient.post(`${this.baseURL}/Login`, dataFromLoginForm, options2)
  }

  uploadImage(imageFile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', imageFile);

    console.log(formData);

    console.log(imageFile);

    const headers = new HttpHeaders({
      'accept': '*/*'
    });
    return this.httpClient.post(`${this.baseURL}/uploadImage`, formData, { headers });
  }


  submitQuiz(answers: { selectedOption: { [key: string]: any } }, id: any, subjectId: any): Observable<any> {
    const headers = new HttpHeaders(
      {
        'accept': '*/*',
        'Content-Type': 'application/json',
        'id': id,
        'subjectId': subjectId
      }
    )
    return this.httpClient.post(`${this.baseURL}/checkAnswers`, answers, { headers })
  }
}





// submitUserScore(scoreData: any, rightanswers: any, wrong: any, unattempted: any, totalQues: any) {
//   const userId = localStorage.getItem('userIdFromBackEnd');
//   console.log(userId);
//   const body = {
//     "score": scoreData,
//     "correct": rightanswers,
//     "inCorrect": wrong,
//     "notVisited": unattempted,
//     "total": totalQues
//   }
//   console.log(scoreData);
//   const headers = new HttpHeaders({
//     'Content-Type': 'application/json'
//   })
//   const options3 = { headers: headers }
//   return this.httpClient.post(`${this.baseURL}/${userId}`, body, options3);
// }



  // updateQuestion(id: number,question: any): Observable<any> {
  //   console.log(question);
  //   console.log(id);

  //   return this.httpClient.put(`${this.baseURL}/updateQuestion/${id}`, question);
  // }






