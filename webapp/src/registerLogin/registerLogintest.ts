import {
  ILoginInformation,
  IRegisterRegularUserInformation,
} from "./LoginRegisterInterface";

export const initRegisterRegularUserProps: IRegisterRegularUserInformation = {
  username: "",
  email: "",
  password: "",
  phone: "",
};

export const initCorrectRegisterRegularUserProps: IRegisterRegularUserInformation = {
  username: "newrandomusername",
  email: "a@abcdegdfds.com",
  password: "123456",
  phone: "123456789",
};

export const initLoginProps: ILoginInformation = {
  username: "",
  password: "",
};
