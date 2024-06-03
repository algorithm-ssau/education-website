import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import UserResponse from '../models/user-response.model';
import User from '../models/user.model';
import UserDto from '../models/user-dto.model';
import Endpoints from '../../redux/enums/endpoints';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  private cachedUser: User | null = null;

  private canReturnCached: boolean = false;

  public getUser(): Observable<User | null> {
    if (this.canReturnCached) {
      return of(this.cachedUser);
    }
    return this.httpClient.get<UserResponse>(Endpoints.User).pipe(
      map(({ user }) => user),
      tap((user) => {
        this.cachedUser = user;
        this.canReturnCached = true;
        setTimeout(() => {
          this.cachedUser = null;
          this.canReturnCached = false;
        }, 1000);
      }),
      catchError(() => {
        this.cachedUser = null;
        this.canReturnCached = true;
        setTimeout(() => {
          this.canReturnCached = false;
        }, 1000);
        return of(null);
      }),
    );
  }

  public updateUser(user: UserDto): Observable<User> {
    return this.httpClient
      .patch<UserResponse>(Endpoints.User, {
        user,
      })
      .pipe(map(({ user: newUser }) => newUser));
  }
}
