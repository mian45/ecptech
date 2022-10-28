import React, { useEffect, useState } from "react";
import classes from "./styles.module.scss";
import Axios from "../../../../Http";
import { connect } from "react-redux";

const EyePrescription = ({ userId }) => {
    const [eyeDetails, setEyeDetails] = useState([]);

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
            const eyePrescription = [...eyeDetails];

            const selectedMaterial = [...eyePrescription].find(
                (material) => material?.name === name
            );
            selectedMaterial[key] = value;
            setEyeDetails([...eyePrescription]);
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
                        />
                    );
                })}
                <div className={classes["button-wrapper"]}>
                    <button
                        className={classes["button"]}
                        onClick={handleSubmit}
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

const EyePrescriptionSlot = ({ data, onChange }) => {
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
                            value={data["sphere_from"]}
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
                            value={data["sphere_to"]}
                            onChange={(e) =>
                                onChange(
                                    e.target?.value,
                                    data?.name,
                                    "sphere_to"
                                )
                            }
                        />
                    </div>
                </div>
                <div className={classes["slot-body-content"]}>
                    <div className={classes["slot-body-label"]}>
                        Cylinder (CYL)
                    </div>
                    <div className={classes["slot-body-input-section"]}>
                        <input
                            className={classes["input"]}
                            type={"number"}
                            step={0.01}
                            min={-10}
                            max={10}
                            value={data["cylinder_from"]}
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
                            value={data["cylinder_to"]}
                            onChange={(e) =>
                                onChange(
                                    e.target?.value,
                                    data?.name,
                                    "cylinder_to"
                                )
                            }
                        />
                    </div>
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

const getArrangedMaterials = (data) => {
    let materialsList = [];
    materialArrangement?.forEach((material) => {
        const targetedMaterial = data?.find((item) => item?.name === material);
        materialsList.push(targetedMaterial);
    });
    return materialsList;
};
