import {
  BreedTypes,
  BehaviorsTypes,
  ColorTypes,
  EarsTypes,
  HairTypes,
  SizeTypes,
  SpecialMarkTypes,
  TailTypes,
} from "./dogEnums";

export interface IPicture {
  id: number;
  fileName: string;
  fileType: string;
  data: ArrayBuffer;
  //data: string;
}

export interface ILostDogComment {
  id: number;
  //location: number;
  pictureId: number;
  authorId: number;
  dogId: number;
  text: string;
}

export interface ICommentAuthor {
  name: string;
  email: string;
  phoneNumber: string;
  id: number;
}

export interface ICommentWithAuthorAndPicture extends ILostDogComment {
  author: ICommentAuthor;
  picture: IPicture;
}

export interface Picture {
  id: number;
  fileName: string;
  fileType: string;
  data: string;
}

export interface IDog {
  id: number;
  name: string;
  breed: BreedTypes | "";
  age: number;
  pictureId: number;
  hairLength: HairTypes | "";
  color: ColorTypes | "";
  size: SizeTypes | "";
  earsType: EarsTypes | "";
  tailLength: TailTypes | "";
  specialMark: SpecialMarkTypes | "";
  behaviors: BehaviorsTypes[];
  location: { city: string; district: string };
}

export interface ILostDog extends IDog {
  dateLost: string | null;
  isFound: boolean;
  ownerId: number;
}

export interface IImage {
  id: number;
  fileName: string;
  fileType: string;
  uri: string;
}

export interface ILostDogWithPicture extends ILostDog {
  picture: IPicture;
}

export interface ILostDogWithPictureAndComments extends ILostDogWithPicture {
  comments: ICommentWithAuthorAndPicture[];
}

export interface IDogCharacteristics {
  name: string;
  breed: BreedTypes | "";
  age: number;
  hairLength: HairTypes | "";
  color: ColorTypes | "";
  size: SizeTypes | "";
  earsType: EarsTypes | "";
  tailLength: TailTypes | "";
  specialMark: SpecialMarkTypes | "";
  behaviors: BehaviorsTypes[];
}

export interface IDogDetails {
  dateLost: string;
  location: { city: string; district: string };
}
