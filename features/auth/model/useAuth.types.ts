export interface AuthUser {
  id: string;
  username: string;
  password?: string;
  status?: string;
  date_created?: string;
  name?: string;
  email?: string;
  role?: string;
}

export interface LoginResponse {
  success: boolean;
  user?: AuthUser;
}
