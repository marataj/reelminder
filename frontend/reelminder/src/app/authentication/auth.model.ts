export interface RegisterData {
  username: string;
  email: string;
  password: string;
  password2: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface AuthResponseData {
  access: string;
  refresh: string;
  access_lifetime_s: number;
  username: string;
  email: string;
}

export interface ChangePasswordData {
  old: string;
  new: string;
  new2: string;
}
export class User {
  /**
   * User model, for storing informations about current authenticated user.
   *
   * @param _accessToken
   * @param _refreshToken
   * @param username
   * @param email
   * @param _expirationDate
   */

  constructor(
    private _accessToken: string,
    private _refreshToken: string,
    public username: string,
    public email: string,
    private _expirationDate: Date
  ) {}

  is_valid() {
    /**
     * Check if access token expired.
     */
    if (!this._expirationDate || new Date() > this._expirationDate) {
      return false;
    }
    return true;
  }

  get accessToken() {
    /**
     * Returns access token if still valid.
     */
    if (!this.is_valid()) {
      return null;
    }
    return this._accessToken;
  }

  get refreshToken() {
    /**
     * Returns refresh token.
     */
    return this._refreshToken;
  }
}
