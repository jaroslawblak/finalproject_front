import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTableChildrenOfResourceComponent } from './edit-table-children-of-resource.component';

describe('EditTableChildrenOfResourceComponent', () => {
  let component: EditTableChildrenOfResourceComponent;
  let fixture: ComponentFixture<EditTableChildrenOfResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTableChildrenOfResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTableChildrenOfResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
