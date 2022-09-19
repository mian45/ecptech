import React from "react";
import classes from "./styles.module.scss";
import addIcon from "../../../../images/add-card-icon.png";

const AddNewCard = () => {
    return (
        <div className={classes["container"]}>
            <img src={addIcon} alt="add-card" className={classes["add-icon"]} />
            <div className={classes["title"]}>Add New Card</div>
        </div>
    );
};

export default AddNewCard;
