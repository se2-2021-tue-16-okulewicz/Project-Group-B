import React, { useState } from "react";
import "./ImageUpload.css";
import { Input, InputLabel } from "@material-ui/core";

const ImageUpload = (props: any) => {
  const [file, setFile] = useState(null);
  const [newImage, setNewImage] = useState(false);

  const handleChange = (event: any) => {
    setFile(event.target.files[0]);
    setNewImage(true);
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

        <div className="space"></div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <InputLabel
            shrink
            id="pic-label"
            style={{ marginTop: "440px", marginLeft: "44%", fontSize: "20px" }}
          >
            <Input
              type="file"
              style={{ display: "none" }}
              onChange={handleChange}
            />
            Upload image
          </InputLabel>
        </div>
      </div>
    </>
  );
};

export default ImageUpload;
