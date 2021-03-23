import "date-fns";
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
  specialMarks: SpecialMarkTypes | "";
  behaviors: BehaviorsTypes[];
  location: { city: string; district: string };
}

export interface ILostDog extends IDog {
  dateLost: Date | null;
  isFound: boolean;
  ownerId: number;
}

export interface ILostDogWithPicture extends ILostDog {
  picture: IPicture;
}
