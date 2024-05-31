import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import UserDto from '../models/user-dto.model';
import UserResponse from '../models/user-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  public login(user: UserDto): Observable<string> {
    return this.httpClient
      .post<UserResponse>('users/login', {
        user,
      })
      .pipe(map(({ user: { token } }) => token));
  }

  public register(user: UserDto): Observable<string> {
    return this.httpClient
      .post<UserResponse>('users/', {
        user,
      })
      .pipe(map(({ user: { token } }) => token));
  }
}
