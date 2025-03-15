import { Component, signal, inject } from '@angular/core';
import { NbaService } from '../../services/nba.service';
import { MatDialog } from '@angular/material/dialog';
import { NbaPlayerModalComponent } from '../nba-player-modal/nba-player-modal.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-nba-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './nba-data-table.component.html',
  styleUrls: ['./nba-data-table.component.scss'],
})
export class NbaDataTableComponent {
  nbaService = inject(NbaService);
  searchQuery = signal('');

  get filteredPlayers() {
    return this.nbaService.players().filter(player =>
      `${player.firstName} ${player.lastName} ${player.team} ${player.position}`
        .toLowerCase()
        .includes(this.searchQuery().toLowerCase())
    );
  }

  constructor(private dialog: MatDialog) {}

  openPlayerModal(player: any) {
    this.dialog.open(NbaPlayerModalComponent, { data: player });
  }
}
