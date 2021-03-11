import React, { useState } from "react";
import Grid from '@material-ui/core/Grid';
import "./ImageUpload.css";
import LostDog from "./LostDog.jpg";
import { Input, InputLabel } from '@material-ui/core';

const ImageUpload = (props: any) => {
    const [file, setFile] = useState(null);
    const [newImage, setNewImage] = useState(false);

    const handleChange = (event: any) => {
        setFile(event.target.files[0]);
        setNewImage(true);
        const f = event.target.files[0];
        props.handlePicturesChange(f);
    };
    return (
        <>
            <div className="imageContainer">
                {newImage ? (
                    <img className="image" src={URL.createObjectURL(file)} alt="" />
                ) : (
                        <img className="image" src={LostDog} alt="" />
                    )}

                <div className="space"></div>
                <InputLabel id="pic-label" style={{marginTop:"88%",alignSelf:"center", marginLeft:"30%"}}>
                <Input
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleChange}
                />
                
                    Upload an image
                        </InputLabel>

            </div>
        </>
    );
};
//}
export default ImageUpload;