import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AuthService } from './services/auth.service';
import { TopicService } from './services/topic.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    AuthService,
    TopicService,
    provideHttpClient(
      withInterceptors([
        (req, next) => {
          const token = localStorage.getItem('token');
          if (token) {
            const cloned = req.clone({
              headers: req.headers.set('Authorization', token),
            });
            return next(cloned);
          }
          return next(req);
        },
      ])
    ),
  ],
};
