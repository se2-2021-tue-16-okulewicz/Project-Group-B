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
  data: ArrayBuffer | string;
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
}

export interface ILostDog extends IDog {
  dateLost: Date | null;
  isFound: boolean;
  ownerId: number;
  location: { city: string; district: string };
}

export interface ILostDogWithPicture extends ILostDog {
  picture: IPicture;
}

export interface IShelterDog extends IDog {
  picture: IPicture;
  shelterId: number;
}
