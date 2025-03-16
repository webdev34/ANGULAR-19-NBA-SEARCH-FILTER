import { Component, Inject, computed, Signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nba-player-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './nba-player-modal.component.html',
  styleUrls: ['./nba-player-modal.component.scss'],
})
export class NbaPlayerModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  dataKeys: Signal<{ original: string; formatted: string }[]> = computed(() =>
    Object.keys(this.data).map((key) => ({
      original: key,
      formatted: key.replace(/([A-Z])/g, ' $1').trim(),
    }))
  );

  trackByOriginalKey(index: number, item: { original: string }) {
    return item.original;
  }

  dialogRef = Inject(MatDialogRef<NbaPlayerModalComponent>);

  closeDialog() {
    this.dialogRef.close();
  }
}
