import { Injectable, signal, effect, inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class NbaService {
  players = signal<any[]>([]);
  loading = signal<boolean>(true);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.loadPlayers();
      }
    });
  }

  async loadPlayers() {
    this.loading.set(true);

    try {
      const baseUrl = isPlatformBrowser(this.platformId) ? window.location.origin : '';
      const url = `${baseUrl}/assets/data/nba-players.json`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      await new Promise((resolve) => setTimeout(resolve, 2000));

      this.players.set(data);
    } catch (error) {
      console.error('Failed to load NBA players:', error);
    } finally {
      this.loading.set(false);
    }
  }
}
