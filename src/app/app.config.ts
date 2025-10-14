import { ApplicationConfig, inject, InjectionToken, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { provideMarkdown, MARKED_EXTENSIONS } from 'ngx-markdown';
import { BlogMetadata } from '@app/lib/service/blog-metadata'

export const APP_CONFIG = new InjectionToken<any>('App Configuration');

export const appConfig: ApplicationConfig = {
  providers: [
    BlogMetadata,
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideMarkdown({
      markedExtensions: [{ provide: MARKED_EXTENSIONS, useFactory: () => inject(BlogMetadata), multi: true }]
    }),
    provideZonelessChangeDetection(),
  ]
};
