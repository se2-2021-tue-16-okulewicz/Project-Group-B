import React, { useState } from "react";
import "./imageUploadForm.css";
import { InputLabel } from "@material-ui/core";
const types = ["image/jpg", "image/jpeg", "image/png"];

const ImageUploadForm = (props: any) => {
  const [file, setFile] = useState(null);
  const [newImage, setNewImage] = useState(false);

  const handleChange = (event: any) => {
    if (types.includes(event.target.files[0].type)) {
      let newFile = event.target.files[0];
      setFile(newFile);
      setNewImage(true);
      let f = event.target.files[0];
      props.handlePicturesChange(f);
    }
  };

  return (
    <>
      <div className="imageContainer">
        {newImage && file ? (
          <img className="image" src={URL.createObjectURL(file)} alt="" />
        ) : (
          <div className="image"> </div>
        )}
        <InputLabel
          className="imageInputLabel"
          shrink
          id="pic-label"
          style={{ fontSize: "20px" }}
        >
          <input
            accept=".jpg, .jpeg, .png"
            className="imageInput"
            type="file"
            style={{ display: "none" }}
            onChange={handleChange}
          />
          Upload image
        </InputLabel>
      </div>
    </>
  );
};

export default ImageUploadForm;
