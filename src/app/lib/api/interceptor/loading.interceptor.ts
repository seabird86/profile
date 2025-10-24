import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '@app/lib/service/loading.service';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  loadingService.count();
  console.log("===up");
  return next(req).pipe(
    finalize(() => {
      loadingService.down();
      console.log("===down");
    })
  );
};