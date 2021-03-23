import React, { useState } from "react";
import "./ImageUpload.css";
import { Input, InputLabel } from "@material-ui/core";

const ImageUpload = (props: any) => {
  //let refresh = sessionStorage.getItem("newImage") === "true";
  const [file, setFile] = useState(null);
  const [newImage, setNewImage] = useState(false);

  const handleChange = (event: any) => {
    let newFile = event.target.files[0];
    setFile(newFile);
    //sessionStorage.setItem("file", JSON.stringify(newFile));
    setNewImage(true);
    //sessionStorage.setItem("newImage", "true");
    let f = event.target.files[0];
    props.handlePicturesChange(f);
  };

  return (
    <>
      <div className="imageContainer">
        {newImage ? (
          <img className="image" src={URL.createObjectURL(file)} alt="" />
        ) : (
          <div className="image"> </div>
        )}
        <InputLabel
          className="imageInputLabel"
          shrink
          id="pic-label"
          style={{ marginTop: "440px", marginLeft: "42%", fontSize: "20px" }}
        >
          <Input
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

export default ImageUpload;
