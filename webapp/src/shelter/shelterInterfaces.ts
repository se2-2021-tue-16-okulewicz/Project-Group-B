export interface IShelter {
  id: number;
  address: IAddress;
  name: string;
  email: string;
  phoneNumber: string;
}

export interface IAddress {
  city: string;
  street: string;
  postCode: string;
  buildingNumber: number;
  additionalAddressLine?: string;
}
