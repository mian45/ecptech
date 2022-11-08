import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Select } from "antd";
const { Option } = Select;
import CustomLoader from "../components/customLoader";
import Axios from "../../js/Http";
import "./style.scss";

const EyePrescription = (props) => {
    const [saveState, setSaveState] = useState(false);
    const [loading , setLoading] = useState(false)
    const [buttonLoader , setButtonLoader] = useState(false)
    const [updateData, setUpdatedData] = useState([]);
    const [showData, setShowData] = useState([
        {
            name: "CR39",
            sphere_from: "",
            sphere_to: "",
            cylinder_from: "",
            cylinder_to: "",
        },
        {
            name: "Polycarbonate",
            sphere_from: "",
            sphere_to: "",
            cylinder_from: "",
            cylinder_to: "",
        },
        {
            name: "Trivex",
            sphere_from: "",
            sphere_to: "",
            cylinder_from: "",
            cylinder_to: "",
        },
        {
            name: "Hi Index 1.67",
            sphere_from: "",
            sphere_to: "",
            cylinder_from: "",
            cylinder_to: "",
        },
        {
            name: "Hi Index 1.70",
            sphere_from: "",
            sphere_to: "",
            cylinder_from: "",
            cylinder_to: "",
        },
        {
            name: "Hi Index 1.60",
            sphere_from: "",
            sphere_to: "",
            cylinder_from: "",
            cylinder_to: "",
        },
    ]);

    var quarterHours = ["00", "75", "50", "25"];
    var sphere = [];
    for (var i = -16; i <= 10; i++) {
        if (i === 10 || i === -16) {
            sphere.push(i + ".00");
        } else {
            for (var j = 0; j < 4; j++) {
                sphere.push(`${i + "." + quarterHours[j]}`);
            }
        }
    }
    var cylinder = [];
    for (var i = -7; i <= 0; i++) {
        if (i === 0 || i === -7) {
            cylinder.push(i + ".00");
        } else {
            for (var j = 0; j < 4; j++) {
                cylinder.push(`${i + "." + quarterHours[j]}`);
            }
        }
    }

    const handleSubmit = () => {
        addEyePrescriptions();
    };

    const handleChangeOption = (item, key, e, i) => {
        item[key] = e;
        setShowData((oldState) => {
            let oldStateUpdate = [...oldState];
            oldStateUpdate[i] = item;
            return oldStateUpdate;
        });
        setUpdatedData((oldState) => {
            let oldStateNew = [...oldState];
            let index = oldStateNew.findIndex((obj) => obj.name == item.name);
            if (index >= 0) {
                oldStateNew[index] = item;
            } else {
                oldStateNew.push(item);
            }
            return oldStateNew;
        });
    };

    const addEyePrescriptions = async () => {
        try {
            setButtonLoader(true)
            setSaveState(true);
            var data = {
                eye_prescriptions: updateData,
                user_id: props.userID,
            };
            const res = await Axios.post(
                process.env.MIX_REACT_APP_URL + "/api/eye-prescriptions",
                data
            );
            setButtonLoader(false)
        } catch {
            console.log("not updated");
        }
    };
    const getEyePrescriptions = async () => {
        try {
            setLoading(true)
            setSaveState(true);
            const res = await Axios.get(
                process.env.MIX_REACT_APP_URL +
                    `/api/prescriptions?user_id=${props.userID} `
            );
            if (res.data.data.length > 0) {
                let newState = [...showData];
                res.data.data.forEach((item, i) => {
                    let index = newState.findIndex(
                        (obj) => obj.name == item.name
                    );
                    if (index >= 0) {
                        newState[index] = item;
                    }
                });
                setShowData(newState);
            }
            setLoading(false)
            setSaveState(false);
        } catch (err) {
            setLoading(true)
            setSaveState(false);
            setLoading(false)
        }
    };
    useEffect(() => {
        getEyePrescriptions();
    }, []);
    return (
        loading == true ? 
                <CustomLoader buttonBool={false}/>  
                :
        <div className="eye-prescription">
            <p className="eye-prescription_heading">
            Glasses Prescription Settings
            </p>
            <div className="eye-wrapper-container">
                {showData &&
                    showData.length > 0 &&
                    showData.map((obj, i) => {
                        return (
                            <div className="eye-prescription_section">
                                <div className="eye-prescription_section-bar">
                                    <div className="eye-prescription_section-bar-first">
                                        <p>{`Show ${obj.name} if`}</p>
                                    </div>
                                    <div className="eye-prescription_section-bar-second">
                                        <div>
                                            <p>Sphere (SPH)</p>
                                            <div className="columns">
                                                <div>
                                                    <Select
                                                        className="eye-prescription_section-bar-second_dropdown"
                                                        // defaultValue="From"
                                                        style={{
                                                            width: 120,
                                                        }}
                                                        value={
                                                            obj.sphere_from ||
                                                            "From"
                                                        }
                                                        onChange={(e) => {
                                                            handleChangeOption(
                                                                obj,
                                                                "sphere_from",
                                                                e,
                                                                i
                                                            );
                                                        }}
                                                    >
                                                        {sphere &&
                                                            sphere
                                                                .sort(
                                                                    (a, b) =>
                                                                        a - b ||
                                                                        a.localeCompare(
                                                                            b,
                                                                            undefined,
                                                                            {
                                                                                sensitivity:
                                                                                    "base",
                                                                            }
                                                                        )
                                                                )
                                                                .map(
                                                                    (
                                                                        obj,
                                                                        i
                                                                    ) => {
                                                                        return (
                                                                            <Option
                                                                                value={
                                                                                    obj
                                                                                }
                                                                            >
                                                                                {
                                                                                    obj
                                                                                }
                                                                            </Option>
                                                                        );
                                                                    }
                                                                )}
                                                    </Select>
                                                </div>
                                                <p>to</p>
                                                <div>
                                                    <Select
                                                        className="eye-prescription_section-bar-second_dropdown"
                                                        defaultValue="Select"
                                                        style={{
                                                            width: 120,
                                                        }}
                                                        value={
                                                            obj.sphere_to ||
                                                            "Select"
                                                        }
                                                        onChange={(e) => {
                                                            handleChangeOption(
                                                                obj,
                                                                "sphere_to",
                                                                e,
                                                                i
                                                            );
                                                        }}
                                                    >
                                                        {sphere &&
                                                            sphere
                                                                .sort(
                                                                    (a, b) =>
                                                                        a - b ||
                                                                        a.localeCompare(
                                                                            b,
                                                                            undefined,
                                                                            {
                                                                                sensitivity:
                                                                                    "base",
                                                                            }
                                                                        )
                                                                )
                                                                .map(
                                                                    (
                                                                        obj,
                                                                        i
                                                                    ) => {
                                                                        return (
                                                                            <Option
                                                                                value={
                                                                                    obj
                                                                                }
                                                                            >
                                                                                {
                                                                                    obj
                                                                                }
                                                                            </Option>
                                                                        );
                                                                    }
                                                                )}
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <p>Cylinder (CYL)</p>
                                            <div className="columns">
                                                <div>
                                                    <Select
                                                        className="eye-prescription_section-bar-second_dropdown"
                                                        defaultValue="From"
                                                        style={{
                                                            width: 120,
                                                        }}
                                                        value={
                                                            obj.cylinder_from ||
                                                            "From"
                                                        }
                                                        onChange={(e) => {
                                                            handleChangeOption(
                                                                obj,
                                                                "cylinder_from",
                                                                e,
                                                                i
                                                            );
                                                        }}
                                                    >
                                                        {cylinder &&
                                                            cylinder
                                                                .sort(
                                                                    (a, b) =>
                                                                        a - b ||
                                                                        a.localeCompare(
                                                                            b,
                                                                            undefined,
                                                                            {
                                                                                sensitivity:
                                                                                    "base",
                                                                            }
                                                                        )
                                                                )
                                                                .map(
                                                                    (
                                                                        obj,
                                                                        i
                                                                    ) => {
                                                                        return (
                                                                            <Option
                                                                                value={
                                                                                    obj
                                                                                }
                                                                            >
                                                                                {
                                                                                    obj
                                                                                }
                                                                            </Option>
                                                                        );
                                                                    }
                                                                )}
                                                    </Select>
                                                </div>
                                                <p>to</p>
                                                <div>
                                                    <Select
                                                        className="eye-prescription_section-bar-second_dropdown"
                                                        defaultValue="Select"
                                                        style={{
                                                            width: 120,
                                                        }}
                                                        value={
                                                            obj.cylinder_to ||
                                                            "Select"
                                                        }
                                                        onChange={(e) => {
                                                            handleChangeOption(
                                                                obj,
                                                                "cylinder_to",
                                                                e,
                                                                i
                                                            );
                                                        }}
                                                    >
                                                        {cylinder &&
                                                            cylinder
                                                                .sort(
                                                                    (a, b) =>
                                                                        a - b ||
                                                                        a.localeCompare(
                                                                            b,
                                                                            undefined,
                                                                            {
                                                                                sensitivity:
                                                                                    "base",
                                                                            }
                                                                        )
                                                                )
                                                                .map(
                                                                    (
                                                                        obj,
                                                                        i
                                                                    ) => {
                                                                        return (
                                                                            <Option
                                                                                value={
                                                                                    obj
                                                                                }
                                                                            >
                                                                                {
                                                                                    obj
                                                                                }
                                                                            </Option>
                                                                        );
                                                                    }
                                                                )}
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                <div className="eye-prescription_block">
                    <button
                        onClick={handleSubmit}
                        className="eye-prescription_button presc-custom-button"
                        disabled={saveState}
                        style={{
                            backgroundColor: saveState ? "#ccc" : "",
                            marginTop: "20px",
                        }}
                    >
                        {buttonLoader == false ?
                        'Save' :  
                        <>
                        <p>Save</p> 
                        <CustomLoader buttonBool={true}/>
                        </>}
                    </button>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    userID: state.Auth.user?.id,
});
export default connect(mapStateToProps)(EyePrescription);
