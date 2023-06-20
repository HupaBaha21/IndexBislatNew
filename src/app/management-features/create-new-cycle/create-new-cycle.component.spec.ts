import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewCycleComponent } from './create-new-cycle.component';

describe('CreateNewCycleComponent', () => {
  let component: CreateNewCycleComponent;
  let fixture: ComponentFixture<CreateNewCycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewCycleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
