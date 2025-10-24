import { Component, inject } from '@angular/core';
import { LoadingService } from '@app/lib/service/loading.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-spinner',
  imports: [MatProgressSpinnerModule],
  templateUrl: './loading-spinner.component.html'
})
export class LoadingSpinnerComponent {

  loadingService = inject(LoadingService);
}