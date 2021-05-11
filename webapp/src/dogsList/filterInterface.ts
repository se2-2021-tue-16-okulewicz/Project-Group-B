import {
  BreedTypes,
  BehaviorsTypes,
  ColorTypes,
  EarsTypes,
  HairTypes,
  SizeTypes,
  SpecialMarkTypes,
  TailTypes,
} from "../dog/dogEnums";

export interface Filter {
  page: number;
  size: number;
  filter:{
  name?: string;
  breed?: BreedTypes | "";
  age?: number;
  hairLength?: HairTypes | "";
  color?: ColorTypes | "";
  size?: SizeTypes | "";
  earsType?: EarsTypes | "";
  tailLength?: TailTypes | "";
  specialMark?: SpecialMarkTypes | "";
  behaviors?: BehaviorsTypes[];
  location?: { city?: string; district?: string };}
}
