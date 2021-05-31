import React from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import { IShelterDog, IShelterDogWithPicture } from "../../dog/dogInterfaces";
import {
  CheckBoxOutlineBlank,
  CheckBoxTwoTone,
  Delete,
} from "@material-ui/icons";
import { useCookies } from "react-cookie";
import { Checkbox } from "@material-ui/core";

export default function ShelterDogGrid(props: any) {
  const dogs = props.dogs as IShelterDogWithPicture[]; // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();
  return (
    <GridList
      cols={3}
      spacing={2}
      style={{ margin: "0", width: "100%", display: "flex" }}
    >
      {dogs.map(
        (dog: IShelterDogWithPicture) =>
          dog.picture && (
            <GridListTile
              key={dog.id}
              style={{ height: "300px" }}
              className="tile"
            >
              <img
                src={`data:${dog.picture.fileType};base64,${
                  dog.picture.data as ArrayBuffer
                }`}
                alt={dog.picture.fileName}
              />
              <GridListTileBar
                className={dog.name}
                title={dog.name}
                subtitle={<span>{dog.breed}</span>}
                actionIcon={
                  <IconButton
                    aria-label={`info about ${dog.name}`}
                    style={{ color: "rgba(255, 255, 255, 0.54)" }}
                  >
                    <Checkbox />
                  </IconButton>
                }
              />
            </GridListTile>
          )
      )}
      {dogs.length <= 2 &&
        dogs.length > 0 &&
        dogs.map(
          (dog: IShelterDogWithPicture) =>
            dog.picture &&
            dog == dogs[0] && (
              <GridListTile
                key={dog.name + "dog.id1"}
                style={{ height: "300px" }}
                className="tile"
              >
                <img
                  style={{ visibility: "hidden", height: "300px" }}
                  src={`data:${dog.picture.fileType};base64,${
                    dog.picture.data as ArrayBuffer
                  }`}
                />
              </GridListTile>
            )
        )}
      {dogs.length == 1 &&
        dogs.map(
          (dog: IShelterDogWithPicture) =>
            dog.picture &&
            dog == dogs[0] && (
              <GridListTile
                key={dog.name + "dog.id2"}
                style={{ height: "300px" }}
                className="tile"
              >
                <img
                  style={{ visibility: "hidden", height: "300px" }}
                  src={`data:${dog.picture.fileType};base64,${
                    dog.picture.data as ArrayBuffer
                  }`}
                />
              </GridListTile>
            )
        )}
    </GridList>
  );
}
