import React, { useEffect, useState } from "react";
import classes from "./styles.module.scss";
import Axios from "../../../../Http";
import { connect } from "react-redux";
import { defaultMaterials } from "./data";
import { Row, Col, message } from "antd"
import CustomLoader from "../../../../components/customLoader";
const EyePrescription = ({ userId }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [eyeDetails, setEyeDetails] = useState([]);
    const [sphError, setSphError] = useState([...defaultSphError]);
    const [cylError, setCylError] = useState([...defaultCylError]);
    const [disable, setDisable] = useState(false);
    const [buttonLoader, setButtonLoader] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const errorsList = [...sphError, ...cylError];
        const isError = errorsList.every((item) => item.value === "");
        if (!isError) {
            setDisable(true);
        } else {
            setDisable(false);
        }
    }, [cylError, sphError]);

    useEffect(() => {
        const getEyePrescriptionDetails = async () => {
            try {
                setLoading(true);
                const res = await Axios.get(
                    `${process.env.MIX_REACT_APP_URL}/api/prescriptions`,
                    {
                        params: { user_id: userId },
                    }
                );
                const material = defaultMaterials?.map(item => {
                    const singleMaterial = res?.data?.data?.find(val => val?.name === item?.name)
                    return {
                        ...item,
                        sphere_from: singleMaterial?.sphere_from || "",
                        sphere_to: singleMaterial?.sphere_to || "",
                        cylinder_from: singleMaterial?.cylinder_from || "",
                        cylinder_to: singleMaterial?.cylinder_to || "",
                    }
                })
                setEyeDetails(material);
                setLoading(false);
            } catch (err) {
                console.log("Error while getting glasses details");
                messageApi.open({
                    type: 'error',
                    content: res.data.message,
                    duration: 5,
                    style: {
                        marginTop: '13.5vh',
                    },
                });
            }
        };
        getEyePrescriptionDetails();
    }, []);

    const handleInputChange = (value, name, key) => {
        if (
            key === "sphere_from" &&
            (parseFloat(value) <= -21 || parseFloat(value) >= 21)
        ) {
            return;
        } else if (
            key === "sphere_to" &&
            (parseFloat(value) >= 21 || parseFloat(value) <= -21)
        ) {
            return;
        } else if (
            key === "cylinder_from" &&
            (parseFloat(value) <= -11 || parseFloat(value) >= 11)
        ) {
            return;
        } else if (
            key === "cylinder_to" &&
            (parseFloat(value) >= 11 || parseFloat(value) <= -11)
        ) {
            return;
        } else {
            handleInputValues(value, name, key);
        }
    };
    const handleInputValues = (value, name, key) => {
        if (key === "cylinder_from" || key === "cylinder_to") {
            const regix = new RegExp("^[-+]?[0-9]*[/.]?([0-9]*)?$");
            if (regix.test(value) || value === "") {
                handleCyl(value, name, key, +value);
            } else {
                return;
            }
        } else {
            const regix = new RegExp("^[-+]?[0-9]*[/.]?([0-9]*)?$");
            if (regix.test(value) || value === "") {
                handleSph(value, name, key, +value);
            } else {
                return;
            }
        }
    };

    const setEyeValue = (value, name, key) => {
        const eyePrescription = [...eyeDetails];
        const selectedMaterial = [...eyePrescription].find(
            (material) => material?.name === name
        );
        selectedMaterial[key] = value;
        setEyeDetails([...eyePrescription]);
    };
    const handleCYLError = (name) => {
        const error = [...cylError];
        const selectedError = [...error].find((item) => item?.label === name);
        selectedError.value = "Please choose a valid range";
        setCylError([...error]);
    };
    const handleSPHError = (name) => {
        const error = [...sphError];
        const selectedError = [...error].find((item) => item?.label === name);
        selectedError.value = "Please choose a valid range";
        setSphError([...error]);
    };
    const handleCyl = (value, name, key, parsedValue) => {
        if (value > 10 || value < -10) {
            handleCYLError(name);
            return;
        }
        const eyePrescription = [...eyeDetails];
        const selectedMaterial = [...eyePrescription].find(
            (material) => material?.name === name
        );
        selectedMaterial[key] = "";
        const isError = eyeDetails?.some((item) => {
            if (
                parseFloat(item?.cylinder_from) <= parsedValue &&
                parseFloat(item?.cylinder_to) >= parsedValue
            ) {
                return true;
            }
        });
        const error = [...cylError];
        const selectedError = [...error].find((item) => item?.label === name);
        if (isError) {
            if (key === "cylinder_from") {
                selectedError.from = true;
            }
            if (key === "cylinder_to") {
                selectedError.to = true;
            }
            handleCYLError(name);
            setEyeValue(value, name, key);
        } else {
            if (key === "cylinder_from") {
                selectedError.from = false;
            }
            if (key === "cylinder_to") {
                selectedError.to = false;
            }
            if (
                (key === "cylinder_from" && selectedError.to === false) ||
                (key === "cylinder_to" && selectedError.from === false)
            ) {
                selectedError.value = "";
                setCylError([...error]);
                setEyeValue(value, name, key);
            } else if (
                (key === "cylinder_from") ||
                (key === "cylinder_to")
            ) {
                setEyeValue(value, name, key);
            }
        }
    };
    const handleSph = (value, name, key, parsedValue) => {
        if (value > 20 || value < -20) {
            handleSPHError(name);
            return;
        }
        const eyePrescription = [...eyeDetails];
        const selectedMaterial = [...eyePrescription].find(
            (material) => material?.name === name
        );
        selectedMaterial[key] = "";
        const isError = [...eyeDetails]?.some((item) => {
            if (
                parseFloat(item?.sphere_from) <= parsedValue &&
                parseFloat(item?.sphere_to) >= parsedValue
            ) {
                return true;
            }
        });
        const error = [...sphError];
        const selectedError = [...error].find((item) => item?.label === name);
        if (isError) {
            if (key === "sphere_from") {
                selectedError.from = true;
            }
            if (key === "sphere_to") {
                selectedError.to = true;
            }
            handleSPHError(name);
            setEyeValue(value, name, key);
        } else {
            if (key === "sphere_from") {
                selectedError.from = false;
            }
            if (key === "sphere_to") {
                selectedError.to = false;
            }
            if (
                (key === "sphere_from" && selectedError.to === false) ||
                (key === "sphere_to" && selectedError.from === false)
            ) {
                selectedError.value = "";
                setSphError([...error]);
                setEyeValue(value, name, key);
            } else if ((key === "sphere_from") || (key === "sphere_to")) {
                setEyeValue(value, name, key);
            }
        }
    };

    const handleSubmit = async () => {
        try {
            setButtonLoader(true)
            const payload = {
                eye_prescriptions: eyeDetails,
                user_id: userId,
            };
            const res = await Axios.post(
                `${process.env.MIX_REACT_APP_URL}/api/eye-prescriptions`,
                payload
            );
            setButtonLoader(false)
            messageApi.open({
                type: 'success',
                content: res.data.message,
                duration: 5,
                style: {
                    marginTop: '13.5vh',
                },
            });
        } catch (err) {
            console.log("error while save data");
            messageApi.open({
                type: 'serror',
                content: res.data.message,
                duration: 5,
                style: {
                    marginTop: '13.5vh',
                },
            });
        }
    };

    const isIncompleteRange = () => {
        let isDisabled = false;
        for (let i = 0; i < eyeDetails?.length - 1; i++) {
            if ((Boolean(eyeDetails[i]?.sphere_from) && Boolean(eyeDetails[i]?.sphere_to)) ||
                (eyeDetails[i]?.sphere_from === "" && eyeDetails[i]?.sphere_to === "")) {
                isDisabled = false;
            } else {
                isDisabled = true;
                break;
            }
            if ((Boolean(eyeDetails[i]?.cylinder_from) && Boolean(eyeDetails[i]?.cylinder_to)) ||
                (eyeDetails[i]?.cylinder_from === "" && eyeDetails[i]?.cylinder_to === "")) {
                isDisabled = false;
            } else {
                isDisabled = true;
                break;
            }
        }

        return isDisabled
    }
    return (
        loading == true ?
            <CustomLoader buttonBool={false} />
            :
            <Row className={classes["container"]} justify="start" align="middle">
                <div>{contextHolder}</div>
                <Col xs={24} className={classes["page-title"]}>
                    Glasses Prescription Setting
                </Col>
                <Col xs={24} className={classes["content-map-container"]}>
                    <Row justify="center" align="middle">
                        <Col xs={24} md={14}>
                            {eyeDetails?.map((item, index) => {
                                return (
                                    <EyePrescriptionSlot
                                        key={index}
                                        data={item}
                                        onChange={handleInputChange}
                                        sphError={sphError}
                                        cylError={cylError}
                                    />
                                );
                            })}
                        </Col>
                        <Col xs={24} md={14} className={classes["button-wrapper"]}>
                            <Row justify="end" align="middle">
                                <Col xs={10} md={7} className={classes['btn-grid']}>
                                    <button
                                        className={classes["button"]}
                                        onClick={handleSubmit}
                                        disabled={disable || isIncompleteRange()}
                                    >
                                        {buttonLoader == false ?
                                            'Save' :
                                            <span>
                                                <p>Save</p>
                                                <CustomLoader buttonBool={true} />
                                            </span>
                                        }
                                    </button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
    );
};

