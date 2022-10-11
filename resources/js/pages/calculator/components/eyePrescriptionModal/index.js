import React, { useEffect, useState } from "react";
import CustomModal from "../../../../components/customModal";
import classes from "./styles.module.scss";
import closeIcon from "../../../../../images/cross.png";
import eyeLens from "../../../../../images/eye-lens.svg";
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
    const [values, setValues] = useState({ sphare: {}, cylinder: {} });
    useEffect(() => {
        var quarterHours = ["00", "75", "50", "25"];
        var sphere = [];
        for (var i = -16; i <= 10; i++) {
            if (i === 10 || i === -16) {
                sphere.push(i + ".00");
            } else {
                for (var j = 0; j < 4; j++) {
                    const key = `${i + "." + quarterHours[j]}`;
                    sphere.push(key);
                }
            }
        }
        var cylinder = [];
        for (var i = -7; i <= 0; i++) {
            if (i === 0 || i === -7) {
                cylinder.push(i + ".00");
            } else {
                for (var j = 0; j < 4; j++) {
                    const key = `${i + "." + quarterHours[j]}`;
                    cylinder.push(key);
                }
            }
        }
        const sortedSphere = [...sphere].sort();
        const sortedCylinder = [...cylinder].sort();
        let sphareObj = {};
        let cylinderObj = {};
        sortedSphere.forEach((sph) => {
            sphareObj = { ...sphareObj, [sph]: sph };
        });
        sortedCylinder.forEach((cyl) => {
            cylinderObj = { ...cylinderObj, [cyl]: cyl };
        });
        setValues({ sphare: sphareObj, cylinder: cylinderObj });
    }, []);

    useEffect(() => {
        if (!userId) return;

        getEyePrescriprion();
    }, [userId]);
    const getEyePrescriprion = async () => {
        try {
            const res = await Axios.get(`/api/prescriptions`, {
                params: { user_id: userId },
            });
            const prescriptionDetails = res?.data?.data;

            let rightEyeSPH = [];
            let rightEyeCYL = [];
            let leftEyeSPH = [];
            let leftEyeCYL = [];
            for (let index = 0; index < prescriptionDetails.length; index++) {
                const eye = prescriptionDetails[index];
                rightEyeSPH = [...rightEyeSPH, eye.sphere_from];
                leftEyeSPH = [...leftEyeSPH, eye.sphere_to];
                rightEyeCYL = [...rightEyeCYL, eye.cylinder_from];
                leftEyeCYL = [...leftEyeCYL, eye.cylinder_to];
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
            const formData = new FormData();
            formData.append("right_eye_sphere", eyeValues?.rightEyeSPH);
            formData.append("right_eye_cylinder", eyeValues?.rightEyeCYL);
            formData.append("left_eye_sphere", eyeValues?.leftEyeSPH);
            formData.append("left_eye_cylinder", eyeValues?.leftEyeCYL);
            formData.append("user_id", userId);
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
                                suggestedMaterial?.rightEye?.materialToUse ||
                                "No suggession found"
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
                                suggestedMaterial?.leftEye?.materialToUse ||
                                "No suggession found"
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

                            <SelectSlot
                                placeholder="Select Spherical"
                                value={eyeValues?.rightEyeSPH}
                                options={values?.sphare}
                                onChange={(value) =>
                                    handleValueChange(
                                        value.target?.value,
                                        "rightEyeSPH"
                                    )
                                }
                            />
                        </div>
                        <div className={classes["info-section"]}>
                            <div className={classes["select-label"]}>
                                Cylinder (CYL)
                            </div>
                            <SelectSlot
                                placeholder="Select Cylinder"
                                value={eyeValues?.rightEyeCYL}
                                options={values?.cylinder}
                                onChange={(value) =>
                                    handleValueChange(
                                        value.target?.value,
                                        "rightEyeCYL"
                                    )
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
                            <SelectSlot
                                placeholder="Select Spherical"
                                value={eyeValues?.leftEyeSPH}
                                options={values?.sphare}
                                onChange={(value) =>
                                    handleValueChange(
                                        value.target?.value,
                                        "leftEyeSPH"
                                    )
                                }
                            />
                        </div>
                        <div className={classes["info-section"]}>
                            <div className={classes["select-label"]}>
                                Cylinder (CYL)
                            </div>
                            <SelectSlot
                                placeholder="Select Cylinder"
                                value={eyeValues?.leftEyeCYL}
                                options={values?.cylinder}
                                onChange={(value) =>
                                    handleValueChange(
                                        value.target?.value,
                                        "leftEyeCYL"
                                    )
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

const SelectSlot = ({ options, ...rest }) => {
    const values = Object.keys(options).sort(
        (a, b) =>
            a - b || a.localeCompare(b, undefined, { sensitivity: "base" })
    );
    return (
        <select className={classes["select-prescription"]} {...rest}>
            <option value={""}></option>
            {values?.map((option, index) => (
                <option value={option} key={index}>
                    {options[option]}
                </option>
            ))}
        </select>
    );
};
