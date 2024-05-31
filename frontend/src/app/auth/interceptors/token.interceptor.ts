import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { switchMap, take } from 'rxjs';
import UserState from '../../redux/states/user.state';

const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  return store.select(UserState.getToken).pipe(
    take(1),
    switchMap((token) => {
      const newReq = req.clone({
        setHeaders: {
          Authorization: `Token ${token}`,
        },
      });
      return next(newReq);
    }),
  );
};

export default tokenInterceptor;
