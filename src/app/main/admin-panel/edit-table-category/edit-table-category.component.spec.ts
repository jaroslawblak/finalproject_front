import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTableCategoryComponent } from './edit-table-category.component';

describe('EditTableCategoryComponent', () => {
  let component: EditTableCategoryComponent;
  let fixture: ComponentFixture<EditTableCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTableCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTableCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
