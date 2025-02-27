import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWelcomePageComponent } from './admin-welcome-page.component';

describe('AdminWelcomePageComponent', () => {
  let component: AdminWelcomePageComponent;
  let fixture: ComponentFixture<AdminWelcomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminWelcomePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminWelcomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
