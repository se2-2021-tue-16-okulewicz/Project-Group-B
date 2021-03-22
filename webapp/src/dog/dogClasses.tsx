import "date-fns";
import {
  IDog,
  ILostDog,
} from "./dogInterfaces";

export const initPicture = {
  id: 0,
  fileName: "",
  fileType: "",
  data: new Uint8Array(),
};

export const initLostDogProps : ILostDog = {
  id: 0,
  ownerId: 0,
  pictureId: 0,
  name: "",
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
  lostDate: new Date(),
  isFound: false,
};