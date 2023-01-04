export class User {
  public id: string;
  public username: string;
  public email: string;
  public _expirationDate: Date;
  private _token: string;

  constructor(
    id: string,
    email: string,
    username: string,
    token: string,
    expirationDate: Date
  ) {
    this.id = id;
    this.email = email;
    this.username = username;
    this._token = token;
    this._expirationDate = expirationDate;
  }

  get token() {
    if (!this._expirationDate || new Date() > this._expirationDate) {
      return null;
    }
    return this._token;
  }
}
