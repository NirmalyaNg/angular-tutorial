export interface AuthResponse {
  user: {
    _id: string;
    __v: number;
    username: string;
    createdAt: string;
    updatedAt: string;
    email: string;
    isAdmin: boolean;
  };
  token: string;
}
