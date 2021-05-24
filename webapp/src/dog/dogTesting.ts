import { initLostDogWithPictureProps, initPicture } from "./dogClasses";
import { ILostDogWithPicture, IShelterDog, IShelterDogWithPicture } from "./dogInterfaces";

const otherDog: ILostDogWithPicture = {
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
  picture: initPicture,
};

export const testDogList = [initLostDogWithPictureProps, otherDog];
