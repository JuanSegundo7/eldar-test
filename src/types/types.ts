export interface IResource {
  id?: number;
  title: string;
  body?: string;
  userId: number;
}

export interface IUser {
  id?: number | null;
  email: string;
  password: string;
  role?: string;
}

export interface IUserContextType {
  user: IUser;
  login: (userData: IUser) => void;
  logout: () => void;
}
