import { Component } from '@angular/core';
import { NbaDataTableComponent } from './components/nba-data-table/nba-data-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NbaDataTableComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}
