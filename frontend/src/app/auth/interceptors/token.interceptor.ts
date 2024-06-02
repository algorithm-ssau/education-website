import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { catchError, switchMap, take, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import UserState from '../../redux/states/user.state';
import Logout from '../../redux/actions/logout.action';

const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  const toastrService: ToastrService = inject(ToastrService);
  return store.select(UserState.getToken).pipe(
    take(1),
    switchMap((token) => {
      const newReq = req.clone({
        setHeaders: {
          Authorization: `Token ${token}`,
        },
      });
      return next(newReq).pipe(
        catchError((err: HttpErrorResponse) => {
          if (token !== '' && err.status === 403) {
            store.dispatch(new Logout());
            toastrService.info('Пожалуйста, залогиньтесь еще раз');
          }
          return throwError(err);
        }),
      );
    }),
  );
};

export default tokenInterceptor;
