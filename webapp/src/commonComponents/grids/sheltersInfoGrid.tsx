import React from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import { useCookies } from "react-cookie";
import { IShelter } from "../../shelter/shelterInterfaces";
import { Box, CardContent, Checkbox, Divider, Grid, Typography } from "@material-ui/core";

export default function SheltersInfoGrid(props: any) {
  const shelters = props.shelters as IShelter[]; // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();
  const redirectToShelter = (id: number) => {
    props.redirectToShelter(id);
  };
  return (
    <GridList
      cols={3}
      spacing={20}
      style={{ margin: "0", width: "100%", display: "flex" }}
    >
      {shelters.map(
        (shelter: IShelter) =>
          shelter.id &&(
            <GridListTile
              key={shelter.id}
              style={{ height: "300px", display: "stretch", }}
              className="tile"

            >
              <Grid direction="row" style={{ height: "300px", display: "stretch",  borderLeft:"solid",
                  borderRight:"solid",
                  borderTop:"solid",
                  borderColor:"slategray", }} container>{props.path  !== "" ?<Grid item xs={4} style={{  marginTop:"6%",marginBottom:"6%",}}>
                  <img src={`https://upload.wikimedia.org/wikipedia/commons/a/ae/The_Doghouse.png`} alt="" style={{width:"100%", height:"auto", marginTop:"20%", marginBottom:"20%", marginLeft:"3%"}}/></Grid>:""}
             <Grid item xs={8} style={{ marginTop:"6%",marginBottom:"6%",}}>
              <Box
                className={shelter.name}
                style={{
                  overflow: "hidden",
                  height: "90%",
                }}
              >

                <Typography
                  align="center"
                  style={{
                    fontSize: "2vw",
                    height: "inherit",
                    width: "auto",
                    wordWrap: "break-word",
                    color: "black",
                    verticalAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent:"left"
                  }}
                >            
                <Divider
                style={{ display:"none", marginBottom:"2%", marginTop:"2%"}}
              />
                    {shelters  !== null && shelter.address  !== null ? (
                      
              <span>
                
                {shelter.address.street +
                  " " +
                  shelter.address.buildingNumber +
                  ", " +
                  shelter.address.postCode +
                  " " +
                  shelter.address.city}
              </span>
            ) : (
              ""
            )}
          <Divider
                style={{ display:"none", marginBottom:"2%", marginTop:"2%"}}
              />
            {shelters  !== null ? <span>{shelter.email}</span> : ""}
            <Divider
                style={{ display:"none", marginBottom:"2%", marginTop:"2%"}}
              />
            {shelters  !== null ? (
              <span>
                {shelter.phoneNumber.substr(0, 3) +
                  " " +
                  shelter.phoneNumber.substr(3, 3) +
                  " " +
                  shelter.phoneNumber.substr(6, 3)}
              </span>
            ) : (
              ""
            )}
                </Typography>
              </Box> </Grid></Grid>
              <GridListTileBar
                style={{ height: "20%", backgroundColor:"gray" }}
                className={shelter.name}
                title={ shelter.name}
                actionIcon={
                  <IconButton
                    onClick={() => {
                      redirectToShelter(shelter.id as number);
                    }}
                    aria-label={`info about ${shelter.name}`}
                    style={{ color: "rgba(255, 255, 255, 0.54)" }}
                  >
                    <Checkbox style={{color:"white"}}/>
                  </IconButton>
                }
              />
            </GridListTile>
          )
      )}
      {shelters.length <= 2 && shelters.length > 0 && (
        <GridListTile
          key={"shelter.id1"}
          style={{ height: "300px" }}
          className="tile"
        >
          {" "}
          <CardContent style={{ width: "400px" }} />
        </GridListTile>
      )}
      {shelters.length === 1 && (
        <GridListTile
          key={"shelter.id2"}
          style={{ height: "300px" }}
          className="tile"
        >
          <CardContent style={{ width: "400px" }} />
        </GridListTile>
      )}
    </GridList>
  );
}
