import React, { useEffect, useState } from "react";
import CustomModal from "../../../../components/customModal";
import classes from "./styles.module.scss";
import closeIcon from "../../../../../images/cross.png";
import eyeLens from "../../../../../images/eye-lens.svg";
import AntdSelect from "../../../../components/customSelect/antdSelect";
import { connect } from "react-redux";
import Axios from "../../../../Http";

const EyePrescriptionModal = ({ onClose, userId }) => {
    const [eyeValues, setEyeValues] = useState({
        rightEyeSPH: "",
        rightEyeCYL: "",
        leftEyeSPH: "",
        leftEyeCYL: "",
    });

    useEffect(() => {
        const getEyePrescriprion = async () => {
            try {
                const res = await Axios.post("/api/eye-prescriptions", {
                    user_id: userId,
                });
                console.log("ressssssssssss", res);
            } catch (err) {
                console.log("error while get eyes Records");
            }
        };
        getEyePrescriprion();
    }, []);

    const handleValueChange = (value, key) => {
        setEyeValues({ ...eyeValues, [key]: value });
    };
    const handleDisable = () => {
        if (
            !!eyeValues?.rightEyeSPH &&
            !!eyeValues?.rightEyeCYL &&
            !!eyeValues?.leftEyeSPH &&
            !!eyeValues?.leftEyeCYL
        ) {
            return false;
        }
        return true;
    };
    const handleSubmit = async () => {
        try {
            try {
                const res = await Axios.post(
                    "/api/eye-prescriptions-calculator",
                    {
                        right_eye_sphere: eyeValues?.rightEyeSPH,
                        right_eye_cylinder: eyeValues?.rightEyeCYL,
                        left_eye_sphere: eyeValues?.leftEyeSPH,
                        left_eye_cylinder: eyeValues?.leftEyeCYL,
                    }
                );
                console.log("ressssssssssss", res);
            } catch (err) {
                console.log("error while get eyes Records");
            }
        } catch (err) {
            console.log("error while submit Eye Details");
        }
    };
    return (
        <CustomModal onClose={onClose}>
            <div
                className={classes["container"]}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
            >
                <img
                    src={closeIcon}
                    alt={"close"}
                    className={classes["close-icon"]}
                    onClick={onClose}
                />
                <div className={classes["top-label"]}>
                    EYE PRESCRIPTION CALCULATOR
                </div>
                <LensSlot label={"Right Eye"} className={classes["margin"]}>
                    <div className={classes["select-section"]}>
                        <div
                            className={classes["info-section"]}
                            style={{ marginRight: "20px" }}
                        >
                            <div className={classes["select-label"]}>
                                Sphere (SPH)
                            </div>
                            <AntdSelect
                                options={NAME_OPTIONS}
                                placeholder="Select Spherical"
                                style={{ width: "345px" }}
                                value={eyeValues?.rightEyeSPH}
                                onChange={(value) =>
                                    handleValueChange(value, "rightEyeSPH")
                                }
                            />
                        </div>
                        <div className={classes["info-section"]}>
                            <div className={classes["select-label"]}>
                                Cylinder (CYL)
                            </div>
                            <AntdSelect
                                style={{ width: "345px" }}
                                options={NAME_OPTIONS}
                                placeholder="Select Cylinder"
                                value={eyeValues?.rightEyeCYL}
                                onChange={(value) =>
                                    handleValueChange(value, "rightEyeCYL")
                                }
                            />
                        </div>
                    </div>
                </LensSlot>
                <LensSlot label={"Left Eye"} className={classes["margin"]}>
                    <div className={classes["select-section"]}>
                        <div
                            className={classes["info-section"]}
                            style={{ marginRight: "20px" }}
                        >
                            <div className={classes["select-label"]}>
                                Sphere (SPH)
                            </div>
                            <AntdSelect
                                style={{ width: "345px" }}
                                options={NAME_OPTIONS}
                                placeholder="Select Spherical"
                                value={eyeValues?.leftEyeSPH}
                                onChange={(value) =>
                                    handleValueChange(value, "leftEyeSPH")
                                }
                            />
                        </div>
                        <div className={classes["info-section"]}>
                            <div className={classes["select-label"]}>
                                Cylinder (CYL)
                            </div>
                            <AntdSelect
                                style={{ width: "345px" }}
                                options={NAME_OPTIONS}
                                placeholder="Select Cylinder"
                                value={eyeValues?.leftEyeCYL}
                                onChange={(value) =>
                                    handleValueChange(value, "leftEyeCYL")
                                }
                            />
                        </div>
                    </div>
                </LensSlot>
                <button
                    className={classes["submit-button"]}
                    disabled={handleDisable()}
                    onClick={handleSubmit}
                    style={{
                        backgroundColor: handleDisable()
                            ? "#cbcbcb"
                            : "#90B0C6",
                    }}
                >
                    Submit
                </button>
                <div className={classes["top-label"]}>
                    EYE PRESCRIPTION MATERIAL RESULT:
                </div>
                <LensSlot label={"Right Eye"} className={classes["margin"]}>
                    <div className={classes["answer-section"]}>
                        <AnswerSlot
                            title={"Sphere (SPH)"}
                            value={"-15.00"}
                            className={classes["margin-right"]}
                        />
                        <AnswerSlot
                            title={"Cylinder (CYL)"}
                            value={"-4.25"}
                            className={classes["margin-right"]}
                        />
                        <AnswerSlot
                            title={"Lens material to use?"}
                            value={"Lens material to use?"}
                        />
                    </div>
                </LensSlot>
                <LensSlot label={"Right Eye"}>
                    <div className={classes["answer-section"]}>
                        <AnswerSlot
                            title={"Sphere (SPH)"}
                            value={"-15.00"}
                            className={classes["margin-right"]}
                        />
                        <AnswerSlot
                            title={"Cylinder (CYL)"}
                            value={"2.75"}
                            className={classes["margin-right"]}
                        />
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

const mapStateToProps = (state) => ({
    userId: state.Auth.user?.id,
});
export default connect(mapStateToProps)(EyePrescriptionModal);

const AnswerSlot = ({ title, value, className }) => {
    return (
        <div className={`${classes["answer-container"]} ${className}`}>
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
