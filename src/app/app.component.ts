import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Assessment Center';

  showNav = true;

  constructor(private router: Router) {
    // Subscribe to route changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Hide nav if the current route is '/login'
        this.showNav = !(event.url === '/login');
      }
    });
  }
}
