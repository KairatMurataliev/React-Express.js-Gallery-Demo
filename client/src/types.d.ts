export type RegisterResponse = {
  message: string;
  user: User;
}

export type GlobalError = {
  error: string;
}

export type ValidationError = {
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

export type PhotoMutation = {
  title: string;
  description: string;
  category: string;
  image: null | string;
}

export type LoginMutation = {
  email: string;
  password: string;
}

export type RegisterMutation = {
  email: string;
  username: string;
  avatar: null | string;
  password: string;
}

export type CategoryMutation = {
  name: string;
}

export type User = {
  id: string;
  email: string;
  username: string;
  avatar: string;
  token: string;
  role: string;
  favourites: string[];
  createdAt: string;
  updatedAt: string;
}

export type Photo = {
  id: string;
  title: string;
  image: string;
  author: User,
  category: Category;
  published: boolean;
  deleted: boolean;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export type Category = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export type Filters = {
  category: string | undefined;
}