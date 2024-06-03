import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import Endpoints from '../../redux/enums/endpoints';

const authErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService: ToastrService = inject(ToastrService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message: string | null = null;
      const emailErrors = error.error.errors.email as string[];
      switch (true) {
        case error.url?.endsWith(Endpoints.Register) &&
          emailErrors[0] === 'user with this email already exists.':
          message = 'Пользователь с таким email уже существует';
          break;
        case error.url?.endsWith(Endpoints.Register):
          message = 'Email введён некорректно';
          break;
        case error.url?.endsWith(Endpoints.Login):
          message = 'Неправильный логин или пароль';
          break;
        default:
          break;
      }
      if (message) toastrService.error(message);
      return throwError(error);
    }),
  );
};

export default authErrorInterceptor;
