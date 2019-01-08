import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTableResourcesComponent } from './edit-table-resources.component';

describe('EditTableResourcesComponent', () => {
  let component: EditTableResourcesComponent;
  let fixture: ComponentFixture<EditTableResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTableResourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTableResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
