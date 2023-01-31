import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showToolbar = false;

  constructor(private router: Router) {
    this.checkRoute().subscribe();
  }

  checkRoute() {
    return this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => {
        if (e.url === '/login') {
          this.showToolbar = false;
        } else {
          this.showToolbar = true;
        }
      })
    );
  }
}
