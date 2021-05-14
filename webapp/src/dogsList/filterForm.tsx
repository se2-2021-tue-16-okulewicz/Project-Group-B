import "date-fns";
import React, { useState } from "react";
import clsx from 'clsx';
import Grid from "@material-ui/core/Grid";
import {
  Button,
  Card,
  CardContent,
  Input,
  InputAdornment,
  ListSubheader,
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
  CategoryTypes,
  OrderTypes,
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
import { clearDogList } from "../app/actions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      alignSelf:"center",
      marginBottom: theme.spacing(1),
      minWidth: 140,
      maxHeight: 40,
      margin:"5%",
      height:50
    },
    paper:{
      alignSelf:"center",
      marginBottom: theme.spacing(1.5),
      minWidth: 160,
      width:"100%",
      margin:"10%",
      marginLeft:"20%", 
      marginRight:"20%"
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
      fontSize: "1.2em", 
      margin:"5%"
      //marginLeft:"20%",
      //marginRight:"20%",

    },
    main:{
      //margin:"5%",
      minWidth:"160px",
      width:"15vw",
      margin:"1vw",
      display:"flex",
    }
  })
);

export default function FilterForm(props:any) {
  //if enable is session storage is null, the form has just been opened
  const classes = useStyles(); // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();
  const [isSort, setIsSort] = useState(false);
  const [order, setOrder] = useState("");
  const [sort, setSort] = useState("");
  //const [filterFields, setFilterFields] = useState<IFilterSort>(props.filters);

  const [lostDogFields, setLostDogFields] = useState<IFilterSort>(props.filters);
  console.log(lostDogFields);
  console.log(order);
  const inputsHandler = (e: { target: { name?: any; value: any } }) => {
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

  /*const inputArrayHandler = (e: { target: { name: any; value: any } }) => {
    if(lostDogFields.filter){
    let newField = { ...lostDogFields, 
      filter:{...lostDogFields.filter,
      location: { ...lostDogFields.filter.location, [e.target.name]: e.target.value },
    }};  
    setLostDogFields(newField);
  }
  };*/
  const selectsHandler = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    let newField = { ...lostDogFields, 
      filter:{...lostDogFields.filter, 
      [e.target.name as string]: e.target.value,
    }};
    setLostDogFields(newField);
    console.log(lostDogFields);
  };

  const updateOrder = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    if(typeof(e.target.value)=="string"){
    setOrder(e.target.value);}
  };
  /*const sortHandler = (
    e: React.ChangeEvent<{ name?: number; value: unknown }>
  ) => {
    //lostDogFields.sort = {name:"", order:""};
    if (typeof(lostDogFields.sort) != "string"){
    let newField = { ...lostDogFields, 
      sort:{...lostDogFields.sort, 
      [e.target.name as string]: e.target.value,
    }};
    setLostDogFields(newField);
  };
}*/

  function clearStorage() {
    sessionStorage.removeItem("lostDogFields");
    sessionStorage.removeItem("inputField");
    sessionStorage.clear();
  }

  const onSortClicked = () => {
    lostDogFields.page=0;
    if (sort != "" && order != ""){
      lostDogFields.sort = sort+","+order;
    }
    console.log(lostDogFields);
    console.log("---");
    props.updateFilters(lostDogFields);
    store.dispatch(clearDogList());
  };

  const onCancelClick = () => {
    props.updateFilters(props.filters);
  };
  /*const updateFilters = (filters: any) => {
    
  };*/

  const SelectFormControl = (props: any) => {
    const [selectedValue, setSelectedValue] = useState(props.value?props.value:"");
    console.log(selectedValue);
    const updateForm = (e: { target: { name?: any; value: any } }) => {
      setSelectedValue(e.target.value);
      props.updateForm(e as React.ChangeEvent<{ name?: string, value: unknown }>);
    }
  return(<FormControl variant="outlined" className={props.class} margin="dense">
  <InputLabel htmlFor={(props.name as string)+"-label"}>{(props.name as string).charAt(0).toUpperCase()+props.name.slice(1)}</InputLabel>
  <Select
    native
    label={(props.name as string)}
    labelId={(props.name as string)+"-label"}
    name={props.name}
    value={selectedValue}
    onChange={updateForm}
    displayEmpty
  >
    <option key={(props.name as string)+"-key"} aria-label="None" value="" />
    {Object.entries(props.options)
              .map(([key, value]) => (
                <option key={value as string} value={String(key as string).split('_').join('.')}>
                  {value as string}
                </option>
              ))}
  </Select>
</FormControl>);
  }

  return (
    <Grid container direction="column" justify="center" alignItems="center" spacing={2} className={classes.main}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ListSubheader style={{textAlign:"center", display:"flex"}} className={classes.title}>
              {"Sort The Dogs"}
        </ListSubheader>
        <SelectFormControl name="sort" value={sort} options={CategoryTypes} class={classes.formControl} updateForm={(
                  updatedInput: React.ChangeEvent<{ name?: string, value: string }>) => {if(updatedInput.target.value) 
                    {setSort(updatedInput.target.value as string)}}}/>
        <SelectFormControl name="direction" value={order} options={OrderTypes} class={classes.formControl} updateForm={(
                  updatedInput: React.ChangeEvent<{ name?: string, value: string }>) => {if(updatedInput.target.value) 
                  {setOrder(updatedInput.target.value as string)}}}/>
        <FormControl className={classes.formControl}>
          <Button
            data-testid="submit-button"
            variant="contained"
            disabled={!sort || !order}
            onClick={() => onSortClicked()}
            color="primary"
          >
            Sort
          </Button>
        </FormControl>
        <ListSubheader style={{textAlign:"center", display:"flex"}} className={classes.title}>
                {"Filter The Dogs"}
        </ListSubheader>
        <FormControl variant="outlined" className={classes.formControl} margin="dense">
          <InputLabel variant="outlined" htmlFor="sort-label">Categories</InputLabel>
          <Select
            data-testid="sort-select"
            native
            variant="outlined"
            label="Categories"
            labelId="sort-label"
            id="sort"
            name="sort"
            value={lostDogFields.sort}
            onChange={inputsHandler}
            displayEmpty
          >
            <option key={"color-key"} aria-label="None" value="" />
            {Object.entries(CategoryTypes)
              .map(([key, value]) => (
                <option key={value} value={String(key).split('_').join('.')}>
                  {value}
                </option>
              ))}
          </Select>
        </FormControl>
        </MuiPickersUtilsProvider>
    </Grid>
  );
}


