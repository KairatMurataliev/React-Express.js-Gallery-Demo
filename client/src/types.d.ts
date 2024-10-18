export interface LoginMutation {
  email: string;
  password: string;
}

export interface RegisterMutation {
  email: string;
  username: string;
  avatar: null | string;
  password: string;
}

export interface User {
  _id: string;
  email: string;
  username: string;
  avatar: string;
  token: string;
  role: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface GlobalError {
  error: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _name: string;
}

export interface PhotoMutation {
  title: string;
  image: null | string;
}

export interface Photo {
  _id: string;
  title: string;
  image: null | string;
  author: {
    _id: string;
    username: string;
  }
}