const mapStateToProps = (state) => ({
    userId: state.Auth.user?.id,
});
export default connect(mapStateToProps)(EyePrescription);

const EyePrescriptionSlot = ({ data, onChange, sphError, cylError }) => {
    const sphErrValue = sphError?.find(
        (item) => data?.name === item?.label
    )?.value;
    const cylErrValue = cylError?.find(
        (item) => data?.name === item?.label
    )?.value;
    return (
        <Row className={classes["slot-container"]}>
            <Col xs={24} className={classes["slot-header"]}>
                <div className={classes["header-title"]}>{`Show ${data?.name || ""
                    } If`}</div>
            </Col>
            <Col xs={24} className={classes["slot-body"]}>
                <Row justify="space-between">
                    <Col xs={24} md={24} lg={12} className={classes["slot-body-content"]}>
                        <div className={classes["slot-body-label"]}>
                            Sphere (SPH)
                        </div>
                        <div className={classes["slot-body-input-section"]}>
                            <input
                                type={"text"}
                                placeholder={"From"}
                                className={classes["input"]}
                                value={data["sphere_from"] || ""}
                                onChange={(e) =>
                                    onChange(
                                        e.target?.value,
                                        data?.name,
                                        "sphere_from"
                                    )
                                }
                            />
                            <div className={classes["to-label"]}>to</div>
                            <input
                                placeholder={"Select"}
                                className={classes["input"]}
                                type={"text"}
                                value={data["sphere_to"] || ""}
                                onChange={(e) =>
                                    onChange(
                                        e.target?.value,
                                        data?.name,
                                        "sphere_to"
                                    )
                                }
                            />
                        </div>
                        {sphErrValue && (
                            <div className={classes["error"]}>{sphErrValue}</div>
                        )}
                    </Col>
                    <Col xs={24} md={24} lg={12} className={classes["slot-body-content"]}>
                        <div className={classes["slot-body-label"]}>
                            Cylinder (CYL)
                        </div>
                        <div className={classes["slot-body-input-section"]}>
                            <input
                                placeholder={"From"}
                                className={classes["input"]}
                                type={"text"}
                                value={data["cylinder_from"] || ""}
                                onChange={(e) =>
                                    onChange(
                                        e.target?.value,
                                        data?.name,
                                        "cylinder_from"
                                    )
                                }
                            />
                            <div className={classes["to-label"]}>to</div>
                            <input
                                placeholder={"Select"}
                                className={classes["input"]}
                                type={"text"}
                                value={data["cylinder_to"] || ""}
                                onChange={(e) =>
                                    onChange(
                                        e.target?.value,
                                        data?.name,
                                        "cylinder_to"
                                    )
                                }
                            />
                        </div>
                        {cylErrValue && (
                            <div className={classes["error"]}>{cylErrValue}</div>
                        )}
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

const materialArrangement = [
    "Hi index 1.70 & above",
    "Hi index 1.67",
    "Hi index 1.60",
    "Trivex",
    "Polycarbonate",
    "CR39",
];
const defaultSphError = [
    { value: "", label: "Hi index 1.70 & above", from: false, to: false },
    { value: "", label: "Hi index 1.67", from: false, to: false },
    { value: "", label: "Hi index 1.60", from: false, to: false },
    { value: "", label: "Trivex", from: false, to: false },
    { value: "", label: "Polycarbonate", from: false, to: false },
    { value: "", label: "CR39", from: false, to: false },
];
const defaultCylError = [
    { value: "", label: "Hi index 1.70 & above", from: false, to: false },
    { value: "", label: "Hi index 1.67", from: false, to: false },
    { value: "", label: "Hi index 1.60", from: false, to: false },
    { value: "", label: "Trivex", from: false, to: false },
    { value: "", label: "Polycarbonate", from: false, to: false },
    { value: "", label: "CR39", from: false, to: false },
];

const getArrangedMaterials = (data) => {
    let materialsList = [];
    materialArrangement?.forEach((material) => {
        const targetedMaterial = data?.find((item) => item?.name === material);
        if (targetedMaterial)
            materialsList.push(targetedMaterial);
    });
    return materialsList;
};
