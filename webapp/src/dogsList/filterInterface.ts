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

export interface IFilterSort {
  page?: number;
  size?: number;
  sort?: string;
  filter?:{
  ownerId?: number;
  name?: string;
  breed?: BreedTypes | "";
  age?: number;
  hairLength?: HairTypes | "";
  color?: ColorTypes | "";
  size?: SizeTypes | "";
  dateLostAfter?: Date | null;
  dateLostBefore?: Date | null;
  earsType?: EarsTypes | "";
  tailLength?: TailTypes | "";
  specialMark?: SpecialMarkTypes | "";
  behaviors?: BehaviorsTypes[];
  location?: { city?: string; district?: string };}
  isIsFound?: boolean;
}

export const initFilterProps: IFilterSort = {
  sort:"dateLost, DESC",
  filter:{
  name: "",
  breed: "",
  hairLength: "",
  color: "",
  size: "",
  earsType: "",
  tailLength: "",
  specialMark: "",
  behaviors: [],
  location: { city: "", district: "" },
  dateLostAfter: null,
  dateLostBefore: null,
  },
  isIsFound: false,
};
