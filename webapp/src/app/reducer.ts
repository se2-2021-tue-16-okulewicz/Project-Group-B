import * as Actions from "./actions";
import { createReducer } from "@reduxjs/toolkit";
import _ from "lodash";
//import config from "../config/config";

const init = {
  cars: [],
  addedCarsIds: [],
  bookings: [],
  status: "idle",
  error: null,
  errorBody: {},
  carsLastPage: false,
  carsRequireRefresh: true,
  bookingsLastPage: false,
  bookingsRequireRefresh: true,
  token: null,
};

/*[Actions.addCarThunk.pending]: (state, action) => {
    let newState = _.cloneDeep(state);
    newState.status = "adding";
    return newState;
  },

  [Actions.addCarThunk.fulfilled]: (state, action) => {
    let newState = _.cloneDeep(state);
    newState.status = "idle";
    newState.carsRequireRefresh = true;
    return newState;
  },

  [Actions.addCarThunk.rejected]: (state, action) => {
    let newState = _.cloneDeep(state);
    newState.status = "error";
    newState.error = action.payload.code;
    newState.errorBody = action.payload.body;
    return newState;
  },

  [Actions.uploadCarImageThunk.pending]: (state, action) => {
    let newState = _.cloneDeep(state);
    newState.status = "uploadingImage";
    return newState;
  },

  [Actions.uploadCarImageThunk.fulfilled]: (state, action) => {
    let newState = _.cloneDeep(state);
    newState.status = "idle";
    newState.cars = state.cars.map((car) => {
      if (car.id === action.payload.id) {
        return { ...car, image: action.payload.image };
      } else {
        return car;
      }
    });
    return newState;
  },

  [Actions.uploadCarImageThunk.rejected]: (state, action) => {
    let newState = _.cloneDeep(state);
    newState.status = "error";
    newState.error = action.payload.code;
    newState.errorBody = action.payload.body;
    return newState;
  }*/
