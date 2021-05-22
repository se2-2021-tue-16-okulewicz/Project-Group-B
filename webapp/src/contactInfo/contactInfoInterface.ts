export interface IContactInfo {
  name: string;
  email: string;
  phoneNumber: string;
}

export interface ErrorInformation {
  [name: string]: boolean;
  total: boolean;
}

export const initErrorInfo: ErrorInformation = {
  name: false,
  email: false,
  phone: false,
  total: false,
};
