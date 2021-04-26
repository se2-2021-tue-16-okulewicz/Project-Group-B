import React, { useState } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { ILostDogWithPicture } from "../dog/dogInterfaces";
import { useHistory } from "react-router";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import EditDogDetails from "../editDogDetails/editDogDetails";
import { store } from "../app/store";
import * as Actions from "../app/actions";
import { Edit } from "@material-ui/icons";
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
  const [dogId, setDogId] = useState(0);
  const history = useHistory();
  const redirectToDogDetailsOrEdit = (id: number) => {
    props.redirectToDogDetailsOrEdit(id);
  };
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
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
                       /*if (props.path === "/listDogs") {
                        history.push(`${props.path}/${dog.id}`);
                      } else {*/
                        setDogId(dog.id as number);
                        redirectToDogDetailsOrEdit(dog.id as number);
                        //history.push(`${props.path}/${props.edit}${dog.id}`);
                      //}
                    }}
                  >
                    {props.path === "/listDogs" ? <InfoIcon /> : <Edit />}
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </Route>
      <Route
        path={`${props.path}/edit/:id`}
        children={<EditDogDetails cookies={props.cookies} dogId={dogId} />}
      />
      <Route
        path={`${props.path}/:id`}
        children={<DogDetails cookies={props.cookies} dogId={dogId} />
        }
      />
    </Switch>
  );
}
