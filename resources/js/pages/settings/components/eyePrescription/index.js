import React, { useEffect, useState } from "react";
import classes from "./styles.module.scss";
import Axios from "../../../../Http";
import { connect } from "react-redux";

const EyePrescription = ({ userId }) => {
    const [eyeDetails, setEyeDetails] = useState([]);
    const [sphError, setSphError] = useState([...defaultSphError]);
    const [cylError, setCylError] = useState([...defaultCylError]);
    const [disable, setDisable] = useState(false);

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
                const res = await Axios.get(
                    `${process.env.MIX_REACT_APP_URL}/api/prescriptions`,
                    {
                        params: { user_id: userId },
                    }
                );
                const arrangedData = getArrangedMaterials(res?.data?.data);
                setEyeDetails(arrangedData);
            } catch (err) {
                console.log("Error while getting lens Details");
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
            const regix = new RegExp("[+-]?([0-9]*[.])?[0-9]+");
            if (regix.test(value) || value === "") {
                handleCyl(value, name, key, +value);
            } else {
                return;
            }
        } else {
            const regix = new RegExp("[+-]?([0-9]*[.])?[0-9]+");
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

        const isError = eyeDetails?.some((item) => {
            if (
                item?.cylinder_from <= parsedValue &&
                item?.cylinder_to >= parsedValue
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
            }
        }
    };
    const handleSph = (value, name, key, parsedValue) => {
        if (value > 20 || value < -20) {
            handleSPHError(name);
            return;
        }
        const isError = eyeDetails?.some((item) => {
            if (
                item?.sphere_from <= parsedValue &&
                item?.sphere_to >= parsedValue
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
            }
        }
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                eye_prescriptions: eyeDetails,
                user_id: userId,
            };
            await Axios.post(
                `${process.env.MIX_REACT_APP_URL}/api/eye-prescriptions`,
                payload
            );
        } catch (err) {
            console.log("error while save data");
        }
    };
    return (
        <div className={classes["container"]}>
            <div className={classes["page-title"]}>
                Eye Prescription Setting
            </div>
            <div className={classes["content-map-container"]}>
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
                <div className={classes["button-wrapper"]}>
                    <button
                        className={classes["button"]}
                        onClick={handleSubmit}
                        disabled={disable}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
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
        <div className={classes["slot-container"]}>
            <div className={classes["slot-header"]}>
                <div className={classes["header-title"]}>{`Show ${
                    data?.name || ""
                } If`}</div>
            </div>
            <div className={classes["slot-body"]}>
                <div className={classes["slot-body-content"]}>
                    <div className={classes["slot-body-label"]}>
                        Sphere (SPH)
                    </div>
                    <div className={classes["slot-body-input-section"]}>
                        <input
                            type={"number"}
                            placeholder={"From"}
                            className={classes["input"]}
                            step={0.01}
                            min={-20}
                            max={20}
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
                            type={"number"}
                            step={0.01}
                            min={-20}
                            max={20}
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
                </div>
                <div className={classes["slot-body-content"]}>
                    <div className={classes["slot-body-label"]}>
                        Cylinder (CYL)
                    </div>
                    <div className={classes["slot-body-input-section"]}>
                        <input
                            placeholder={"From"}
                            className={classes["input"]}
                            type={"number"}
                            step={0.01}
                            min={-10}
                            max={10}
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
                            type={"number"}
                            step={0.01}
                            min={-10}
                            max={10}
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
                </div>
            </div>
        </div>
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
        materialsList.push(targetedMaterial);
    });
    return materialsList;
};
