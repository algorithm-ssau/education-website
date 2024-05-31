import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import routes from './app.routes';
import UserState from './redux/states/user.state';
import urlInterceptor from './core/interceptors/url.interceptor';
import tokenInterceptor from './auth/interceptors/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([urlInterceptor, tokenInterceptor])),
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
