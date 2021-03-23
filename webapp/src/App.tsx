import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import RegisterDogForm from "./registerDog/registerDog";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      justifyContent:"center", 
      display:"flex", 
      alignItems:"center",
      minHeight: "100vh"
    },
  })
);

//style={{margin:"1em", justifyContent:"center", display:"flex", alignItems:"center", minHeight: "100vh"}}
function App() {
  const classes = useStyles();
  return (
    <div className={classes.mainContainer}>
      <RegisterDogForm />
    </div>
  );
}

export default App;
