import config from "../../config/config";
import { BreedTypes, ColorTypes, SizeTypes } from "../dogs/dog/dogEnums";

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
  filter: {};
}

export interface filterTypes {
  name: string;
  breed: BreedTypes | "";
  color: ColorTypes | "";
  size: SizeTypes | "";
  location_city: string;
  location_district: string; //{ city?: string; district?: string };
  isFound: boolean | null;
}

export const initFilterProps: IFilterSort = {
  page: config.defaultFilters.page,
  size: config.defaultFilters.size,
  sort: ",",
  filter: {
    name: "",
    breed: "",
    color: "",
    size: "",
    location_city: "",
    location_district: "",
    isFound: null,
  },
};

export interface TypeOfDogFilter {
  lost: boolean;
  found: boolean;
}

export const initTypeOfDogFilter: TypeOfDogFilter = {
  lost: true,
  found: true,
};

export interface IFilters {
  [name: string]: any;
}

export interface ISort {
  type: string;
  direction: string;
}

export const sortDirectionTypes = [
  { label: "Descending", value: "DESC" },
  { label: "Ascending", value: "ASC" },
];

export const sortTypes = [
  { label: "Date", value: "dateLost" },
  { label: "Name", value: "name" },
];
