import "date-fns";
import {
  IDog,
  ILostDog,
} from "./dogInterfaces";

export const initPicture = {
  filename: "",
  filetype: "",
  data: new Uint8Array(),
};

export const initLostDogProps : ILostDog = {
  name: "",
  breed: "",
  age: 0,
  hair: "",
  color: "",
  size: "",
  ears: "",
  tail: "",
  specialMark: "",
  behavior: [],
  location: { city: "", district: "" },
  lostDate: new Date(),
  isFound: false,
};