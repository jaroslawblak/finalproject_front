import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserResDetailComponent } from './user-res-detail.component';

describe('UserResDetailComponent', () => {
  let component: UserResDetailComponent;
  let fixture: ComponentFixture<UserResDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserResDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserResDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
