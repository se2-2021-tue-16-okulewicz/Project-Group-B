export interface ILoginInformation {
  username: string;
  password: string;
}

export interface ILoginResults {
  userType: "Admin" | "Regular" | "Shelter" | "";
  token: string;
  id: number;
}

export interface IRegisterRegularUserInformation {
  username: string;
  email: string;
  phone: string;
  password: string;
}
