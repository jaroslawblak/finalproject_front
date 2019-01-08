import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTableResourcesCategoriesComponent } from './edit-table-resources-categories.component';

describe('EditTableResourcesCategoriesComponent', () => {
  let component: EditTableResourcesCategoriesComponent;
  let fixture: ComponentFixture<EditTableResourcesCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTableResourcesCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTableResourcesCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
