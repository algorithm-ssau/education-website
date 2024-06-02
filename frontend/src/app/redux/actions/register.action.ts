export default class Register {
  public static readonly type = '[Auth] Register';

  public constructor(
    public email: string,
    public username: string,
    public password: string,
  ) {}
}
