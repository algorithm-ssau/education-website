import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { map } from 'rxjs';
import { UserService } from '../services/user.service';

const isNotAuthorizedGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  return userService.getUser().pipe(map((user) => !user));
};

export default isNotAuthorizedGuard;
