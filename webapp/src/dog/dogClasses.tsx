import "date-fns";
import React, { } from "react";
import { ColorTypes, HairTypes, SizeTypes, TailTypes, EarsTypes, SpecialMarkTypes, BehaviorsTypes, BreedTypes } from "./dogEnums";
import { IDogProps, IDogState, ILostDogProps, ILostDogState } from "./dogInterfaces";


export const initPicture ={
  filename: '',
  filetype: '',
  data: new Uint8Array()
}

export const initLostDogProps = {
  name: '',
  breed:'',
  age: 0,
  hair: '',
  color: '',
  size: '',
  ears: '',
  tail: '',
  specialMark: '',
  behavior: [],
  location: { city: "", district: "" },
  lostDate: new Date(),
  //picture: { filename: "", filetype: "", data: new Uint8Array() },
};


export const defaultProps = {
  name: "",
  breed:BreedTypes[0],
  age: 0,
  hair: HairTypes[0],
  color: ColorTypes[0],
  size: SizeTypes[0],
  ears: EarsTypes[0],
  tail: TailTypes[0],
  specialMark: SpecialMarkTypes[0],
  behavior: [BehaviorsTypes[0], BehaviorsTypes[1]],
  location: { city: "", district: "" },
};

export class Dog extends React.Component<IDogProps,IDogState> {
  constructor(props: IDogProps) {
    super(props);
    this.state = {
      name: "",
      breed:"",
      age: 0,
      hair: "",
      color: "",
      size: "",
      ears: "",
      tail: "",
      specialMark: "",
      behavior: [],
      location: { city: "", district: "" },
      //picture: { filename: "", filetype: "", data: [] },
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e: { persist: () => void; target: { name: any; value: any }; }) => {
    //e.persist();
    var el = e.target.name;

    this.setState((state) => ({ ...state, el: e.target.value }));
    console.log(this.state.name);
    console.log([e.target.name]);
  };
  render(){
    return (null);
  }

  /*handleChange = (index:number, value ) => {
    //e.persist();
    var el = e.target.name;

    this.setState((state) => ({ ...state, el: e.target.value }));
    console.log(this.state.name);
    console.log([e.target.name]);
  };*/
}

export class LostDog extends React.Component<ILostDogProps,ILostDogState> {
  constructor(props: ILostDogProps) {
    super(props);
    this.state = {
      name: "",
      breed:"",
      age: 0,
      hair: "",
      color: "",
      size: "",
      ears: "",
      tail: "",
      specialMark: "",
      behavior: [],
      location: { city: "", district: "" },
      lostDate: new Date(),
    };
    
     
  }
  componentDidMount(){
    this.setState(defaultProps);
  }

  handleChange = (e: { persist: () => void; target: { name?: any; value: any }; }) => {
    e.persist();
    var el = e.target.name;
    this.setState((state)=>({ ...state, hair: e.target.value }));
    console.log(this.state);
    console.log([e.target.name]);
  };
  render(){
    return (null);
  }
  
}

export class FoundDog extends Dog { }
