import "date-fns";
import { BehaviorsTypes, ColorTypes, EarsTypes, HairTypes, SizeTypes, SpecialMarkTypes, TailTypes } from "./dogEnums";

export interface IPicture {
    filename: string,
    filetype: string,
    data: Uint8Array
}

export interface IDogState {
    name: string;
    breed: string;
    age: number;
    hair: string;
    color: string;
    size: string;
    ears: string;
    tail: string;
    specialMark: string;
    behavior: string[];
    location: { city: string; district: string };
    //picture: { filename: string; filetype: string; data: [] };
  }
  
  export interface ILostDogState extends IDogState {
    lostDate: Date | null;
    //picture: { filename: string; filetype: string; data: Uint8Array };
  }
  //const [dog, setDog] = useState<IDogState|undefined>(undefined)
  
  export interface IDogProps {
    name?: string;
    breed?: string;
    age?: number;
    hair?: string;
    color?: string;
    size?: string;
    ears?: string;
    tail?: string;
    specialMark?: string;
    behavior?: string[];
    location?: { city?: string; district?: string };
    //picture?: { filename?: string; filetype?: string; data?: [] };
  }

  export interface ILostDogProps extends IDogProps {
    lostDate: Date | null;
    picture?: { filename?: string; filetype?: string; data?: Uint8Array };
  }