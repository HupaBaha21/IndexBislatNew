import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingCycleComponent } from './sorting-cycle.component';

describe('SortingCycleComponent', () => {
  let component: SortingCycleComponent;
  let fixture: ComponentFixture<SortingCycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortingCycleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortingCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
