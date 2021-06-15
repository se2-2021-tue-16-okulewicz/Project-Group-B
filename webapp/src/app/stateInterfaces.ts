import { IContactInfo } from "../contactInfo/contactInfoInterface";
import { ICommentWithIdAndAuthor } from "../dog/dogComments/commentsInterfaces";
import {
  ILostDogWithPicture,
  ILostDogWithPictureAndComments,
  IShelterDog,
  IShelterDogWithPicture,
} from "../dog/dogInterfaces";
import { ILoginResults } from "../registerLogin/LoginRegisterInterface";
import { IShelter } from "../shelter/shelterInterfaces";

export type Error = {
  hasError: boolean;
  errorCode: number;
  erorMessage: string;
};

export type State = {
  dogs: ILostDogWithPicture[] | any; 
  comments: ICommentWithIdAndAuthor[] | any;
  shelterdogs: IShelterDog[] | any;
  shelter: IShelter | any;
  shelters: IShelter[] | any;
  editedDog: ILostDogWithPictureAndComments | any; //
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
  comments: [],
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
