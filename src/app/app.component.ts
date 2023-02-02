import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showToolbar = false;

  constructor(private router: Router, private authService: AuthService) {
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

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}
