import { initPicture } from "./dogClasses";
import {
  ILostDogWithPicture,
  IShelterDogWithPicture,
} from "./dogInterfaces";

export const otherDog: ILostDogWithPicture = {
  id: 1,
  ownerId: 0,
  pictureId: 0,
  name: "Alex",
  breed: "",
  age: 0,
  hairLength: "",
  color: "",
  size: "",
  earsType: "",
  tailLength: "",
  specialMark: "",
  behaviors: [],
  location: { city: "", district: "" },
  dateLost: new Date(2012, 1, 1, 0, 0, 0, 0),
  isFound: false,
  picture: initPicture,
};

export const sheltertestDog: IShelterDogWithPicture = {
  id: 1,
  shelterId: 0,
  pictureId: 0,
  name: "Alexa",
  breed: "",
  age: 0,
  hairLength: "",
  color: "",
  size: "",
  earsType: "",
  tailLength: "",
  specialMark: "",
  behaviors: [],
  picture: initPicture,
};

export const sheltertestDog2: IShelterDogWithPicture = {
  id: 2,
  shelterId: 0,
  pictureId: 0,
  name: "Alexa",
  breed: "",
  age: 0,
  hairLength: "",
  color: "",
  size: "",
  earsType: "",
  tailLength: "",
  specialMark: "",
  behaviors: [],
  picture: initPicture,
};

export const testLostDog: ILostDogWithPicture = {
  id: 2,
  ownerId:3,
  pictureId: 0,
  name: "Alexa",
  breed: "",
  age: 0,
  hairLength: "",
  color: "",
  size: "",
  earsType: "",
  tailLength: "",
  specialMark: "",
  behaviors: [],
  picture: initPicture,
  location: { city: "", district: "" },
  dateLost: new Date(2012, 1, 1, 0, 0, 0, 0),
  isFound: false,
};

export const testDogList = [sheltertestDog, sheltertestDog2];

export const testLostDogList = [testLostDog, otherDog];
