import React from "react";
import CustomModal from "../../../../components/customModal";
import classes from "./styles.module.scss";
import closeIcon from "../../../../../images/cross.png";
import eyeLens from "../../../../../images/eye-lens.svg";
import CustomSelect from "../../../../components/customSelect";

const EyePrescriptionModal = ({ onClose }) => {
    return (
        <CustomModal onClose={onClose}>
            <div className={classes["container"]}>
                <img
                    src={closeIcon}
                    alt={"close"}
                    className={classes["close-icon"]}
                />
                <div className={classes["top-label"]}>
                    EYE PRESCRIPTION CALCULATOR
                </div>
                <LensSlot label={"Right Eye"} className={classes["margin"]}>
                    <div className={classes["select-section"]}>
                        <div className={classes["info-section"]}>
                            <div className={classes["select-label"]}>
                                Sphere (SPH)
                            </div>
                            <CustomSelect
                                style={{ width: "348px" }}
                                options={NAME_OPTIONS}
                                placeholder="Select Spherical"
                            />
                        </div>
                        <div className={classes["info-section"]}>
                            <div className={classes["select-label"]}>
                                Cylinder (CYL)
                            </div>
                            <CustomSelect
                                style={{ width: "348px" }}
                                options={NAME_OPTIONS}
                                placeholder="Select Cylinder"
                            />
                        </div>
                    </div>
                </LensSlot>
                <LensSlot label={"Left Eye"} className={classes["margin"]}>
                    <div className={classes["select-section"]}>
                        <div className={classes["info-section"]}>
                            <div className={classes["select-label"]}>
                                Sphere (SPH)
                            </div>
                            <CustomSelect
                                style={{ width: "348px" }}
                                options={NAME_OPTIONS}
                                placeholder="Select Spherical"
                            />
                        </div>
                        <div className={classes["info-section"]}>
                            <div className={classes["select-label"]}>
                                Cylinder (CYL)
                            </div>
                            <CustomSelect
                                style={{ width: "348px" }}
                                options={NAME_OPTIONS}
                                placeholder="Select Cylinder"
                            />
                        </div>
                    </div>
                </LensSlot>
                <button className={classes["submit-button"]}>Submit</button>
                <div className={classes["top-label"]}>
                    EYE PRESCRIPTION MATERIAL RESULT:
                </div>
                <LensSlot label={"Right Eye"} className={classes["margin"]}>
                    <div className={classes["answer-section"]}>
                        <AnswerSlot title={"Sphere (SPH)"} value={"-15.00"} />
                        <AnswerSlot title={"Cylinder (CYL)"} value={"-4.25"} />
                        <AnswerSlot
                            title={"Lens material to use?"}
                            value={"Lens material to use?"}
                        />
                    </div>
                </LensSlot>
                <LensSlot label={"Right Eye"}>
                    <div className={classes["answer-section"]}>
                        <AnswerSlot title={"Sphere (SPH)"} value={"-15.00"} />
                        <AnswerSlot title={"Cylinder (CYL)"} value={"2.75"} />
                        <AnswerSlot
                            title={"Lens material to use?"}
                            value={"Lens material to use?"}
                        />
                    </div>
                </LensSlot>
            </div>
        </CustomModal>
    );
};

export default EyePrescriptionModal;

const AnswerSlot = ({ title, value }) => {
    return (
        <div className={classes["answer-container"]}>
            <div className={classes["answer-title"]}>{title}</div>
            <div className={classes["answer-value"]}>{value}</div>
        </div>
    );
};

const LensSlot = ({ children, label, className }) => {
    return (
        <div className={`${classes["slot-container"]} ${className}`}>
            <div className={classes["label-container"]}>
                <img
                    src={eyeLens}
                    alt={"eye"}
                    className={classes["eye-icon"]}
                />
                <div className={classes["slot-label"]}>
                    {label || "Right Eye"}
                </div>
            </div>
            {children}
        </div>
    );
};

const NAME_OPTIONS = {
    john_doe: "John Doe",
    david_joe: "David Joe",
};
