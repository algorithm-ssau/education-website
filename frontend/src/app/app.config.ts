import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import routes from './app.routes';
import UserState from './redux/states/user.state';
import urlInterceptor from './core/interceptors/url.interceptor';
import tokenInterceptor from './auth/interceptors/token.interceptor';
import authErrorInterceptor from './auth/interceptors/auth-error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        urlInterceptor,
        tokenInterceptor,
        authErrorInterceptor,
      ]),
    ),
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(
      NgxsModule.forRoot([UserState], {
        developmentMode: isDevMode(),
      }),
      NgxsReduxDevtoolsPluginModule.forRoot({
        disabled: !isDevMode(),
      }),
    ),
  ],
};
