import { IShelter } from "./shelterInterfaces";

export const initShelter: IShelter = {
  id: 0,
  country: "",
  house_number: 0,
  street: "",
  town: "",
  name: "",
  email: "",
  phoneNumber: "",
};

export const exampleShelter: IShelter = {
  id: 1,
  country: "Poland",
  house_number: 1,
  street: "Polna",
  town: "Warsaw",
  name: "The Best Shelter",
  email: "a@a.a", 
  phoneNumber: "123456789"
};

export const testDogList = [initShelter, exampleShelter];
