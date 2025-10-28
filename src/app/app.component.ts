import { Component, effect, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet, RouterLink, Router, Event, NavigationEnd } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { LoadingSpinnerComponent } from '@app/lib/component/loading-spinner/loading-spinner.component';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, MatMenuModule, MatIconModule, RouterLink, MatToolbarModule, MatDividerModule, LoadingSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private router = inject(Router);
  routeEvent = toSignal(this.router.events.pipe(filter((event: Event) => event instanceof NavigationEnd)));

  isActive(url: string, prefix: boolean = false): string {
    return (prefix && this.routeEvent()?.urlAfterRedirects.startsWith(url)) || url === this.routeEvent()?.urlAfterRedirects ? 'mat-tonal-button' : 'mat-button';
  }
}
