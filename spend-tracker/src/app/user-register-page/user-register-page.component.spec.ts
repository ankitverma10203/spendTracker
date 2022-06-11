import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegisterPageComponent } from './user-register-page.component';

describe('UserRegisterPageComponent', () => {
  let component: UserRegisterPageComponent;
  let fixture: ComponentFixture<UserRegisterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRegisterPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
