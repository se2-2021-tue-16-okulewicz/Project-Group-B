import React from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { ILostDogWithPicture } from "../dog/dogInterfaces";
import { Edit } from "@material-ui/icons";
import { store } from "../app/store";
import { fetchOneDogThunk } from "../app/actions";
import { useCookies } from "react-cookie";
import Footer from "../utilityComponents/Footer";

export default function ImageGrid(props: any) {
  const dogs = props.dogs as ILostDogWithPicture[]; // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();
  const redirectToDogDetailsOrEdit = (id: number) => {
    store.dispatch(
      fetchOneDogThunk({
        id: id as number,
        cookies: cookies,
      })
    );
    props.redirectToDogDetailsOrEdit(id);
  };

  return (
    <GridList cols={3} spacing={8} style={{margin:"5"}}>
      {dogs.map((dog: ILostDogWithPicture) => (
        <GridListTile
          key={dog.id}
          style={{ minHeight: "300px" }}
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
            subtitle={
              <span>
                {dog.isFound ? "Found" : "Lost in " + dog.location.city}
              </span>
            }
            actionIcon={
              <IconButton
                aria-label={`info about ${dog.name}`}
                style={{ color: "rgba(255, 255, 255, 0.54)" }}
                onClick={() => {
                  redirectToDogDetailsOrEdit(dog.id as number);
                }}
              >
                {props.path === "/listDogs" ? <InfoIcon /> : <Edit />}
              </IconButton>
            }
          />
        </GridListTile>
      ))}   
    </GridList>
  );
}
