import { QuestionService } from './../service/question.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrl: './subject-list.component.css',
})
export class SubjectListComponent implements OnInit {
  constructor(
    private route: Router,
    private FormBuilder: FormBuilder,
    private questionService: QuestionService
  ) { }
  ngOnInit(): void {
    this.SubjectList.get('subjectselect')?.valueChanges.subscribe({
      next: (res) => {
        console.log(res);
      },
      error(err) {
        console.error(err);
      },
    });
  }
  SubjectList = this.FormBuilder.group({
    subjectselect: [''],
  });
}
