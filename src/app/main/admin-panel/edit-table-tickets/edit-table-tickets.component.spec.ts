import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTableTicketsComponent } from './edit-table-tickets.component';

describe('EditTableTicketsComponent', () => {
  let component: EditTableTicketsComponent;
  let fixture: ComponentFixture<EditTableTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTableTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTableTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
