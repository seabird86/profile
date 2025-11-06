import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

export interface DialogMenu {
  currentUrl: string;
}

@Component({
  selector: 'app-menu',
  imports: [ RouterLink, MatDividerModule, MatIconModule, MatButtonModule, MatDialogClose],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'

})
export class MenuComponent {

  readonly data = inject<DialogMenu>(MAT_DIALOG_DATA);

  isActive(url: string, prefix: boolean = false): string {
    return (prefix && this.data.currentUrl.startsWith(url)) || url === this.data.currentUrl ? 'mat-tonal-button' : 'mat-button';
  }
}
