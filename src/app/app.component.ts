import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Event, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoadingSpinnerComponent } from '@app/lib/component/loading-spinner/loading-spinner.component';
import { MenuComponent } from '@app/lib/component/menu/menu.component';
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
  dialog = inject(MatDialog);
  dialogRef: MatDialogRef<MenuComponent> | undefined;
  showMenuDialog = signal<boolean>(false);

  isActive(url: string, prefix: boolean = false): string {
    return (prefix && this.routeEvent()?.urlAfterRedirects.startsWith(url)) || url === this.routeEvent()?.urlAfterRedirects ? 'mat-tonal-button' : 'mat-button';
  }
  openDialog(): void {
    if (!this.showMenuDialog()) {
      this.dialogRef = this.dialog.open(MenuComponent, {
        position: { top: '64px' },
        autoFocus: false,
        width: '100%',
        maxWidth: '100%',
        panelClass: 'menu-dialog',
        data: { currentUrl: this.routeEvent()?.urlAfterRedirects },
      });
      this.showMenuDialog.set(true);
      this.dialogRef.afterClosed().subscribe(result => {
        this.showMenuDialog.set(false);
      });
    }
  }
}
