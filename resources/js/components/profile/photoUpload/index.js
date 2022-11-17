import { ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";
import CustomInput from "../../customInput";
import classes from "./styles.module.scss";
import AddImage from "../../../assets/add-icon.svg"
import { connect} from "react-redux"
const PhotoUpload = ({
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldError,
    user
}) => {
    const [selectedImage, setSelectedImage] = useState(null);
useEffect(()=>{
    setSelectedImage(user.logo)
    values.profileImage=user.logo
},[user])
    const uploadMediaFile = async (event) => {
        try {
            handleChange(event)
            setFieldError("profileImage", "");
            if (event.target.files && event.target.files.length > 0) {
                const file = event.target.files[0];
                const size = GetFileSize(file);
                console.log("the data is before here",file,size)
                if (file.size<= 2097152) {
                    console.log("the data is here",URL.createObjectURL(file))
                    setFieldValue("profileImage", file);
                    setSelectedImage(
                        URL.createObjectURL(file)
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
                    {selectedImage!==null && selectedImage!==undefined ? (
                        <img
                            alt="not found"
                            className={classes["photo-upload"]}
                            src={selectedImage}
                        ></img>
                    ) : (
                        <>  
                            <img src={AddImage}/>
                            <div className={classes['add-image-text']}>Upload Logo</div>
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
const mapStateToProps = (state) => ({
    user: state.Auth.user,
});
export default connect(mapStateToProps)(PhotoUpload);

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
