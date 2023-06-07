import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSortingCyclesComponent } from './show-sorting-cycles.component';

describe('ShowSortingCyclesComponent', () => {
  let component: ShowSortingCyclesComponent;
  let fixture: ComponentFixture<ShowSortingCyclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSortingCyclesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowSortingCyclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
