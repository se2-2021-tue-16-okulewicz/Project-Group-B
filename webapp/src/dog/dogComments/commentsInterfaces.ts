import { IPicture } from "../dogInterfaces";

export interface IComment  {
  picture?: IPicture;
  authorId: number;
  dogId: number;
  text: string;
  location: { city: string; district: string };
}
export interface ICommentWithId extends IComment {
  id: number;
  author: IAuthor;
  picture?: IPicture;
  authorId: number;
  dogId: number;
  text: string;
  location: { city: string; district: string };
}
export interface IAuthor extends IContactInfo {
  id:number;
}
