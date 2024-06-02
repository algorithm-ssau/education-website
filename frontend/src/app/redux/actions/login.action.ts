export default class Login {
  public static readonly type = '[Auth] Login';

  public constructor(
    public email: string,
    public username: string,
    public password: string,
  ) {}
}
