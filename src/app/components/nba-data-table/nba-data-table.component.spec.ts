import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Component,  ViewChild, inject, signal, effect } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NbaService } from '../../services/nba.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NbaPlayerModalComponent } from '../nba-player-modal/nba-player-modal.component';
@Component({
  selector: 'app-nba-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatProgressSpinnerModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './nba-data-table.component.html',
  styleUrls: ['./nba-data-table.component.scss'],
})
export class NbaDataTableComponent {
  nbaService = inject(NbaService);
  dataSource = signal(new MatTableDataSource<any>([]));
  displayedColumns: string[] = ['firstName', 'lastName', 'team', 'position', 'actions'];
  searchQuery = signal('');
  pageSize = 5;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog) {
    effect(() => {
      const players = this.nbaService.players();
      if (players.length) {
        const updatedDataSource = new MatTableDataSource(players);
        this.dataSource.set(updatedDataSource);
        this.dataSource().paginator = this.paginator;
      }
    });
  }

  applyFilter() {
    this.dataSource().filter = this.searchQuery().trim().toLowerCase();
  }

  get filteredPlayers() {
    return this.nbaService.players().filter(player =>
      `${player.firstName} ${player.lastName} ${player.team} ${player.position}`
        .toLowerCase()
        .includes(this.searchQuery().toLowerCase())
    );
  }

  openPlayerModal(player: Object) {
    this.dialog.open(NbaPlayerModalComponent, { data: player });
  }

  onPageChange(event: any) {
    console.log(event);
  }
}
