import React from "react";
import DogsList from "../components/dogs/DogsList";
import DogsStack from "./DogsStack";

export default class DogsScreen extends React.Component {
  render() {
    return <DogsStack></DogsStack>;
    // return <DogsList></DogsList>;
  }
}
