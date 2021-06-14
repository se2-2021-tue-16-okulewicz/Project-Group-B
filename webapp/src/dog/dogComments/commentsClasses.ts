import { IPicture } from "../dogInterfaces";
import { ICommentWithId } from "./commentsInterfaces";

export const initPicture: IPicture = {
  id: 0,
  fileName: "",
  fileType: "",
  data: new ArrayBuffer(8),
};

export const initComment: ICommentWithIdAndAuthor = {
  id:0,
  author:
  picture: initPicture,
  authorId: 0,
  dogId: 0,
  text: "",
  location: { city: "", district: "" },
};
