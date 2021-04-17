import React, { useState } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { ILostDogWithPicture } from "../dog/dogInterfaces";
import { useHistory } from "react-router";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import EditDogDetails from "../editDogDetails/editDogDetails";
import DogDetails from "../dogDetails/dogDetails";

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
  const id = props.id; // ? props.id as Number : -1;
  const [dogId, setDogId] = useState(0);
  //const [cookies, setCookie, removeCookie] = useCookies();
  //const dogs = props.dogs.filter((x:ILostDogWithPicture)=>x.ownerId===cookies[config.cookies.userId]);
  const history = useHistory();
  const redirectToDetails = (ids: Number) => {
    //setDogId(ids);
  };
  //id == -1 && dog.isFound==false|| dog.ownerId == id
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <GridList cols={3} spacing={3}>
          {dogs.map(
            (dog: ILostDogWithPicture) =>
              (true) && (
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
                        {dog.isFound ? "Found" : "Lost in " + dog.location.city+" by "+ dog.ownerId}
                      </span>
                    }
                    actionIcon={
                      <IconButton
                        aria-label={`info about ${dog.name}`}
                        className={classes.icon}
                        onClick={() => {
                          //redirectToDetails(dog.id);
                          setDogId(dog.id);
                          history.push(`${props.path}/dog/${dog.id}`);
                        }}
                      >
                        <InfoIcon />
                      </IconButton>
                    }
                  />
                </GridListTile>
              )
          )}
        </GridList>
      </Route>
      <Route
        path={`${path}/dog/:id`}
        children={<EditDogDetails cookies={props.cookies} dogId={dogId} />}
      />
      <Route
        path={`${path}/dog/:id`}
        children={<DogDetails cookies={props.cookies} dogId={dogId} />}
      />
    </Switch>
  );
}
