import "date-fns";
import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import {
  Button,
  Card,
  CardContent,
  Input,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Chip from "@material-ui/core/Chip";
import * as Actions from "../../app/actions";
import { store } from "../../app/store";
import { useCookies } from "react-cookie";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "../../app/stateInterfaces";
import { IShelterDogWithPicture } from "../../dog/dogInterfaces";
import { BehaviorsTypes } from "../../dog/dogEnums";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
    },
    cardContent: {
      justifyContent: "center",
      display: "flex",
      alignItems: "center",
      color: "aliceblue",
      backgroundColor: "aliceblue",
      width: "inherit",
    },
    imgFit: {
      maxHeight: "95vh",
      maxWidth: "30vw",
      minWidth: "300px",
      display: "flex",
      borderRadius: "10px",
      width: "auto",
    },
    mainForm: {
      marginLeft: "0.5%",
      marginRight: "0.5%",
      //marginTop: "0.009%",
    },
  })
);

export const AdoptDogDetails = (props: any) => {
  const history = useHistory();
  const location = useLocation(); // eslint-disable-next-line
  const { path } = useRouteMatch();
  const shelterId = props.shelterId
    ? props.shelterId
    : Number(location.pathname.split("/")[2]);
  const dogId = props.dogId
    ? props.dogId
    : Number(location.pathname.split("/")[4]);

  const dog = useSelector(
    (state: State) => state.shelterDog as IShelterDogWithPicture
  );

  const [pageRefresh, setPageRefresh] = useState(true);
  useEffect(() => {
    if (pageRefresh) {
      try {
        store.dispatch(
          Actions.fetchOneShelterDogThunk({
            shelterId: shelterId,
            id: dogId as number,
            cookies: cookies,
          })
        );
      } catch (err) {
        console.error("Failed to fetch the dog: ", err);
      } finally {
        setPageRefresh(false);
        store.dispatch(Actions.finishRefreshing);
      }
    } // eslint-disable-next-line
  }, [pageRefresh]);

  const classes = useStyles(); // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();

  const onShelterClicked = () => {
    history.push(`/shelter/${shelterId}`);
  };

  return (
    <Grid
      className={classes.mainForm}
      container
      spacing={9}
      alignContent="space-between"
    >
      {!pageRefresh && dog && (
        <Grid
          className="grid"
          container
          item
          sm={12}
          md={5}
          direction="column"
          alignContent="stretch"
        >
          <FormControl className={classes.formControl}>
            <InputLabel shrink id="name-label">
              Name
            </InputLabel>
            <TextField
              data-testid="name-input"
              id="name"
              name="name"
              value={dog.name}
              disabled={true}
              margin="normal"
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <Card className={classes.cardContent}>
              <CardContent className={classes.cardContent}>
                <img
                  className={classes.imgFit}
                  src={`data:${dog.picture.fileType};base64,${
                    dog.picture.data as ArrayBuffer
                  }`}
                  alt={dog.picture.fileName}
                />
              </CardContent>
            </Card>
          </FormControl>
        </Grid>
      )}{" "}
      {!pageRefresh && dog && (
        <Grid
          className="grid"
          container
          item
          sm={12}
          md={3}
          direction="column"
          alignContent="stretch"
        >
          <FormControl className={classes.formControl}>
            <InputLabel shrink id="age-label">
              Age
            </InputLabel>
            <TextField
              data-testid="age-input"
              type="number"
              id="age"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Years</InputAdornment>
                ),
              }}
              value={dog.age}
              disabled={true}
              margin="normal"
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel shrink id="color-label">
              Color
            </InputLabel>
            <TextField
              data-testid="color-select"
              id="color"
              name="color"
              value={dog.color}
              disabled={true}
              margin="normal"
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel shrink id="hair-label">
              Hair
            </InputLabel>
            <TextField
              data-testid="hair-select"
              id="hair"
              value={dog.hairLength}
              name="hairLength"
              disabled={true}
              margin="normal"
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel shrink id="size-label">
              Size
            </InputLabel>
            <TextField
              data-testid="size-select"
              id="size"
              name="size"
              value={dog.size}
              disabled={true}
              margin="normal"
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel shrink id="ears-label">
              Ears
            </InputLabel>
            <TextField
              data-testid="ears-select"
              id="ears"
              name="earsType"
              value={dog.earsType}
              disabled={true}
              margin="normal"
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel shrink id="tail-label">
              Tail
            </InputLabel>
            <TextField
              data-testid="tail-select"
              id="tail"
              name="tailLength"
              value={dog.tailLength}
              disabled={true}
              margin="normal"
            />
          </FormControl>
        </Grid>
      )}{" "}
      {!pageRefresh && dog && (
        <Grid
          className="grid"
          container
          item
          sm={12}
          md={4}
          direction="column"
          alignContent="stretch"
        >
          <FormControl className={classes.formControl}>
            <InputLabel shrink id="mark-label">
              Special Mark
            </InputLabel>
            <TextField
              data-testid="mark-select"
              value={dog.specialMark}
              disabled={true}
              margin="normal"
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel shrink id="breed-label">
              Breed
            </InputLabel>
            <TextField
              data-testid="breed-select"
              id="breed"
              value={dog.breed}
              disabled={true}
              margin="normal"
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel shrink htmlFor="behavior-label">
              Behaviors
            </InputLabel>
            <Select
              multiple
              labelId="behavior-label"
              label="Behavior"
              name="behaviors"
              value={dog.behaviors}
              disabled={true}
              input={<Input />}
              displayEmpty
              renderValue={(selected: any) => (
                <div className={classes.chips}>
                  {(selected as string[]).map((value) => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
            >
              <MenuItem aria-label="None" value="" />
              {Object.values(BehaviorsTypes)
                .filter((k) => isNaN(Number(k)))
                .map((type: string | BehaviorsTypes) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <Button
              data-testid="cancel-button"
              variant="contained"
              onClick={onShelterClicked}
              color="primary"
            >
              Shelter
            </Button>
          </FormControl>
        </Grid>
      )}
    </Grid>
  );
};
