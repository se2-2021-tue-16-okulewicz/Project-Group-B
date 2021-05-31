export interface IFiltersAndCookies {
  filters: IFilters;
  cookies: {
    [name: string]: any;
  };
}

export interface IFilters {
  [name: string]: any;
}

export interface IRegisterInfo {
  username: string;
  email: string;
  phone: string;
  password: string;
  repeatedPassword: string;
  showPassword: boolean;
  showRepeatedPassword: boolean;
}
