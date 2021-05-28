import { IAddress, IShelter } from "./shelterInterfaces";

export const initAddress: IAddress = {
  city: "",
  street: "",
  postCode: "05-077",
  buildingNumber: 0,
  additionalAddressLine: ""
 };

export const exampleAddress: IAddress = {
 city: "Warsaw",
 street: "Polna",
 postCode: "05-077",
 buildingNumber: 12,
 additionalAddressLine: "line"
};

export const initShelter: IShelter = {
  id: 0,
  address:initAddress,
  name: "",
  email: "",
  phoneNumber: "",
};

export const exampleShelter: IShelter = {
  id: 1,
  address: exampleAddress,
  name: "The Best Shelter",
  email: "a@a.a", 
  phoneNumber: "123456789"
};

export const testDogList = [initShelter, exampleShelter];
