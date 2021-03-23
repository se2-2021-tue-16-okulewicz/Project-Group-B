import { CircularProgress } from "@material-ui/core";
import React from "react";
import "./LoadingPopup.css";

function LoadingPopup() {
  return (
    <div className="modal">
      <div className="overlay">
        <CircularProgress />
      </div>
    </div>
  );
}

export default LoadingPopup;
