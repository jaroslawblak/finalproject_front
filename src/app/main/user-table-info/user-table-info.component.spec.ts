import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTableInfoComponent } from './user-table-info.component';

describe('UserTableInfoComponent', () => {
  let component: UserTableInfoComponent;
  let fixture: ComponentFixture<UserTableInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTableInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTableInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
