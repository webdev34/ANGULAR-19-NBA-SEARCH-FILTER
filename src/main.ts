import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // ✅ Provide HTTP Client properly

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([])), // ✅ Ensures Angular 19+ provides HttpClient properly
  ],
}).catch(err => console.error(err));
