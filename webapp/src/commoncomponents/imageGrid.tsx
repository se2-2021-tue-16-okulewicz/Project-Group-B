import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { ILostDogWithPicture } from "../dog/dogInterfaces";
import { useHistory } from "react-router";

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
  const dogs = props.dogs as ILostDogWithPicture[];
  const id = props.id ? props.id as Number : -1;
  console.log(id);
  //const [cookies, setCookie, removeCookie] = useCookies();
  //const dogs = props.dogs.filter((x:ILostDogWithPicture)=>x.ownerId===cookies[config.cookies.userId]);
  const history = useHistory();
  const redirectToDetails = (id: Number) => {
    history.push(`/listDogs/lostdog/${id}`);
  };

  return (
    <GridList cols={3} spacing={3}>
      {dogs.map((dog: ILostDogWithPicture) => (( (id ==-1 || dog.ownerId==id) &&
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
            subtitle={<span>lost in {dog.location.city} by {dog.ownerId}</span>}
            actionIcon={
              <IconButton
                aria-label={`info about ${dog.name}`}
                className={classes.icon}
                onClick={() => {
                  redirectToDetails(dog.id);
                }}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </GridListTile>)
      ))}
    </GridList>
  );
}
