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
import "../registerDog/ImageUpload.css";
import FormControl from "@material-ui/core/FormControl";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import InputLabel from "@material-ui/core/InputLabel";
import DateFnsUtils from "@date-io/date-fns";
import ImageUpload from "../registerDog/ImageUpload";
import {
  ColorTypes,
  HairTypes,
  SizeTypes,
  EarsTypes,
  TailTypes,
  SpecialMarkTypes,
  BehaviorsTypes,
  BreedTypes,
} from "../dog/dogEnums";
import { initLostDogWithPictureProps, initPicture } from "../dog/dogClasses";
import { ILostDog, IPicture, ILostDogWithPicture } from "../dog/dogInterfaces";
import Chip from "@material-ui/core/Chip";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import * as Actions from "../app/actions";
import { store } from "../app/store";
import { useCookies } from "react-cookie";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "../app/reducer";
import LoadingPopup from "../utilityComponents/LoadingPopup";
import { WindowConsumer } from "@mui-treasury/layout";

//edit dog almost finished, just need to update what happends when there is no new picture
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
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
    },
    mainForm: {
      marginTop: '4%'
    }
  })
);
const EditDogDetails = (props: any) => {
  //if enable is session storage is null, the form has just been opened
  //const id = Number(useParams());
  const { path } = useRouteMatch();
  const history = useHistory();
  const classes = useStyles();
  //const [pageRefresh, setPageRefresh] = useState(true);
  const refreshRequired = useSelector(
    (state: State) => state.dogsRequireRefresh 
  ) as boolean;
  const editedDog = useSelector(
    (state: State) => state.editedDog as ILostDogWithPicture
  );
  useEffect(()=>{
    if(editedDog){
      sessionStorage.setItem("editDogFields", JSON.stringify(editedDog as ILostDog));
      setPicture(editedDog.picture as IPicture);
      setEditDogFields(editedDog as ILostDog);
    }
  },[editedDog])
  const [isNewPicture, setIsNewPicture] = useState(false);
  const dogId = props.dogId == 0 ? sessionStorage.getItem("editDogId") : props.dogId;
  let isInputNotNull = sessionStorage.getItem("editDogFields") != null;
  const [editDogFields, setEditDogFields] = useState<ILostDog>(
    isInputNotNull
      ? JSON.parse(sessionStorage.getItem("editDogFields") as string)
      : initLostDogWithPictureProps
  );
  sessionStorage.setItem("editDogFields", JSON.stringify(editDogFields));
  const [picture, setPicture] = useState<IPicture>(initPicture);

  const inputsHandler = (e: { target: { name: any; value: any } }) => {
    let newField = { ...editDogFields, [e.target.name]: e.target.value };
    setEditDogFields(newField);
    sessionStorage.setItem("editDogFields", JSON.stringify(newField));
  };

  function calendarHandler(date: MaterialUiPickersDate): void {
    let newField = { ...editDogFields, dateLost: date as Date };
    setEditDogFields(newField);
    sessionStorage.setItem("editDogFields", JSON.stringify(newField));
  }

  const inputArrayHandler = (e: { target: { name: any; value: any } }) => {
    let newField = {
      ...editDogFields,
      location: { ...editDogFields.location, [e.target.name]: e.target.value },
    };
    setEditDogFields(newField);
    sessionStorage.setItem("editDogFields", JSON.stringify(newField));
  };
  const selectsHandler = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    let newField = {
      ...editDogFields,
      [e.target.name as string]: e.target.value,
    };
    setEditDogFields(newField);
    sessionStorage.setItem("editDogFields", JSON.stringify(newField));
  };

  function clearStorage() {
    sessionStorage.removeItem("editDogFields");
    sessionStorage.removeItem("inputEditField");
    sessionStorage.removeItem("editDogId");
    sessionStorage.clear();
  } 

  const onMarkDogClicked = () => {
    try {
      markDogAsFound(dogId);
    } catch (err) {
      console.error("Failed to fetch the dog: ", err);
    }
    finally{
      store.dispatch(Actions.clearDogList);
      store.dispatch(Actions.startRefreshing);
      clearStorage();
      history.push("/settings");
      //window.location.reload(true);
    }
  };

  const onSubmitEditClicked = () => {
    try {
      if (picture==initPicture)
      {
        setPicture(editedDog.picture as IPicture);
      }
      updateDog(editDogFields, picture as IPicture);
    } catch (err) {
      console.error("Failed to fetch the dog: ", err);
    }
    finally{
      store.dispatch(Actions.clearDogList);
      clearStorage();
      history.push("/settings");
      //window.location.reload(false);
    }
  };

  const onCancelClick = () => {
    store.dispatch(Actions.clearDogList);
    clearStorage();
    history.push("/settings");
  };

  function updateDog(dog: ILostDog, picture: IPicture) {
    let tmp = dog as ILostDogWithPicture;
    tmp.picture = picture as IPicture;
    store.dispatch(
      Actions.updateDogThunk({
        dog: tmp,
        cookies: props.cookies,
      }) //filters
    );
  }

  function markDogAsFound(dogId: Number) {
    store.dispatch(
      Actions.markDogAsFoundThunk({
        dogId: dogId as number,
        cookies: props.cookies,
      }) //filters
    );
  }
  const handlePicturesChange = (event: any) => {
    if (event) {
      (event as File).arrayBuffer().then((fileBuffer) => {
        setPicture({
          id: 0,
          fileName: event.name, //event.name,
          fileType: event.type,
          data: fileBuffer,
        } as IPicture);
      });
    }
    setIsNewPicture(true);
  };
  return (
    <div>

      {!editDogFields &&(<Grid className={classes.mainForm}><FormControl className={classes.formControl}>
            <Button
              data-testid="submit-button"
              variant="contained"
              onClick={() => onMarkDogClicked()}
              color="primary"
              disabled={editedDog ? editedDog.isFound : true}
            >
              {editedDog ? (editedDog.isFound ? "Dog was found!" : "Mark Dog as Found") : "Dog not fetched"}
            </Button>
          </FormControl></Grid>)}
      {!refreshRequired && editDogFields &&(
        <MuiPickersUtilsProvider utils={DateFnsUtils} data-testid="MainForm">
      <Grid
        className={classes.mainForm}
        container
        alignContent="space-between"
        spacing={7}
      >
        
        <Grid
          container
          item
          xs={5}
          direction="column"
          alignContent="stretch"
        >
          <FormControl className={classes.formControl}>
            <InputLabel shrink id="name-label">
              Name
            </InputLabel>
            <Input
              data-testid="name-input"
              id="name"
              name="name"
              value={editDogFields.name}
              onChange={inputsHandler}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <Card className={classes.cardContent}>
              <CardContent className={classes.cardContent}>
                {editedDog && !isNewPicture &&
                  <img className="image"
                    src={`data:${editedDog.picture.fileType};base64,${editedDog.picture.data as ArrayBuffer
                      }`}
                    alt={editedDog.picture.fileName}
                  />}
                <ImageUpload
                  data-testid="img-upload"
                  handlePicturesChange={(
                    file: React.ChangeEvent<{ value: unknown }>
                  ) => handlePicturesChange(file)}
                />
              </CardContent>
            </Card>
          </FormControl>
        </Grid>
        <Grid
          container
          item
          xs={3}
          direction="column"
          alignContent="stretch"
        >
          <FormControl variant="outlined" className={classes.formControl}>
            <TextField
              label="Age"
              type="number"
              id="age"
              name="age"
              value={editDogFields.age}
              onChange={inputsHandler}
              InputProps={{
                startAdornment:
                  <InputAdornment position="start">Years</InputAdornment>
              }}
              variant="outlined"
            />
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="color-label">Color</InputLabel>
            <Select
              data-testid="color-select"
              native
              label="Color"
              labelId="color-label"
              id="color"
              name="color"
              value={editDogFields.color}
              onChange={selectsHandler}
              displayEmpty
            >
              <option key={"color-key"} aria-label="None" value="" />
              {Object.values(ColorTypes)
                .filter((k) => isNaN(Number(k)))
                .map((type: string | ColorTypes) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="hair-label">Hair</InputLabel>
            <Select
              data-testid="hair-select"
              native
              label="hair"
              labelId="hair-label"
              value={editDogFields.hairLength}
              name="hairLength"
              onChange={selectsHandler}
              displayEmpty
            >
              <option key={"hair-type"} aria-label="None" value="" />
              {Object.values(HairTypes)
                .filter((k) => isNaN(Number(k)))
                .map((type: string | HairTypes) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="size-label">Size</InputLabel>
            <Select
              data-testid="size-select"
              native
              labelId="size-label"
              label="size"
              name="size"
              value={editDogFields.size}
              onChange={selectsHandler}
              displayEmpty
            >
              <option key={"size-type"} aria-label="None" value="" />
              {Object.values(SizeTypes)
                .filter((k) => isNaN(Number(k)))
                .map((type: string | SizeTypes) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="ears-label">Ears</InputLabel>
            <Select
              data-testid="ears-select"
              native
              labelId="ears-label"
              label="ears"
              name="earsType"
              value={editDogFields.earsType}
              onChange={selectsHandler}
              displayEmpty
            >
              <option key={"ears-type"} aria-label="None" value="" />
              {Object.values(EarsTypes)
                .filter((k) => isNaN(Number(k)))
                .map((type: string | EarsTypes) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="tail-label">Tail</InputLabel>
            <Select
              data-testid="tail-select"
              native
              labelId="tail-label"
              label="tail"
              name="tailLength"
              value={editDogFields.tailLength}
              onChange={selectsHandler}
              displayEmpty
            >
              <option key={"tail-type"} aria-label="None" value="" />
              {Object.values(TailTypes)
                .filter((k) => isNaN(Number(k)))
                .map((type: string | TailTypes) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="mark-label">Special Mark</InputLabel>
            <Select
              data-testid="mark-select"
              native
              labelId="mark-label"
              label="specialmark "
              name="specialMark"
              value={editDogFields.specialMark}
              onChange={selectsHandler}
              displayEmpty
            >
              <option key={"mark-type"} aria-label="None" value="" />
              {Object.values(SpecialMarkTypes)
                .filter((k) => isNaN(Number(k)))
                .map((type: string | SpecialMarkTypes) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="breed-label">Breed</InputLabel>
            <Select
              data-testid="breed-select"
              native
              labelId="breed-label"
              label="breed "
              name="breed"
              value={editDogFields.breed}
              onChange={selectsHandler}
              displayEmpty
            >
              <option key={"breed-type"} aria-label="None" value="" />
              {Object.values(BreedTypes)
                .filter((k) => isNaN(Number(k)))
                .map((type: string | BreedTypes) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid
          container
          item
          xs={4}
          direction="column"
          alignContent="stretch"
        >
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel shrink id="calendar-label">
              Dog was lost on
            </InputLabel>
            <DatePicker
              data-testid="date-select"
              disableToolbar
              variant="inline"
              format="yyyy-MM-dd"
              margin="normal"
              id="date-picker-inline"
              value={editDogFields.dateLost}
              maxDate={new Date()}
              name="dateLost"
              onChange={(date: any) => calendarHandler(date)}
            />
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel shrink id="city-label">
              City
            </InputLabel>
            <Input
              data-testid="city-input"
              name="city"
              value={editDogFields.location.city}
              onChange={inputArrayHandler}
            />
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel shrink id="district-label">
              District
            </InputLabel>
            <Input
              data-testid="district-input"
              name="district"
              value={editDogFields.location.district}
              onChange={inputArrayHandler}
            />
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel shrink htmlFor="behavior-label">
              Behavior
            </InputLabel>
            <Select
              multiple
              labelId="behavior-label"
              label="Behavior"
              name="behaviors"
              value={editDogFields.behaviors}
              onChange={selectsHandler}
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
              data-testid="submit-button"
              variant="contained"
              onClick={() => onMarkDogClicked()}
              color="primary"
              disabled={editedDog ? editedDog.isFound : true}
            >
              {editedDog ? (editedDog.isFound ? "Dog was found!" : "Mark Dog as Found") : "Dog not fetched"}
            </Button>
          </FormControl>
          <FormControl className={classes.formControl}>
            <Button
              data-testid="cancel-button"
              variant="contained"
              onClick={onSubmitEditClicked}
              color="secondary"
            >
              Update the Dog
            </Button>
          </FormControl>
          <FormControl className={classes.formControl}>
            <Button
              data-testid="cancel-button"
              variant="contained"
              onClick={onCancelClick}
              color="primary"
            >
              Cancel
            </Button>
          </FormControl>
        </Grid>
      </Grid>
      </MuiPickersUtilsProvider>
  )} 
</div>
  );
};

export default EditDogDetails;