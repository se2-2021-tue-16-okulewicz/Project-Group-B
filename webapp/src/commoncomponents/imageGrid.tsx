import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
    icon: {
      color: "rgba(255, 255, 255, 0.54)",
    },
  })
);

export default function ImageGrid(props: any) {
  const classes = useStyles();
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
    <GridList cols={3} spacing={3}>
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
                className={classes.icon}
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
