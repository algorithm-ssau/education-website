import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import UserResponse from '../models/user-response.model';
import User from '../models/user.model';
import UserDto from '../models/user-dto.model';
import Endpoints from '../../redux/enums/endpoints';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  public getUser(): Observable<User | null> {
    return this.httpClient.get<UserResponse>(Endpoints.User).pipe(
      map(({ user }) => user),
      catchError(() => {
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
