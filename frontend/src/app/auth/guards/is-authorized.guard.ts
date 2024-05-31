import { inject } from '@angular/core';
import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { map } from 'rxjs';
import { UserService } from '../services/user.service';

const isAuthorizedGuard: CanActivateFn = (route) => {
  const userService = inject(UserService);
  return userService
    .getUser()
    .pipe(
      map(
        (user) =>
          Boolean(user) || createUrlTreeFromSnapshot(route, ['../login']),
      ),
    );
};

export default isAuthorizedGuard;
