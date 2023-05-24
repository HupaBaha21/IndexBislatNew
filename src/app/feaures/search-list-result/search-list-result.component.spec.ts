import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchListResultComponent } from './search-list-result.component';

describe('SearchListResultComponent', () => {
  let component: SearchListResultComponent;
  let fixture: ComponentFixture<SearchListResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchListResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchListResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
