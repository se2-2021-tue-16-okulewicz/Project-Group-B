import { ILostDog, ILostDogWithPicture, IPicture } from "./dogInterfaces";

export const initPicture: IPicture = {
  id: 0,
  fileName: "",
  fileType: "",
  data: new ArrayBuffer(8),
};

export const initLostDogProps: ILostDog = {
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
  specialMarks: "",
  behaviors: [],
  location: { city: "", district: "" },
  dateLost: new Date(2012, 1, 1, 0, 0, 0, 0),
  isFound: false,
};

export const initLostDogWithPictureProps: ILostDogWithPicture = {
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
  specialMarks: "",
  behaviors: [],
  location: { city: "", district: "" },
  dateLost: new Date(2012, 1, 1, 0, 0, 0, 0),
  isFound: false,
  picture: initPicture,
};
