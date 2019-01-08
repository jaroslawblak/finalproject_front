import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTablePlacesComponent } from './edit-table-places.component';

describe('EditTablePlacesComponent', () => {
  let component: EditTablePlacesComponent;
  let fixture: ComponentFixture<EditTablePlacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTablePlacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTablePlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
