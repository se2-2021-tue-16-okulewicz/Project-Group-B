export interface IContactInfo {
  name: string;
  email: string;
  phoneNumber: string;
}

export interface ErrorInfos {
  [name: string]: boolean;
  total: boolean;
}
export const initErrorInfo: ErrorInfos = {
  name: false,
  email: false,
  phone: false,
  total: false,
};
