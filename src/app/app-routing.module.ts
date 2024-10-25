import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { QuestionComponent } from './question/question.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { QuestionsviewComponent } from './questionsview/questionsview.component';
import { ResultComponent } from './result/result.component';
import { exitGuard } from './exit.guard';
import { UserScoreListComponent } from './user-score-list/user-score-list.component';
import { AdminWelcomePageComponent } from './admin-welcome-page/admin-welcome-page.component';



const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'register',component:RegisterComponent},
  {path:'addQuestions',component:AdminComponent},
 {path:'selectsubject',component:SubjectListComponent},
  {path:'login',component:LoginComponent},
  {path:'viewQuestions',component:QuestionsviewComponent},
 {path:"welcome",component:WelcomeComponent},
  {path:"question",component:QuestionComponent},
  {path:"viewScores",component:UserScoreListComponent},
  {path:"adminWelcome",component:AdminWelcomePageComponent},
  {path:"result",component:ResultComponent,canDeactivate:[exitGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
