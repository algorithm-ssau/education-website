import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { UserService } from '../services/user.service';

const isAuthorizedGuard: CanActivateFn = (route) => {
  const userService = inject(UserService);
  const router = inject(Router);
  return userService.getUser().pipe(
    tap((user) => {
      // eslint-disable-next-line no-param-reassign
      if (user) route.data = user;
    }),
    map((user) => Boolean(user)),
    tap((user) => {
      if (!user) router.navigate([{ outlets: { modal: ['auth', 'login'] } }]);
    }),
  );
};

export default isAuthorizedGuard;
