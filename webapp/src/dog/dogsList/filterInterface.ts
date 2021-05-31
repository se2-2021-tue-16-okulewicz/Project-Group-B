import {
  BreedTypes,
  ColorTypes,
  SizeTypes,
} from "../dogEnums";

export interface IFilterSort {
  page?: number;
  size?: number;
  sort?: string;
  filter?: filterTypes;
}

export interface IFilterSorts {
  page?: number;
  size?: number;
  sort?: string;
  filter?: {
    ["ownerId"]: number;
  };
}

type filterTypes = {
  ownerId?: number;
  name?: string;
  breed?: BreedTypes | "";
  ageFrom?: number;
  ageTo?: number;
  color?: ColorTypes | "";
  size?: SizeTypes | "";
  dateLostAfter?: Date | null;
  dateLostBefore?: Date | null;
  location_city?: string;
  location_district?: string; //{ city?: string; district?: string };
  isFound?: boolean;
};

export const initFilterProps: IFilterSort = {
  sort: "dateLost, DESC",
  filter: {
    name: "",
    breed: "",
    color: "",
    size: "",
    location_city: "",
    location_district: "",
    dateLostAfter: null,
    dateLostBefore: null,
    isFound: false,
  },
};
