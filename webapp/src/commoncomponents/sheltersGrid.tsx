import React from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import { Delete, Launch } from "@material-ui/icons";
import InfoIcon from "@material-ui/icons/Info";
import { useCookies } from "react-cookie";
import { IShelter } from "../shelter/shelterInterfaces";
import { Box, Card, CardActionArea, CardContent, Checkbox, Typography } from "@material-ui/core";
import { store } from "../app/store";

export default function SheltersGrid(props: any) {
  const shelters = props.shelters as IShelter[]; // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();
  const redirectToShelter = (id: number) => {
    /*store.dispatch(
      fetchOneShelter({
        id: id as number,
        cookies: cookies,
      })
    );*/
    props.redirectToShelter(id);
  };
  return (
    <GridList
      cols={3}
      spacing={2}
      style={{ margin: "0", width: "100%", display: "flex" }}
    >
      {shelters.map(
        (shelter: IShelter) =>
          shelter.id && (
            <GridListTile
            key={shelter.id}
            style={{ height: "300px",display:"stretch"}}
            className="tile"
            >
              <Box className={shelter.name} style={{ overflow: 'hidden', minWidth:"400px",backgroundColor:"white",  height:"90%", }}>
                <Typography align="center" style={{fontSize: "4em", height:"inherit", width:"auto",
                 fontFamily: "Bungee Shade", wordWrap: 'break-word' ,color:"slategray", verticalAlign:"center",  display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  {shelter.name}
                </Typography>
              </Box>
              <GridListTileBar 
                style={{height:"20%", backgroundColor:"slategray" }}
                className={shelter.name}
                title={<span>{shelter.address.city+", "+shelter.address.street+" " +shelter.address.buildingNumber}</span>}
                actionIcon={
                  <IconButton
                    onClick={() => {
                      redirectToShelter(shelter.id as number);
                    }}
                    aria-label={`info about ${shelter.name}`}
                    style={{ color: "rgba(255, 255, 255, 0.54)" }}
                  >
                    <Checkbox />
                  </IconButton>
                }
              />
                  </GridListTile>
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
              > <CardContent className={shelter.name} style={{width:"400px"}}/></GridListTile>
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
              ><CardContent className={shelter.name} style={{width:"400px"}}/></GridListTile>
            )
        )}
    </GridList>
  );
}
