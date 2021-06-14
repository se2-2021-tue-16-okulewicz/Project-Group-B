import { initCommentandAuthor } from "./dogComments/commentsClasses";
import {
  ILostDog,
  ILostDogWithPicture,
  ILostDogWithPictureAndComments,
  IPicture,
} from "./dogInterfaces";

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

export const initLostDogWithPictureAndCommentsProps: ILostDogWithPictureAndComments =
  {
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
    comments: [initCommentandAuthor],
  };
