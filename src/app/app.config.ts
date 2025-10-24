import { ApplicationConfig, inject, InjectionToken, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideMarkdown, MARKED_EXTENSIONS } from 'ngx-markdown';
import { BlogService } from '@app/lib/service/blog.service'
import { loadingInterceptor } from '@app/lib/api/interceptor/loading.interceptor';

export const APP_CONFIG = new InjectionToken<any>('App Configuration');

export const appConfig: ApplicationConfig = {
  providers: [
    BlogService,
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideMarkdown({
      markedExtensions: [{ provide: MARKED_EXTENSIONS, useFactory: () => inject(BlogService), multi: true }]
    }),
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptors([loadingInterceptor]))
  ]
};
