export interface AuthState {
  userToken: string | undefined | null;
  status: "idle" | "signOut" | "signIn";
}

export type AuthAction = {type: "SIGN_IN"; token: string} | {type: "SIGN_OUT"};

export interface AuthContextActions {
  signIn: (data: AuthPropsLogin) => {};
  signOut: () => {};
}

export interface AuthContextType extends AuthState, AuthContextActions {}

export interface AuthUserData {
  email: string;
  id: number;
  token: string;
}

export interface AuthPropsLogin {
  email: string;
  password: string;
}

export interface JsonWebToken {
  exp: number;
  iat: number;
}
