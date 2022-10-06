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
        var quarterHours = ["00", "75", "50", "25"];
        var sphere = [];
        for (var i = -16; i <= 10; i++) {
            for (var j = 0; j < 4; j++) {
                sphere.push(`${i + "." + quarterHours[j]}`);
            }
        }
        var cylinder = [];
        for (var i = -7; i <= 0; i++) {
            for (var j = 0; j < 4; j++) {
                cylinder.push(`${i + "." + quarterHours[j]}`);
            }
        }
    useEffect(() => {
        if (!userId) return;
     
        getEyePrescriprion();
    }, []);
    const getEyePrescriprion = async () => {
        try {
            const res = await Axios.get(`/api/prescriptions`, {
                params: { user_id: userId },
            });
            const prescriptionDetails = res?.data?.data;
            
            let rightEyeSPH=[];
            let rightEyeCYL=[];
            let leftEyeSPH=[];
            let leftEyeCYL=[];
            for (let index = 0; index < prescriptionDetails.length; index++) {
                const eye = prescriptionDetails[index];
                rightEyeSPH=[...rightEyeSPH,eye.sphere_from]
                leftEyeSPH=[...leftEyeSPH,eye.sphere_to]
                rightEyeCYL=[...rightEyeCYL,eye.cylinder_from]
                leftEyeCYL=[...leftEyeCYL,eye.cylinder_to]
            }

            setEyeData({
                rightEyeSPH,
                rightEyeCYL,
                leftEyeSPH,
                leftEyeCYL,
            });
        } catch (err) {
            console.log("error while get eyes Records");
        }
    };
    useEffect(()=>{
        console.log("the eye prescription data is here",eyeData)
    },[eyeData])
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
            const formData=new FormData();
            formData.append("right_eye_sphere",eyeValues?.rightEyeSPH)
            formData.append("right_eye_cylinder",eyeValues?.rightEyeCYL)
            formData.append("left_eye_sphere",eyeValues?.leftEyeSPH)
            formData.append("left_eye_cylinder",eyeValues?.leftEyeCYL)
            formData.append("user_id",userId)
            const res = await Axios.post(
                "/api/eye-prescriptions-calculator",
                formData
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
                            {/* sphere && sphere.sort((a, b) => a - b || a.localeCompare(b, undefined, {sensitivity: 'base'})).map((obj, i) => {
                                                    return <Option value={obj}>{obj}</Option>

                                                })           */}
                            <AntdSelect
                                options={sphere.sort((a, b) => a - b || a.localeCompare(b, undefined, {sensitivity: 'base'}))}
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
                                options={cylinder.sort((a, b) => a - b || a.localeCompare(b, undefined, {sensitivity: 'base'}))}
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
                                options={sphere.sort((a, b) => a - b || a.localeCompare(b, undefined, {sensitivity: 'base'}))}
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
                                options={cylinder.sort((a, b) => a - b || a.localeCompare(b, undefined, {sensitivity: 'base'}))}
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