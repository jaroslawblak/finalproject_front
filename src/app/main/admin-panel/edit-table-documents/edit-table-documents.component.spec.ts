import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTableDocumentsComponent } from './edit-table-documents.component';

describe('EditTableDocumentsComponent', () => {
  let component: EditTableDocumentsComponent;
  let fixture: ComponentFixture<EditTableDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTableDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTableDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
