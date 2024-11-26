import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatRadioModule} from '@angular/material/radio';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { QuestionComponent } from './question/question.component';
import { HeaderComponent } from './header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { ChangeBgDirective } from './change-bg.directive';
import { LoginComponent } from './login/login.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import {MatTableModule} from '@angular/material/table';
import { AdminComponent } from './admin/admin.component';
import { SubjectListComponent } from './subject-list/subject-list.component';
import {MatButtonModule} from '@angular/material/button';
import { QuestionsviewComponent } from './questionsview/questionsview.component';
import { ResultComponent } from './result/result.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import { UserScoreListComponent } from './user-score-list/user-score-list.component';
import { AdminWelcomePageComponent } from './admin-welcome-page/admin-welcome-page.component';
import { MatSnackBarModule } from '@angular/material/snack-bar'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SubjectAddComponent } from './subject-add/subject-add.component';
import { QuestionTypeComponent } from './question-type/question-type.component'; 


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    QuestionComponent,
    HeaderComponent,
    ChangeBgDirective,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    SubjectListComponent,
    QuestionsviewComponent,
    ResultComponent,
    UserScoreListComponent,
    AdminWelcomePageComponent,
    SubjectAddComponent,
    QuestionTypeComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRadioModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSnackBarModule,
    BrowserAnimationsModule
    

    


  ],
  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
