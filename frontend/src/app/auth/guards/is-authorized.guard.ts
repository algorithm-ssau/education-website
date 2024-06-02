import { inject } from '@angular/core';
import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { map, tap } from 'rxjs';
import { UserService } from '../services/user.service';

const isAuthorizedGuard: CanActivateFn = (route) => {
  const userService = inject(UserService);
  return userService.getUser().pipe(
    tap((user) => {
      // eslint-disable-next-line no-param-reassign
      if (user) route.data = user;
    }),
    map(
      (user) => Boolean(user) || createUrlTreeFromSnapshot(route, ['../login']),
    ),
  );
};

export default isAuthorizedGuard;
