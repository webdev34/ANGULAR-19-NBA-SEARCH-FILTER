import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbaPlayerModalComponent } from './nba-player-modal.component';

describe('NbaPlayerModalComponent', () => {
  let component: NbaPlayerModalComponent;
  let fixture: ComponentFixture<NbaPlayerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NbaPlayerModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NbaPlayerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
