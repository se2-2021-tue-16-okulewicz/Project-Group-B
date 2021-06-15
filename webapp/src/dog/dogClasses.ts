import { ILostDog, ILostDogWithPicture, IPicture, IShelterDogWithPicture } from "./dogInterfaces";

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
  specialMark: "",
  behaviors: [],
  location: { city: "", district: "" },
  dateLost: new Date(2020, 1, 1, 0, 0, 0, 0),
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
  specialMark: "",
  behaviors: [],
  location: { city: "", district: "" },
  dateLost: new Date(2020, 1, 1, 0, 0, 0, 0),
  isFound: false,
  picture: initPicture,
};

// export default EditShelterDogDetails;
// function initShelterDogWithPictureProps<T>(initShelterDogWithPictureProps: any): [any, any] {
//   throw new Error("Function not implemented.");
// }

export const initShelterDogWithPictureProps: IShelterDogWithPicture = {
  id: 0,
  shelterId: 0,
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
  picture: initPicture,
};
