import "date-fns";
import { BehavioursTypes, ColorTypes, EarsTypes, HairTypes, SizeTypes, SpecialMarkTypes, TailTypes } from "./dogEnums";


export interface IDogState {
    name: string;
    age: number;
    hair: HairTypes|"";
    color: ColorTypes|"";
    size: SizeTypes|"";
    ears: EarsTypes|"";
    tail: TailTypes|"";
    specialMark: SpecialMarkTypes|"";
    behaviour: BehavioursTypes[];
    location: { city: string; district: string };
    //picture: { filename: string; filetype: string; data: [] };
  }
  
  export interface ILostDogState extends IDogState {
    lostDate: Date | null;
  }
  //const [dog, setDog] = useState<IDogState|undefined>(undefined)
  
  export interface IDogProps {
    name?: string;
    age?: number;
    hair?: string;
    color?: string;
    size?: string;
    ears?: string;
    tail?: string;
    specialMark?: string;
    behaviour?: string[];
    location?: { city?: string; district?: string };
    //picture?: { filename?: string; filetype?: string; data?: [] };
  }

  export interface ILostDogProps extends IDogProps {
    lostDate: Date | null;
  }