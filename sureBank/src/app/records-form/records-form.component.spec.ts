import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsFormComponent } from './records-form.component';

describe('RecordsFormComponent', () => {
  let component: RecordsFormComponent;
  let fixture: ComponentFixture<RecordsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
