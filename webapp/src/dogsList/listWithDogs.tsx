import "date-fns";
import React from "react";
import {
  Button,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    registerButton: {
      display: "flex",
      marginTop: "50vh"
    },
    cardContent: {
      justifyContent: "center",
      display: "flex",
      alignItems: "center",
      color: "aliceblue",
      backgroundColor: "aliceblue",
    },
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      maxHeight: 300,
    },
    listSection: {
      backgroundColor: 'inherit',
    },
    ul: {
      backgroundColor: 'inherit',
      padding: 0,
    },
    Card:{
      minWidth:"30px",
      minHeight:"40px"
    },
    main: {
      justifyContent: "center",
      display: "flex",
      alignItems: "center",
      marginTop:"2vh"
    },
  }
  )
);

export default function ListWithDogs() {
  const history = useHistory();
  const [cookies, setCookie, removeCookie] = useCookies();

  const onRegisterClicked = () => {
    history.push("/addDog");
  }
  const classes = useStyles();
  // const onSavePostClicked = () => {
  //   try {
  //     registerDog(lostDogFields, picture);
  //   } catch (err) {
  //     console.error("Failed to save the dog: ", err);
  //   }
  // };

  // const onRegisterClick = () => {
  //   setLostDogFields(initLostDogProps);
  //   sessionStorage.setItem("inputField", JSON.stringify(initLostDogProps));
  //   sessionStorage.setItem("enable", "false");
  //   setRegisterEnabled(false);
  // };

  // function registerDog(dog: ILostDog, picture: IPicture) {
  //   store.dispatch(
  //     Actions.addDogThunk({
  //       dog: dog,
  //       picture: picture,
  //       cookies: cookies,
  //     })
  //   );
  // }

  // const handlePicturesChange = (event: any) => {
  //   if (event) {
  //     (event as File).arrayBuffer().then((fileBuffer) => {
  //       setPicture({
  //         id: 0,
  //         fileName: event.name, //event.name,
  //         fileType: event.type,
  //         data: fileBuffer,
  //       } as IPicture);
  //     });
  //   }
  // };

  return (
    <div className={classes.main}>
      <Button
        className={classes.registerButton}
        data-testid="registerButton"
        color="primary"
        variant="contained"
        size="large"
        onClick={onRegisterClicked}
      >
        Register a Dog
      </Button>
      {/*<List className={classes.root}>
        {[0, 1, 2, 3, 4].map((sectionId) => (
          <li key={`section-${sectionId}`} className={classes.listSection}>
            <ul className={classes.ul}>
              {[0, 1, 2].map((item) => (
                <Card className={classes.Card}>
                  <CardHeader>
                    Item nr 
                  </CardHeader>
                </Card>
              ))}
            </ul>
          </li>
        ))}
              </List>*/}
    </div>
  );
}

