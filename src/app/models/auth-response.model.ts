export interface AuthResponse {
  displayName: string;
  idToken: string;
  email: string;
  expiresIn: string;
  localId: string;
  refreshToken: string;
  kind: string;
  registered: boolean;
}
