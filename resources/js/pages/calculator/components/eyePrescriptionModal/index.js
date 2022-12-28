import React, { useEffect, useState } from "react";
import CustomModal from "../../../../components/customModal";
import classes from "./styles.module.scss";
import closeIcon from "../../../../../images/cross.png";
import eyeLens from "../../../../../images/eye-lens.svg";
import { connect } from "react-redux";
import Axios from "../../../../Http";
import { Col, Modal, Row } from "antd";
import UseWindowSize from "../../../../hooks/windowResize";

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
const plans={
            "VSP Signature": 'vsp',
            "VSP Choice": 'vsp',
            "Private Pay": 'vsp',
            "VSP Advantage": 'vsp',
            'Eyemed': 'davis',
            "Davis Vision": 'eyemed',
            "Spectra": 'spectra',
            "VBA": 'vba',
}
const EyePrescriptionModal = ({ onClose, userId, clientUserId, userRole, onOpen,plan }) => {
    const [eyeValues, setEyeValues] = useState({ ...defaultEyeValues });
    const [eyeData, setEyeData] = useState({ ...defaultEyeResponse });
    const [showResult, setShowResult] = useState(false);
    const [suggestedMaterial, setSuggestedMaterial] =
        useState(defaultSuggession);
    const [values, setValues] = useState({ sphare: {}, cylinder: {} });
    const { width } = UseWindowSize();
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
    const handleValueChange = (value, key) => {
        if (
            key === "rightEyeSPH" &&
            (parseFloat(value) <= -21 || parseFloat(value) >= 21)
        ) {
            return;
        } else if (
            key === "rightEyeCYL" &&
            (parseFloat(value) <= -11 || parseFloat(value) >= 11)
        ) {
            return;
        } else if (
            key === "leftEyeSPH" &&
            (parseFloat(value) <= -21 || parseFloat(value) >= 21)
        ) {
            return;
        } else if (
            key === "leftEyeCYL" &&
            (parseFloat(value) <= -11 || parseFloat(value) >= 11)
        ) {
            return;
        } else {
            setEyeValues({ ...eyeValues, [key]: value });
        }
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
            let clientId = userId;
            if (userRole === "staff") {
                clientId = clientUserId;
            }
            const formData = new FormData();
            formData.append("right_eye_sphere", parseFloat(eyeValues?.rightEyeSPH));
            formData.append("right_eye_cylinder", parseFloat(eyeValues?.rightEyeCYL));
            formData.append("left_eye_sphere", parseFloat(eyeValues?.leftEyeSPH));
            formData.append("left_eye_cylinder", parseFloat(eyeValues?.leftEyeCYL));
            formData.append("user_id", clientId);
            formData.append("plan", plans[plan?.title]);
            const res = await Axios.post(
                `${process.env.MIX_REACT_APP_URL}/api/eye-prescriptions-calculator`,
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

        const getResult = () => {
            const rightMaterial = getIndexByMaterial(
                suggestedMaterial?.rightEye?.materialToUse
            );
            const leftMaterial = getIndexByMaterial(
                suggestedMaterial?.leftEye?.materialToUse
            );
            if (leftMaterial <= rightMaterial) {
                return suggestedMaterial?.leftEye?.materialToUse;
            } else {
                return suggestedMaterial?.rightEye?.materialToUse;
            }
        };

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
                            value={getResult() || "No suggession found"}
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
                            value={getResult() || "No suggession found"}
                        />
                    </div>
                </LensSlot>
            </>
        );
    };
    return (

        <Modal
            title=""
            open={onOpen}
            onCancel={onClose}
            forceRender={false}
            wrapClassName="prescriptionModal"
            bodyStyle={{
                height: "auto !important",
            }}
            style={{
                "top": "0",
                "padding-bottom": 0,
                "padding-right": "1.5%",
                "padding-left": "1.5%",
                "margin-top": "5%",
                "margin-bottom": "5%",
                "maxWidth": "100%"
            }}
            width={width <= 600 ? "96%" : 860}
            zIndex="99999"
            footer={null}
        >
            <Row justify="center">
                <Col sm={24}>
                    <div className={classes["top-label"]}>
                        GLASSES PRESCRIPTION CALCULATOR
                    </div>
                </Col>
            </Row>
            <Row>
                <Col sm={24}>
                    <LensSlot label={"Right Eye"} className={classes["margin"]}>
                        <div className={classes["select-section"]}>
                            <Row>
                                <Col sm={12}>
                                    <div
                                        className={classes["info-section"]}

                                    >
                                        <div className={classes["select-label"]}>
                                            Sphere (SPH)
                                        </div>
                                        <input
                                            placeholder="Select Spherical"
                                            className={classes["input"]}
                                            value={eyeValues?.rightEyeSPH}
                                            onChange={(value) =>
                                                handleValueChange(
                                                    value.target?.value,
                                                    "rightEyeSPH"
                                                )
                                            }
                                            type={"number"}
                                            step={0.01}
                                            min={-20}
                                            max={20}
                                        />


                                    </div>
                                </Col>
                                <Col sm={12}>
                                    <div className={classes["info-section"]}>
                                        <div className={classes["select-label"]}>
                                            Cylinder (CYL)
                                        </div>
                                        <input
                                            placeholder="Select Cylinder"
                                            className={classes["input"]}
                                            value={eyeValues?.rightEyeCYL}
                                            onChange={(value) =>
                                                handleValueChange(
                                                    value.target?.value,
                                                    "rightEyeCYL"
                                                )
                                            }
                                            type={"number"}
                                            step={0.01}
                                            min={-10}
                                            max={10}
                                        />

                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </LensSlot>





                </Col>
            </Row>

            <Row>
                <Col sm={24}>
                    <LensSlot label={"Left Eye"} className={classes["margin"]}>
                        <div className={classes["select-section"]}>
                            <Row>
                                <Col sm={12}>
                                    <div
                                        className={classes["info-section"]}

                                    >
                                        <div className={classes["select-label"]}>
                                            Sphere (SPH)
                                        </div>
                                        <input
                                            placeholder="Select Spherical"
                                            className={classes["input"]}
                                            value={eyeValues?.leftEyeSPH}
                                            onChange={(value) =>
                                                handleValueChange(
                                                    value.target?.value,
                                                    "leftEyeSPH"
                                                )
                                            }
                                            type={"number"}
                                            step={0.01}
                                            min={-20}
                                            max={20}
                                        />

                                    </div>
                                </Col>
                                <Col sm={12}>
                                    <div className={classes["info-section"]}>
                                        <div className={classes["select-label"]}>
                                            Cylinder (CYL)
                                        </div>
                                        <input
                                            placeholder="Select Cylinder"
                                            className={classes["input"]}
                                            value={eyeValues?.leftEyeCYL}
                                            onChange={(value) =>
                                                handleValueChange(
                                                    value.target?.value,
                                                    "leftEyeCYL"
                                                )
                                            }
                                            type={"number"}
                                            step={0.01}
                                            min={-10}
                                            max={10}
                                        />

                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </LensSlot>
                </Col>
            </Row>
            <Row  >
                <Col sm={24} style={{ "text-align": 'center', "margin-left": "auto", "margin-right": "auto" }}>
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
                </Col>
            </Row>

        </Modal>


    );
};

const mapStateToProps = (state) => ({
    userId: state.Auth.user?.id,
    userRole: state.Auth.userRole?.name,
    clientUserId: state.Auth.clientUser?.id,
    plan: state?.Auth?.selectedPlan,
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

const getIndexByMaterial = (value) => {
    switch (value) {
        case "Hi index 1.70 & above":
            return 1;
        case "Hi index 1.67":
            return 2;
        case "Hi index 1.60":
            return 3;
        case "Trivex":
            return 4;
        case "Polycarbonate":
            return 5;
        case "CR39":
            return 6;
    }
};
