import "date-fns";
import React, { } from "react";
import { ColorTypes, HairTypes, SizeTypes, TailTypes, EarsTypes, SpecialMarkTypes, BehavioursTypes } from "./dogEnums";
import { IDogProps, IDogState, ILostDogProps, ILostDogState } from "./dogInterfaces";




export const defaultProps = {
  name: "",
  age: 0,
  hair: HairTypes[0],
  color: ColorTypes[0],
  size: SizeTypes[0],
  ears: EarsTypes[0],
  tail: TailTypes[0],
  specialMark: SpecialMarkTypes[0],
  behaviour: [BehavioursTypes[0], BehavioursTypes[1]],
  location: { city: "", district: "" },
  lostDate: new Date(),
  picture: { filename: "", filetype: "", data: [] },
};

export class Dog extends React.Component<
  Partial<IDogProps>,
  Partial<IDogState>> {
  constructor(props: IDogProps) {
    super(props);
    this.state = {
      name: "",
      age: 0,
      hair: "",
      color: "",
      size: "",
      ears: "",
      tail: "",
      specialMark: "",
      behaviour: [],
      location: { city: "", district: "" },
      //picture: { filename: "", filetype: "", data: [] },
    };
    this.handleChange = this.handleChange.bind(this);
  }

  //location: { city, district },
  //
  /*componentDidUpdate(prevProps: { userID: any; }) {
        // Typical usage (don't forget to compare props):
        if (this.props.userID !== prevProps.userID) {
          this.fetchData(this.props.userID);
        }
      }*/

  handleChange = (e: { persist: () => void; target: { name: any; value: any }; }) => {
    //e.persist();
    var el = e.target.name;

    this.setState((state) => ({ ...state, el: e.target.value }));
    console.log(this.state.name);
    console.log([e.target.name]);
  };
}

export class LostDog extends React.Component<Partial<ILostDogProps>, Partial<ILostDogState>> {
  constructor(props: ILostDogProps) {
    super(props);
    this.state = {
      lostDate: new Date(),
    };
  }
  handleChange = (e: { persist: () => void; target: { name: any; value: any }; }) => {
    //e.persist();
    var el = e.target.name;
    this.setState((state) => ({ ...state, el: e.target.value }));
    console.log(this.state.name);
    console.log([e.target.name]);
  };
  
}

export class Picture extends React.Component{
  public state={
    filename: "",
    filetype: "",
    data: []
  }
}


export class FoundDog extends Dog { }
