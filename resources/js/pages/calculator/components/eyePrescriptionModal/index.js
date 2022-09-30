import React, { useEffect, useState } from "react";
import CustomModal from "../../../../components/customModal";
import classes from "./styles.module.scss";
import closeIcon from "../../../../../images/cross.png";
import eyeLens from "../../../../../images/eye-lens.svg";
import AntdSelect from "../../../../components/customSelect/antdSelect";
import { connect } from "react-redux";
import Axios from "../../../../Http";

const defaultEyeValues = {
    rightEyeSPH: "",
    rightEyeCYL: "",
    leftEyeSPH: "",
    leftEyeCYL: "",
};
const defaultEyeResponse = {
    rightEyeSPH: [],
    rightEyeCYL: [],
    leftEyeSPH: [],
    leftEyeCYL: [],
};

const defaultSuggession = {
    rightEye: {
        CYL: "",
        SPH: "",
        materialToUse: "",
    },
    leftEye: { CYL: "", SPH: "", materialToUse: "" },
};

const EyePrescriptionModal = ({ onClose, userId }) => {
    const [eyeValues, setEyeValues] = useState({ ...defaultEyeValues });
    const [eyeData, setEyeData] = useState({ ...defaultEyeResponse });
    const [showResult, setShowResult] = useState(false);
    const [suggestedMaterial, setSuggestedMaterial] =
        useState(defaultSuggession);
    useEffect(() => {
        if (!userId) return;
        const getEyePrescriprion = async () => {
            try {
                const res = await Axios.get("/api/get-eye-prescriptions", {
                    params: { user_id: userId },
                });
                const prescriptionDetails = res?.data?.data;
                setEyeData({
                    rightEyeSPH: [...prescriptionDetails?.right_eye_sph],
                    rightEyeCYL: [...prescriptionDetails?.right_eye_cyl],
                    leftEyeSPH: [...prescriptionDetails?.left_eye_sph],
                    leftEyeCYL: [...prescriptionDetails?.left_eye_cyl],
                });
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
            const payload = {
                right_eye_sphere: eyeValues?.rightEyeSPH,
                right_eye_cylinder: eyeValues?.rightEyeCYL,
                left_eye_sphere: eyeValues?.leftEyeSPH,
                left_eye_cylinder: eyeValues?.leftEyeCYL,
            };
            const res = await Axios.post(
                "/api/eye-prescriptions-calculator",
                payload
            );
            const materialData = res?.data?.data?.use_material;
            const processedData = {
                rightEye: {
                    CYL: materialData?.right_eye_material?.cylinder,
                    SPH: materialData?.right_eye_material?.sphere,
                    materialToUse:
                        materialData?.right_eye_material?.used_meterial,
                },
                leftEye: {
                    CYL: materialData?.left_eye_material?.cylinder,
                    SPH: materialData?.left_eye_material?.sphere,
                    materialToUse:
                        materialData?.left_eye_material?.used_meterial,
                },
            };
            setShowResult(true);
            setSuggestedMaterial(processedData);
        } catch (err) {
            console.log("error while submit Eye Details");
        }
    };

    const prescriptionResult = () => {
        if (!showResult) return <></>;
        return (
            <>
                <div className={classes["top-label"]}>
                    EYE PRESCRIPTION MATERIAL RESULT:
                </div>
                <LensSlot label={"Right Eye"} className={classes["margin"]}>
                    <div className={classes["answer-section"]}>
                        <AnswerSlot
                            title={"Sphere (SPH):"}
                            value={suggestedMaterial?.rightEye?.SPH || ""}
                            className={classes["margin-right"]}
                        />
                        <AnswerSlot
                            title={"Cylinder (CYL):"}
                            value={suggestedMaterial?.rightEye?.CYL || ""}
                            className={classes["margin-right"]}
                        />
                        <AnswerSlot
                            title={"Lens material to use?:"}
                            value={
                                suggestedMaterial?.rightEye?.materialToUse || ""
                            }
                        />
                    </div>
                </LensSlot>
                <LensSlot label={"Left Eye"}>
                    <div className={classes["answer-section"]}>
                        <AnswerSlot
                            title={"Sphere (SPH):"}
                            value={suggestedMaterial?.leftEye?.SPH || ""}
                            className={classes["margin-right"]}
                        />
                        <AnswerSlot
                            title={"Cylinder (CYL):"}
                            value={suggestedMaterial?.leftEye?.CYL || ""}
                            className={classes["margin-right"]}
                        />
                        <AnswerSlot
                            title={"Lens material to use?:"}
                            value={
                                suggestedMaterial?.leftEye?.materialToUse || ""
                            }
                        />
                    </div>
                </LensSlot>
            </>
        );
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
                                options={ConvertEyeData(eyeData?.rightEyeSPH)}
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
                                options={ConvertEyeData(eyeData?.rightEyeCYL)}
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
                                options={ConvertEyeData(eyeData?.leftEyeSPH)}
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
                                options={ConvertEyeData(eyeData?.leftEyeCYL)}
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
                {prescriptionResult()}
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

const ConvertEyeData = (data) => {
    return data?.reduce((item, index) => ({ ...item, [index]: index }), {});
};
