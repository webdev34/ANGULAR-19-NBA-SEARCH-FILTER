import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NbaPlayerModalComponent } from './nba-player-modal.component';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('NbaPlayerModalComponent', () => {
  let component: NbaPlayerModalComponent;
  let fixture: ComponentFixture<NbaPlayerModalComponent>;
  let dialogRefMock: jasmine.SpyObj<MatDialogRef<NbaPlayerModalComponent>>;

  beforeEach(async () => {
    dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { firstName: 'LeBron', lastName: 'James', team: 'Lakers', position: 'SF' } },
        { provide: MatDialogRef, useValue: dialogRefMock }
      ],
      declarations: [NbaPlayerModalComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NbaPlayerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the modal component', () => {
    expect(component).toBeTruthy();
  });

  it('should receive player data correctly', () => {
    expect(component.data).toEqual({ firstName: 'LeBron', lastName: 'James', team: 'Lakers', position: 'SF' });
  });

  it('should format data keys correctly', () => {
    const formattedKeys = component.dataKeys();
    expect(formattedKeys).toEqual([
      { original: 'firstName', formatted: 'first Name' },
      { original: 'lastName', formatted: 'last Name' },
      { original: 'team', formatted: 'team' },
      { original: 'position', formatted: 'position' }
    ]);
  });

  it('should track items correctly using trackByOriginalKey', () => {
    const keyObject = { original: 'team' };
    expect(component.trackByOriginalKey(1, keyObject)).toBe('team');
  });

  it('should close the dialog when `closeDialog` is called', () => {
    component.closeDialog();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });

  it('should display player data in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('LeBron');
    expect(compiled.textContent).toContain('James');
    expect(compiled.textContent).toContain('Lakers');
    expect(compiled.textContent).toContain('SF');
  });

  it('should call `closeDialog` when close button is clicked', () => {
    spyOn(component, 'closeDialog');

    const closeButton = fixture.debugElement.query(By.css('.close-button'));
    closeButton.nativeElement.click();

    expect(component.closeDialog).toHaveBeenCalled();
  });
});
