import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTableUsersComponent } from './edit-table-users.component';

describe('EditTableUsersComponent', () => {
  let component: EditTableUsersComponent;
  let fixture: ComponentFixture<EditTableUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTableUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTableUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
