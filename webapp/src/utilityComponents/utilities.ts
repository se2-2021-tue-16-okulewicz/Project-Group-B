import { isNull } from "lodash";
import { BreedTypes, ColorTypes, EarsTypes, HairTypes, SizeTypes, SpecialMarkTypes, TailTypes } from "../dog/dogEnums";
import { ILostDog, ILostDogWithPicture } from "../dog/dogInterfaces";

export interface IFiltersAndCookies {
  filters: IFilters;
  cookies: {
    [name: string]: any;
  };
}

export interface IFilters {
  [name: string]: any;
}

//fix enum types
export function ValidateFetchedDog(dog: ILostDogWithPicture|ILostDog) {
  dog.breed= ValidateSelectedFeatures(dog.breed);
  dog.breed = Object.values(BreedTypes).includes(dog.breed)?dog.breed:"";
  dog.specialMark= ValidateSelectedFeatures(dog.specialMark);
  dog.specialMark=Object.values(SpecialMarkTypes).includes(dog.specialMark as SpecialMarkTypes)?dog.specialMark:SpecialMarkTypes.None;
  dog.size= ValidateSelectedFeatures(dog.size);
  dog.size = Object.values(SizeTypes).includes(dog.size)?dog.size:"";
  dog.earsType= ValidateSelectedFeatures(dog.earsType);
  dog.earsType = Object.values(EarsTypes).includes(dog.earsType)?dog.earsType:"";
  dog.hairLength= ValidateSelectedFeatures(dog.hairLength);
  dog.hairLength = Object.values(HairTypes).includes(dog.hairLength)?dog.hairLength:"";
  dog.size= ValidateSelectedFeatures(dog.size);
  dog.size = Object.values(SizeTypes).includes(dog.size)?dog.size:"";
  dog.color= ValidateSelectedFeatures(dog.color);
  dog.color = Object.values(ColorTypes).includes(dog.color)?dog.color:"";
  dog.tailLength=ValidateSelectedFeatures(dog.tailLength);
  dog.tailLength = Object.values(TailTypes).includes(dog.tailLength)?dog.tailLength:"";
  return dog;
}

export function ValidateSelectedFeatures(item:any){
  return (item==null)?"": item.toString().trimEnd();
}