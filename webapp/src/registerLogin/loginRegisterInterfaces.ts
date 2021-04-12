export interface ILoginInformation {
  username: string;
  password: string;
}

export const initLoginProps : ILoginInformation={
  username: "",
  password: ""
}

export interface ILoginResults {
  userType: "Admin" | "Regular" | "Shelter" | "";
  token: string;
  id: number;
}

export const initRegisterRegularUserProps : IRegisterRegularUserInformation={
  username: "",
  email:"",
  password: "",
  phone: "",
}


export const initCorrectRegisterRegularUserProps : IRegisterRegularUserInformation={
  username: "newrandomusername",
  email:"a@abcdegdfds.com",
  password: "123456",
  phone: "123456789",
}

export interface IRegisterRegularUserInformation {
  username: string;
  email: string;
  phone: string;
  password: string;
}
