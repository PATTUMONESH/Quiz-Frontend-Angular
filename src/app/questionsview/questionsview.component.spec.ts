import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsviewComponent } from './questionsview.component';

describe('QuestionsviewComponent', () => {
  let component: QuestionsviewComponent;
  let fixture: ComponentFixture<QuestionsviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionsviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionsviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
