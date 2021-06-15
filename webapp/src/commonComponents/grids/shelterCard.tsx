import React from "react";
import { Grid } from "semantic-ui-react";
import doghouse from "./The_Doghouse.png";

export const ImageDisplay = (props: any) => {
  return(
  <Grid item xs={3} style={{ marginTop:"10%"}}>
              <img src={doghouse} /></Grid>
  );
}