import React from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { ILostDogWithPicture } from "../../dog/dogInterfaces";
import { Edit } from "@material-ui/icons";
import { store } from "../../app/store";
import { fetchOneDogThunk } from "../../app/actions";
import { useCookies } from "react-cookie";

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
    <GridList
      cols={3}
      spacing={2}
      style={{ margin: "0", width: "100%", display: "flex" }}
    >
      {dogs.map(
        (dog: ILostDogWithPicture) =>
          dog.picture && (
            <GridListTile
              key={dog.id}
              style={{ minHeight: "300px", display: "stretch" }}
              className="tile"
            >
              <img
                style={{ minHeight: "300px", display: "stretch" }}
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
                    {props.path === "/dogs" ? <InfoIcon /> : <Edit />}
                  </IconButton>
                }
              />
            </GridListTile>
          )
      )}
      {dogs.length <= 2 && dogs.length > 0 && dogs[0] && dogs[0].picture && (
        <GridListTile
          key={"dogid1"}
          style={{ height: "300px" }}
          className="tile"
        >
          <img
            style={{ visibility: "hidden", height: "300px" }}
            src={`data:${dogs[0].picture.fileType};base64,${
              dogs[0].picture.data as ArrayBuffer
            }`}
          />
        </GridListTile>
      )}
      {dogs.length == 1 && dogs[0] && dogs[0].picture && (
        <GridListTile
          key={"dogid2"}
          style={{ height: "300px" }}
          className="tile"
        >
          <img
            style={{ visibility: "hidden", height: "300px" }}
            src={`data:${dogs[0].picture.fileType};base64,${
              dogs[0].picture.data as ArrayBuffer
            }`}
          />
        </GridListTile>
      )}
    </GridList>
  );
}
