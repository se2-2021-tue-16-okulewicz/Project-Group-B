import React from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import { Delete } from "@material-ui/icons";
import { useCookies } from "react-cookie";
import { IShelter } from "../shelter/shelterInterfaces";
import { Card, CardActionArea, CardContent, Typography } from "@material-ui/core";

export default function SheltersGrid(props: any) {
  const shelters = props.shelters as IShelter[]; // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();
  return (
    <GridList
      cols={3}
      spacing={2}
      style={{ margin: "0", width: "100%", display: "flex" }}
    >
      {shelters.map(
        (shelter: IShelter) =>
          shelter.id && (
            <Card
              key={shelter.id}
              style={{ height: "300px" }}
              className="tile"
            >
              <CardContent className={shelter.name} >
                <Typography variant="h5" component="h2">
                  {shelter.name}
                </Typography>
                <Typography variant="h5" component="h2">
                  <span>{shelter.address.city+", "+shelter.address.street+" " +shelter.address.buildingNumber}</span>
                </Typography>
              </CardContent>
                <IconButton
                    aria-label={`info about ${shelter.name}`}
                    style={{ color: "rgba(255, 255, 255, 0.54)" }}
                  >
                    <Delete />
                  </IconButton>
            </Card>
          )
      )}
      {shelters.length <= 2 &&
        shelters.length > 0 &&
        shelters.map(
          (shelter: IShelter) =>
          shelter.id && (
              <GridListTile
                key={"shelter.id1"}
                style={{ height: "300px" }}
                className="tile"
              >
              </GridListTile>
            )
        )}
      {shelters.length == 1 &&
        shelters.map(
          (shelter: IShelter) =>
          shelter.id && (
              <GridListTile
                key={"shelter.id2"}
                style={{ height: "300px" }}
                className="tile"
              >
              </GridListTile>
            )
        )}
    </GridList>
  );
}
