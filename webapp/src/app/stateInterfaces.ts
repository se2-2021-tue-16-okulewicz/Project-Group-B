import { IContactInfo } from "../contactInfo/contactInfoInterface";
import { ILostDogWithPicture, IShelterDog, IShelterDogWithPicture } from "../dog/dogInterfaces";
import { ILoginResults } from "../registerLogin/LoginRegisterInterface";
import { IShelter } from "../shelter/shelterInterfaces";

export type Error = {
  hasError: boolean;
  errorCode: number;
  erorMessage: string;
};

/*TODO: change any in the State*/

export type State = {
  dogs: ILostDogWithPicture[] | any; //if these are not any, the clear actions throw an error (only for dogs with pictures)
  shelterdogs: IShelterDog[] | any;
  shelter: IShelter | any;
  shelters: IShelter[] | any;
  editedDog: ILostDogWithPicture | any; //
  shelterDog: IShelterDogWithPicture | any;
  dogsLastPage: boolean | null;
  dogsRequireRefresh: boolean;
  settingsRequireRefresh: boolean;
  loading: boolean;
  error: Error;
  loginInformation: ILoginResults | null;
  contactInfo: IContactInfo | null;
  redirect: string | null;
  pages: number;
};

export const initState: State = {
  dogs: [],
  shelters: [],
  shelterdogs: [],
  editedDog: null,
  shelterDog: null,
  shelter: null,
  dogsLastPage: false,
  dogsRequireRefresh: true,
  settingsRequireRefresh: true,
  loading: false,
  error: {
    hasError: false,
    errorCode: 0,
    erorMessage: "",
  },
  loginInformation: null,
  contactInfo: null,
  redirect: null,
  pages: 0,
};
