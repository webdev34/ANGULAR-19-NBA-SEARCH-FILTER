import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbaDataTableComponent } from './nba-data-table.component';

describe('NbaDataTableComponent', () => {
  let component: NbaDataTableComponent;
  let fixture: ComponentFixture<NbaDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NbaDataTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NbaDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
