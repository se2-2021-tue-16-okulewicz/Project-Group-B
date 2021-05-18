import "date-fns";
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import {
  Button,
  InputAdornment,
  Select,
  ListSubheader,
  TextField,
  Link,
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import InputLabel from "@material-ui/core/InputLabel";
import DateFnsUtils from "@date-io/date-fns";
import {
  BreedTypes,
  CategoryTypes,
  ColorTypes,
  OrderTypes,
  SizeTypes,
} from "../dog/dogEnums";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { store } from "../app/store";
import { useCookies } from "react-cookie";
import { IFilterSort } from "./filterInterface";
import { clearDogList } from "../app/actions";
import {
  SelectFormControl,
  DateFormControl,
} from "../commoncomponents/formHandlers";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      alignSelf: "center",
      marginBottom: theme.spacing(1),
      width: 180,
      maxHeight: 35,
      margin: "4%",
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
    title: {
      fontStyle: "bold",
      fontSize: "1.22em",
      color: "black",
      fontFamily: "Roboto",
      marginBottom: "3%",
      minWidth: "160px",
    },
    main: {
      minWidth: "200px",
      width: "16vw",
      margin: "1vw",
      display: "flex",
    },
  })
);

export default function FilterForm(props: any) {
  //if enable is session storage is null, the form has just been opened
  const classes = useStyles(); // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();
  const [order, setOrder] = useState("");
  const [sort, setSort] = useState("");
  const [lostDogFields, setLostDogFields] = useState<IFilterSort>(
    props.filters
  );
  const [moreFiltersVisible, setMoreFiltersVisible] = useState(false);
  const numberHandler = (
    e: React.ChangeEvent<{ name?: string; value: any }>
  ) => {
    let newField = {
      ...lostDogFields,
      filter: {
        ...lostDogFields.filter,
        [e.target.name as string]: Number.parseInt(e.target.value),
      },
    };
    setLostDogFields(newField);
  };

  function calendarHandler(date: MaterialUiPickersDate, name: string): void {
    if (date == new Date(1900, 1, 1, 0, 0, 0, 0) || date == null) {
      let newField = {
        ...lostDogFields,
        filter: { ...lostDogFields.filter, [name]: null },
      };
      setLostDogFields(newField);
    } else if (date) {
      let newField = {
        ...lostDogFields,
        filter: { ...lostDogFields.filter, [name]: date as Date },
      };
      setLostDogFields(newField);
    }
  }

  const selectsHandler = (
    e: React.ChangeEvent<{ name?: string; value: any }>
  ) => {
    let newField = {
      ...lostDogFields,
      filter: {
        ...lostDogFields.filter,
        [e.target.name as string]: e.target.value,
      },
    };
    setLostDogFields(newField);
  };

  const updateOrder = (e: React.ChangeEvent<{ name?: string; value: any }>) => {
    if (typeof e.target.value == "string") {
      setOrder(e.target.value);
    }
  };

  function clearStorage() {
    sessionStorage.removeItem("lostDogFields");
    sessionStorage.removeItem("inputField");
    sessionStorage.clear();
  }

  const onSortClicked = () => {
    setLostDogFields(props.filters);
    if (sort != "" && order != "") {
      lostDogFields.sort = sort + "," + order;
    }
    props.updateFilters(lostDogFields);
    store.dispatch(clearDogList());
  };

  const onSubmitClicked = () => {
    lostDogFields.page = 0;
    props.updateFilters(lostDogFields);
    store.dispatch(clearDogList());
  };

  const onCancelClick = () => {
    props.updateFilters(props.filters);
  };

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={2}
      className={classes.main}
    >
      <SelectFormControl
        name="sort"
        value={sort}
        options={CategoryTypes}
        class={classes.formControl}
        updateForm={(
          updatedInput: React.ChangeEvent<{ name?: string; value: string }>
        ) => setSort(updatedInput.target.value as string)}
      />
      <SelectFormControl
        name="direction"
        value={order}
        options={OrderTypes}
        class={classes.formControl}
        updateForm={(
          updatedInput: React.ChangeEvent<{ name?: string; value: string }>
        ) => setOrder(updatedInput.target.value as string)}
      />
      <FormControl className={classes.formControl}>
        <Button
          style={{ marginBottom: "5%" }}
          variant="contained"
          disabled={!sort || !order}
          onClick={() => onSortClicked()}
          color="primary"
        >
          Sort
        </Button>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <TextField
          size="small"
          label="Name"
          name="name"
          value={lostDogFields.filter?.name}
          onChange={selectsHandler}
          variant="outlined"
        />
      </FormControl>
      <SelectFormControl
        name="color"
        value={lostDogFields.filter?.color}
        options={ColorTypes}
        class={classes.formControl}
        updateForm={(
          updatedInput: React.ChangeEvent<{ name?: string; value: string }>
        ) => selectsHandler(updatedInput)}
      />
      <SelectFormControl
        name="size"
        value={lostDogFields.filter?.size}
        options={SizeTypes}
        class={classes.formControl}
        updateForm={(
          updatedInput: React.ChangeEvent<{ name?: string; value: string }>
        ) => selectsHandler(updatedInput)}
      />
      <FormControl variant="outlined" className={classes.formControl}>
        <TextField
          size="small"
          label="City"
          name="location_city"
          value={lostDogFields.filter?.location_city}
          onChange={selectsHandler}
          variant="outlined"
        />
      </FormControl>
      <DateFormControl
        name="dateLostAfter"
        label="Lost after"
        value={lostDogFields.filter?.dateLostAfter}
        class={classes.formControl}
        updateForm={(date: MaterialUiPickersDate, name: string) =>
          calendarHandler(date, name)
        }
        maxDate={
          lostDogFields.filter?.dateLostBefore
            ? lostDogFields.filter?.dateLostBefore
            : new Date()
        }
        minDate={new Date(1950, 1, 1, 0, 0, 0, 0)}
      />
      {!moreFiltersVisible && (
        <FormControl className={classes.formControl}>
          <Link
            component="button"
            variant="body2"
            onClick={() => {
              setMoreFiltersVisible(true);
            }}
          >
            Display more filters...
          </Link>
        </FormControl>
      )}
      {moreFiltersVisible && (
        <DateFormControl
          name="dateLostBefore"
          label="Lost before"
          value={lostDogFields.filter?.dateLostBefore}
          class={classes.formControl}
          updateForm={(date: MaterialUiPickersDate, name: string) =>
            calendarHandler(date, name)
          }
          minDate={
            lostDogFields.filter?.dateLostAfter
              ? lostDogFields.filter?.dateLostAfter
              : new Date(1950, 1, 1, 0, 0, 0, 0)
          }
          maxDate={new Date()}
        />
      )}
      {moreFiltersVisible && (
        <FormControl variant="outlined" className={classes.formControl}>
          <TextField
            size="small"
            label="District"
            name="location_district"
            value={lostDogFields.filter?.location_district}
            onChange={selectsHandler}
            variant="outlined"
          />
        </FormControl>
      )}
      {moreFiltersVisible && (
        <FormControl variant="outlined" className={classes.formControl}>
          <TextField
            size="small"
            label="Older than"
            type="number"
            name="ageFrom"
            value={lostDogFields.filter?.ageFrom}
            onChange={numberHandler}
            variant="outlined"
            InputProps={{
              inputProps: { min: 0, max: 30 },
              endAdornment: (
                <InputAdornment position="end">
                  {lostDogFields.filter?.ageFrom
                    ? "Year" + (lostDogFields.filter?.ageFrom != 1 ? "s" : "")
                    : ""}
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
      )}
      {moreFiltersVisible && (
        <FormControl variant="outlined" className={classes.formControl}>
          <TextField
            size="small"
            label="Younger than"
            type="number"
            name="ageTo"
            value={lostDogFields.filter?.ageTo}
            onChange={numberHandler}
            variant="outlined"
            InputProps={{
              inputProps: { min: 0, max: 30 },
              endAdornment: (
                <InputAdornment position="end">
                  {lostDogFields.filter?.ageTo
                    ? "Year" + (lostDogFields.filter?.ageTo != 1 ? "s" : "")
                    : ""}
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
      )}
      {moreFiltersVisible && (
        <SelectFormControl
          name="breed"
          value={lostDogFields.filter?.breed}
          options={BreedTypes}
          class={classes.formControl}
          updateForm={(
            updatedInput: React.ChangeEvent<{ name?: string; value: string }>
          ) => selectsHandler(updatedInput)}
        />
      )}
      {moreFiltersVisible && (
        <FormControl className={classes.formControl}>
          <Link
            component="button"
            variant="body2"
            onClick={() => {
              setMoreFiltersVisible(false);
            }}
          >
            Hide additional filters
          </Link>
        </FormControl>
      )}
      <FormControl className={classes.formControl}>
        <Button
          style={{ marginBottom: "5%" }}
          variant="contained"
          disabled={!lostDogFields.filter}
          onClick={() => onSubmitClicked()}
          color="primary"
        >
          Filter
        </Button>
      </FormControl>
    </Grid>
  );
}
