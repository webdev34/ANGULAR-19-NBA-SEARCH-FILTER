import { Injectable, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NbaService {
  players = signal<any[]>([]);
  loading = signal<boolean>(true);

  constructor(private http: HttpClient) {
    effect(() => {
      this.http
        .get<any[]>('assets/data/nba-players.json') 
        .pipe(delay(2000)) 
        .subscribe({
          next: (data) => {
            this.players.set(data);
            this.loading.set(false);
          },
          error: (error) => console.error('Failed to load NBA players:', error),
        });
    });
  }
}
