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
import { QuestionTypeComponent } from './question-type/question-type.component';
import { SubjectAddComponent } from './subject-add/subject-add.component';
import { authGuard } from './auth.guard';
import { authServiceGuard } from './auth-service.guard';




// app-routing.module.ts
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
 // {path:'**',redirectTo:'login'},
  { path: 'register', component: RegisterComponent },
  { path: 'selectsubject', component: SubjectListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'viewQuestions', component: QuestionsviewComponent },
  { path: 'welcome', component: WelcomeComponent,canActivate:[authServiceGuard] },
  { path: 'question', component: QuestionComponent,canActivate:[authServiceGuard]  },
{ path: 'result', component: ResultComponent, canActivate: [authServiceGuard] },
//{ path: 'result', component: ResultComponent, canDeactivate: [exitGuard] },

  { path: 'viewScores', component: UserScoreListComponent },
  { path: 'addQuestions', component: AdminComponent },
  { path: 'questionType', component: QuestionTypeComponent },
  { path: 'addSubject', component: SubjectAddComponent },
  { path: 'adminWelcome', component: AdminWelcomePageComponent,canActivate:[authGuard] }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
