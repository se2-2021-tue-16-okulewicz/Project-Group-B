import "date-fns";
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import {
  Button,
  Card,
  CardContent,
  Input,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import InputLabel from "@material-ui/core/InputLabel";
import DateFnsUtils from "@date-io/date-fns";
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
import { initLostDogProps, initPicture } from "../dog/dogClasses";
import { ILostDog, IPicture } from "../dog/dogInterfaces";
import Chip from "@material-ui/core/Chip";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import * as Actions from "../app/actions";
import { store } from "../app/store";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { ValidateFetchedDog } from "../utilityComponents/validation";
import { IFilters } from "../utilityComponents/utilities";
import { IFilterSort, initFilterProps } from "./filterInterface";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      alignSelf:"center",
      marginBottom: theme.spacing(1.5),
      minWidth: 140,
      width:"98%", marginLeft:"20%", marginRight:"20%"
    },
    selectEmpty: {
      marginTop: theme.spacing(1),
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
      marginTop: "0.009%",
      alignSelf:"center",
      justifyContent:"center",
      alignItems: "center",
      position:"absolute",
      width:"98%", marginLeft:"17%", marginRight:"17%"
    },
    input:{
      maxHeight:40
    },
    title:{
      alignSelf:"center",
      align: "center",
      alignContent:"center",
      color: "darkpink",
      fontStyle: "oblique",
      fontSize: "1.3em",
      fontFamily: "Gill Sans Extrabold",
      fontWeight: "bolder",
      width:"80%", 
      margin:"10%",
      minWidth: "140"
      //marginLeft:"20%",
      //marginRight:"20%",

    },
  })
);

export default function FilterForm(props:any) {
  //if enable is session storage is null, the form has just been opened
  const classes = useStyles(); // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();
  const [filterFields, setFilterFields] = useState<IFilterSort>(props.filters);
  const [lostDogFields, setLostDogFields] = useState<IFilterSort>({...initFilterProps});
  const inputsHandler = (e: { target: { name: any; value: any } }) => {
    let newField = { ...lostDogFields, [e.target.name]: e.target.value };
    setLostDogFields(newField);
  };

  function calendarHandler(date: MaterialUiPickersDate, name: string): void {
    if(date){
    let newField = { ...lostDogFields, 
      filter:{...lostDogFields.filter,  [name]: date as Date }};
    setLostDogFields(newField);
  }
  }

  const inputArrayHandler = (e: { target: { name: any; value: any } }) => {
    if(lostDogFields.filter){
    let newField = { ...lostDogFields, 
      filter:{...lostDogFields.filter,
      location: { ...lostDogFields.filter.location, [e.target.name]: e.target.value },
    }};  
    setLostDogFields(newField);
  }
  };
  const selectsHandler = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    let newField = { ...lostDogFields, 
      filter:{...lostDogFields.filter, 
      [e.target.name as string]: e.target.value,
    }};
    setLostDogFields(newField);
  };

  function clearStorage() {
    sessionStorage.removeItem("lostDogFields");
    sessionStorage.removeItem("inputField");
    sessionStorage.clear();
  }

  const onSubmitClicked = () => {
    props.updateFilters(lostDogFields);
  };

  const onCancelClick = () => {
    props.updateFilters(initFilterProps);
  };

  function registerDog(dog: ILostDog, picture: IPicture) {
    dog = ValidateFetchedDog(dog);
    store.dispatch(
      Actions.addDogThunk({
        dog: dog,
        picture: picture,
        cookies: cookies,
      })
    );
  }
  /*const updateFilters = (filters: any) => {
    
  };*/
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} data-testid="MainForm">
      <Paper className={classes.title}>
                <Typography className={classes.title}>
                {"Sort The Dogs"}
                  </Typography>
      </Paper>
      <Grid  className={classes.mainForm} item xs={1}>
      <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="color-label">Color</InputLabel>
            <Select
              data-testid="color-select"
              native
              label="Color"
              labelId="color-label"
              id="color"
              name="color"
              value={lostDogFields.filter?.color}
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
            
      <Paper className={classes.formControl} style={{minWidth:"160"}}>
                <Typography className={classes.title}>
                {"FindYourDog"}
                  </Typography>
      </Paper>
        <FormControl className={classes.formControl}>
            <InputLabel shrink id="name-label">
              Name
            </InputLabel>
            <Input
              data-testid="name-input"
              id="name"
              name="name"
              value={lostDogFields.filter?.name}
              onChange={inputsHandler}
              required
            />
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <TextField
              label="Age"
              type="number"
              id="age"
              name="age"
              value={lostDogFields.filter?.age}
              onChange={inputsHandler}
              InputProps={{
                inputProps: { min: 0, max: 30 },
                startAdornment: (
                  <InputAdornment position="start">Years</InputAdornment>
                ),
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
              value={lostDogFields.filter?.color}
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
              value={lostDogFields.filter?.hairLength}
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
              value={lostDogFields.size}
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
              value={lostDogFields.filter?.earsType}
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
              value={lostDogFields.filter?.tailLength}
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
              value={lostDogFields.filter?.specialMark}
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
              value={lostDogFields.filter?.breed}
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
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel shrink id="calendar-label">
              Lost before
            </InputLabel>
            <DatePicker
              data-testid="date-select"
              disableToolbar
              variant="inline"
              format="yyyy-MM-dd"
              margin="normal"
              id="date-picker-inline"
              value={lostDogFields.filter?.dateLostBefore}
              minDate={lostDogFields.filter?.dateLostAfter ? lostDogFields.filter?.dateLostAfter : new Date(1950, 1, 1, 0, 0, 0, 0)}
              maxDate={new Date()}
              name="dateLostBefore"
              onChange={(date: any) => calendarHandler(date, "dateLostBefore")}
            />
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel shrink id="calendar-label">
              Lost after
            </InputLabel>
            <DatePicker
              data-testid="date-select"
              disableToolbar
              variant="inline"
              format="yyyy-MM-dd"
              margin="normal"
              id="date-picker-inline"
              value={lostDogFields.filter?.dateLostAfter}
              maxDate={lostDogFields.filter?.dateLostBefore ? lostDogFields.filter?.dateLostBefore : new Date()}
              minDate={new Date(1950, 1, 1, 0, 0, 0, 0)}
              name="dateLostAfter"
              onChange={(date: any) => calendarHandler(date, "dateLostAfter")}
            />
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel shrink id="city-label">
              City
            </InputLabel>
            <Input
              data-testid="city-input"
              name="city"
              value={lostDogFields.filter?.location?.city}
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
              value={lostDogFields.filter?.location?.district}
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
              value={lostDogFields.filter?.behaviors}
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
              onClick={() => onSubmitClicked()}
              color="primary"
            >
              Submit
            </Button>
          </FormControl>
          <FormControl className={classes.formControl}>
            <Button
              data-testid="cancel-button"
              variant="contained"
              onClick={onCancelClick}
              color="secondary"
            >
              Cancel
            </Button>
          </FormControl>
        </Grid>
    </MuiPickersUtilsProvider>
  );
}