import {
  BehaviorsTypes,
  BreedTypes,
  ColorTypes,
  EarsTypes,
  HairTypes,
  SizeTypes,
  SpecialMarkTypes,
  TailTypes,
} from "./dogEnums";
import {
  IDogCharacteristics,
  IDogDetails,
  ILostDog,
  IPicture,
  Picture,
  ILostDogWithPictureAndComments,
} from "./dogInterfaces";

export const initPicture: IPicture = {
  id: 0,
  fileName: "",
  fileType: "",
  data: new ArrayBuffer(8),
  //data: ""
};

export const genericPicture: IPicture = {
  id: 0,
  fileName: "upload.jpg",
  fileType: "image/jpg",
  data: new ArrayBuffer(8),
  //data: ""
};

export const initPic: Picture = {
  id: 0,
  fileName: "",
  fileType: "",
  data: "",
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
  dateLost: "",
  isFound: false,
};

export const initILostDogWithPictureAndComments: ILostDogWithPictureAndComments =
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
    dateLost: "",
    isFound: false,
    picture: { id: 0, fileName: "", fileType: "", data: "" },
    comments: [],
  };

export const initLostDogCharacteristics: IDogCharacteristics = {
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
};
export const genericCharacteristics: IDogCharacteristics = {
  name: "Amigo",
  breed: "Labrador",
  age: 0,
  hairLength: "Medium",
  color: "Cream",
  size: "Medium",
  earsType: "Hanging",
  tailLength: "Long",
  specialMark: "None",
  behaviors: ["Energetic", "Friendly"],
};

export const initDogDetails: IDogDetails = {
  dateLost: new Date().toISOString(),
  location: { city: "", district: "" },
};

export const genericDogDetails: IDogDetails = {
  dateLost: new Date().toISOString(),
  location: { city: "Warsaw", district: "Mokotow" },
};
