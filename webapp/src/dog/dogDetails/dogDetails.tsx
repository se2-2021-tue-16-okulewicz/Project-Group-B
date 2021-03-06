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
import { BehaviorsTypes } from "../dogEnums";
import { ILostDogWithPictureAndComments } from "../dogInterfaces";
import Chip from "@material-ui/core/Chip";
import * as Actions from "../../app/actions";
import { store } from "../../app/store";
import { useCookies } from "react-cookie";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "../../app/stateInterfaces";
import CommentsList from "../dogComments/commentsList";
import CommentForm from "../dogComments/commentForm";
import { ICommentWithIdAndAuthor } from "../dogComments/commentsInterfaces";
import { initCommentandAuthor } from "../dogComments/commentsClasses";
import CommentEditForm from "../dogComments/commentEditForm";

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

const DogDetails = (props: any) => {
  const dog = useSelector(
    (state: State) => state.editedDog as ILostDogWithPictureAndComments
  );
  const location = useLocation();
  const dogId = props.dogId
    ? props.dogId
    : Number(location.pathname.split("/dog/")[1]);
  const [pageRefresh, setPageRefresh] = useState(true);
  const [comment, setComment] = useState(initCommentandAuthor);
  const [oldcomment, setOldComment] = useState(initCommentandAuthor);
  const [add, setAdd] = useState(true);

  useEffect(() => {
    if (pageRefresh) {
      try {
        store.dispatch(
          Actions.fetchOneDogThunk({
            id: dogId as number,
            cookies: cookies,
          })
        );
      } catch (err) {
        console.error("Failed to fetch the dog: ", err);
      } finally {
        setPageRefresh(false);
        setComment(initCommentandAuthor);
        setOldComment(initCommentandAuthor);
        store.dispatch(Actions.finishRefreshing);
      }
    } // eslint-disable-next-line
  }, [pageRefresh]);

  useEffect(() => {
    if (!pageRefresh && !dog) {
      setPageRefresh(true);
    } // eslint-disable-next-line
  }, [dog]);

  function redirectToCommentEdit(comments: ICommentWithIdAndAuthor) {
    setAdd(false);
    if (comment !== initCommentandAuthor) {
      setOldComment(comments);
      setComment(initCommentandAuthor);
    } else {
      setComment(comments);
      setOldComment(initCommentandAuthor);
    }
  }

  function redirectToComment(id: number) {
    try {
      store.dispatch(
        Actions.deleteOneCommentThunk({
          commentId: id,
          dogId: dogId,
          cookies: cookies,
        })
      );
    } catch (err) {
      console.error("Failed to fetch the dog: ", err);
    } finally {
    }
  }

  function cancelComment() {
    setComment(initCommentandAuthor);
    setOldComment(initCommentandAuthor);
    setAdd(true);
  }

  const history = useHistory();
  const classes = useStyles(); // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();

  const onCancelClick = () => {
    ///sessionStorage.removeItem("dogId");
    sessionStorage.clear();
    history.push("/dogs");
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
            <InputLabel shrink id="calendar-label">
              Dog was lost on
            </InputLabel>
            <TextField
              data-testid="date-select"
              margin="normal"
              id="date-picker-inline"
              value={dog.dateLost as Date}
              name="dateLost"
              disabled={true}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel shrink id="city-label">
              City
            </InputLabel>
            <TextField
              data-testid="city-input"
              name="city"
              value={dog.location.city}
              disabled={true}
              margin="normal"
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel shrink id="district-label">
              District
            </InputLabel>
            <TextField
              data-testid="district-input"
              name="district"
              value={dog.location.district}
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
              onClick={onCancelClick}
              color="primary"
            >
              Lost Dogs
            </Button>
          </FormControl>
        </Grid>
      )}
      {!pageRefresh && dog && dog.comments && (
        <Grid item xs={12}>
          {add && <CommentForm dogId={dogId} add={add} />}
          {comment.location.city !== "" && (
            <CommentEditForm
              dogId={dogId}
              comment={comment}
              cancelComment={() => cancelComment()}
              update={() => cancelComment()}
            />
          )}
          {oldcomment.location.city !== "" && (
            <CommentEditForm
              dogId={dogId}
              comment={oldcomment}
              cancelComment={() => cancelComment()}
              update={() => cancelComment()}
            />
          )}
          <CommentsList
            comments={dog.comments}
            cancelComment={() => {
              cancelComment();
            }}
            redirectToCommentEdit={(comment: ICommentWithIdAndAuthor) => {
              redirectToCommentEdit(comment);
            }}
            redirectToComment={(id: number) => {
              redirectToComment(id);
            }}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default DogDetails;
