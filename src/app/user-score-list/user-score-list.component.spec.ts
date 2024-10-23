import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserScoreListComponent } from './user-score-list.component';

describe('UserScoreListComponent', () => {
  let component: UserScoreListComponent;
  let fixture: ComponentFixture<UserScoreListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserScoreListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserScoreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
