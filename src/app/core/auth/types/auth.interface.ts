import { LoggedInUserI } from './user.interface';

export interface UserLoginReqValuesI {
  email: string;
  password: string;
}
export interface UserLoginResValuesI extends LoggedInUserI {
  token: string;
}

export interface UserRegisterReqValuesI extends UserLoginReqValuesI {
  username: string;
}
