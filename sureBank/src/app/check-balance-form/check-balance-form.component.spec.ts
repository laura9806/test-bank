import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBalanceFormComponent } from './check-balance-form.component';

describe('CheckBalanceFormComponent', () => {
  let component: CheckBalanceFormComponent;
  let fixture: ComponentFixture<CheckBalanceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckBalanceFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckBalanceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
