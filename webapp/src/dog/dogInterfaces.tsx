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
  filename: string;
  filetype: string;
  data: Uint8Array;
}

export interface IDog {
  name: string;
  breed: BreedTypes | "";
  age: number;
  hair: HairTypes | "";
  color: ColorTypes | "";
  size: SizeTypes | "";
  ears: EarsTypes | "";
  tail: TailTypes | "";
  specialMark: SpecialMarkTypes | "";
  behavior: BehaviorsTypes[];
  location: { city: string; district: string };
}

export interface ILostDog extends IDog {
  lostDate: Date | null;
  isFound: boolean;
  //picture: { filename: string; filetype: string; data: Uint8Array };
}
