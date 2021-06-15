import { IPicture } from "../dogInterfaces";
import {
  IAuthor,
  IComment,
  ICommentWithIdAndAuthor,
} from "./commentsInterfaces";

export const initPicture: IPicture = {
  id: 0,
  fileName: "",
  fileType: "",
  data: new ArrayBuffer(8),
};

export const initAuthor: IAuthor = {
  id: 0,
  name: "",
  phoneNumber: "",
  email: "alex@alex.com",
};

export const initComment: IComment = {
  authorId: 0,
  dogId: 0,
  text: "",
  location: { city: "", district: "" },
};

export const initCommentandAuthor: ICommentWithIdAndAuthor = {
  id: 0,
  author: initAuthor,
  picture: initPicture,
  authorId: 0,
  dogId: 0,
  text: "",
  location: { city: "", district: "" },
};