/*
      <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="color-label">Categories</InputLabel>
            <Select
              data-testid="color-select"
              native
              label="Categories"
              labelId="color-label"
              id="color"
              name="color"
              value={lostDogFields.filter?.color}
              onChange={selectsHandler}
              displayEmpty
            >
              <option key={"color-key"} aria-label="None" value="" />
              {Object.values(CategoryTypes)
                .filter((k) => isNaN(Number(k)))
                .map((type: string | CategoryTypes) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
            </Select>
            </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="color-label">Direction</InputLabel>
            <Select
              data-testid="color-select"
              native
              label="Direction"
              labelId="color-label"
              id="color"
              name="color"
              value={lostDogFields.filter?.color}
              onChange={selectsHandler}
              displayEmpty
            >
              <option key={"color-key"} aria-label="None" value="" />
              <option key={"color-key"} aria-label="DESC" value="descending" />
              <option key={"color-key"} aria-label="ASC" value="ascending" />
            </Select>
            </FormControl>
      <Grid item className={classes.formControl}>
            <ListSubheader>
                <Typography style={{textAlign:"center"}}>
                {"Filter The Dogs"}
                  </Typography>
      </ListSubheader>
      </Grid>
        <FormControl variant="outlined" className={classes.formControl}>
            <TextField
              data-testid="name-input"
              id="name"
              type="string"
              name="name"
              value={lostDogFields.filter?.name}
              onChange={inputsHandler}
              variant="outlined"
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
       
*/