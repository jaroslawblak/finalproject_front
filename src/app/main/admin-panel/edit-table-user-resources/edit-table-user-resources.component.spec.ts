import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTableUserResourcesComponent } from './edit-table-user-resources.component';

describe('EditTableUserResourcesComponent', () => {
  let component: EditTableUserResourcesComponent;
  let fixture: ComponentFixture<EditTableUserResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTableUserResourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTableUserResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
