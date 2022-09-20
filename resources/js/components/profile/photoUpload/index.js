import { ErrorMessage } from "formik";
import React, { useState } from "react";
import CustomInput from "../../customInput";
import classes from "./styles.module.scss";

const PhotoUpload = ({
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldError,
}) => {
    const [selectedImage, setSelectedImage] = useState("");

    const uploadMediaFile = async (event) => {
        try {
            setFieldError("profileImage", "");
            if (event.target.files && event.target.files.length > 0) {
                const file = event.target.files[0];
                const size = GetFileSize(file);
                if (size <= 10) {
                    setFieldValue("profileImage", file);
                    setSelectedImage(
                        URL.createObjectURL(event?.target?.files[0])
                    );
                } else {
                    setFieldError("profileImage", "Error! Try again");
                }
            }
        } catch (err) {
            setFieldError("profileImage", "Error! Try again");
            console.log("Error while uploading media file!");
        }
    };

    return (
        <div className={classes["container"]}>
            <div className={classes["label"]}>Business Information</div>

            <div className={classes["image-container"]}>
                <label
                    htmlFor="profileImage"
                    className={classes[selectedImage ? "icon" : "photo-upload"]}
                >
                    {selectedImage ? (
                        <img
                            alt="not found"
                            className={classes["photo-upload"]}
                            src={selectedImage}
                        ></img>
                    ) : (
                        <>
                            <div>Upload Logo</div>
                            <div>200 x 40</div>
                        </>
                    )}
                    <input
                        className={classes["input-button"]}
                        accept={".png,.jpg,.jpeg"}
                        id="profileImage"
                        type="file"
                        onChange={uploadMediaFile}
                        multiple={false}
                        name={"profileImage"}
                        onBlur={handleBlur}
                    />
                </label>
            </div>
            <ErrorMessage
                name="profileImage"
                component="div"
                className={classes["error"]}
            />
            <label className={classes["subtitle"]}>Business Name</label>
            <CustomInput
                type={"text"}
                placeholder={"Enter business name"}
                value={values?.businessName}
                onChange={handleChange}
                onBlur={handleBlur}
                id="businessName"
                name="businessName"
            />
            <ErrorMessage
                name="businessName"
                component="div"
                className={classes["error"]}
            />
        </div>
    );
};

export default PhotoUpload;

const GetFileSize = (file) => {
    if (file) {
        return (
            file.size /
            process.env.MIX_REACT_FILE_SIZE /
            process.env.MIX_REACT_FILE_SIZE
        ); // Return size in MB
    }
    throw new Error("No File Found");
};
