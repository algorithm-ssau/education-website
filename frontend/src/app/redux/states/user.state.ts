import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, take, tap } from 'rxjs';
import Login from '../actions/login.action';
import Logout from '../actions/logout.action';
import LocalStorageHelper from '../utils/local-storage-helper';
import LocalStorageStates from '../enums/local-storage-key';
import { AuthService } from '../../auth/services/auth.service';

@State<string>({
  name: 'user',
  defaults: LocalStorageHelper.GetItem<string>(LocalStorageStates.User) || '',
})
@Injectable()
export default class UserState {
  public constructor(private authService: AuthService) {}

  @Action(Login)
  public login(ctx: StateContext<string>, action: Login): Observable<string> {
    const { email, username, password } = action;
    return this.authService.login({ email, username, password }).pipe(
      take(1),
      tap((token) => {
        LocalStorageHelper.SetItem(LocalStorageStates.User, token);
        ctx.patchState(token);
      }),
      catchError(() => {
        return EMPTY;
      }),
    );
  }

  // eslint-disable-next-line class-methods-use-this
  @Action(Logout)
  public logout(ctx: StateContext<string>): void {
    ctx.setState('');
    LocalStorageHelper.RemoveItem(LocalStorageStates.User);
  }

  @Selector()
  public static getToken(state: string): string {
    return state;
  }
}
