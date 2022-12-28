import React, { useEffect, useState } from "react";
import classes from "./styles.module.scss";
import Axios from "../../../../Http";
import { connect } from "react-redux";
import { defaultMaterials } from "./data";
import { Row, Col, message,Select } from "antd";
import CustomLoader from "../../../../components/customLoader";
import removeIcon from "../../../../../images/cross.svg";
const { Option } = Select;
const EyePrescription = ({ userId }) => {
    const [messageApi, contextHolder] = message.useMessage();
    let [eyeDetails, setEyeDetails] = useState([]);
    const [sphError, setSphError] = useState([...defaultSphError]);
    const [disable, setDisable] = useState(false);
    const [buttonLoader, setButtonLoader] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [plan,setPlan]=useState('vsp')
    useEffect(() => {
        const errorsList = [...sphError];
        const isError = errorsList.every((item) => item.value === "");
        if (!isError) {
            setDisable(true);
        } else {
            setDisable(false);
        }
    }, [sphError]);

    useEffect(() => {
        if (userId == null) return;
        getEyePrescriptionDetails();
    }, [userId,plan]);
    useEffect(() => {
        isIncompleteRange();
    }, [eyeDetails]);
    const getEyePrescriptionDetails = async () => {
        try {
            setLoading(true);
            const res = await Axios.get(
                `${process.env.MIX_REACT_APP_URL}/api/prescriptions`,
                {
                    params: { user_id: userId,plan:plan },
                }
            );
            let totalMaterails = [];
            Object.keys(res?.data?.data).map((item) => {
                res?.data?.data[item].map((element) =>
                    totalMaterails.push(element)
                );
            });
            const material = [
                ...totalMaterails.map((item) => {
                    return {
                        ...item,
                        title: item.name,
                        from: false,
                        to: false,
                    };
                }),
                ...defaultMaterials?.filter((item) => {
                    const singleMaterial = totalMaterails?.find(
                        (val) => val?.name === item?.name
                    );
                    if (singleMaterial == undefined) {
                        return {
                            ...item,
                            sphere_from: "",
                            sphere_to: "",
                            error: false,
                        };
                    }
                }),
            ];
            setSphError(
                material.map((item, index) => {
                    return { ...item, error: false };
                })
            );
            setEyeDetails(material);
            setLoading(false);
        } catch (err) {
            console.log("Error while getting glasses details");
            message.destroy();
            messageApi.open({
                type: "error",
                content: err.response.data.message,
                duration: 5,
                className: "custom-postion-error",
                className: "custom-postion-error",
            });
        }
    };
    const handleInputChange = (value, name, key, index) => {
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
        } else {
            handleInputValues(value, name, key, index);
        }
    };
    const handleInputValues = (value, name, key, index) => {
        const regix = new RegExp("^[-+]?[0-9]*[/.]?([0-9]*)?$");
        if (regix.test(value) || value === "") {
            handleSph(value, name, key, +value, index);
        } else {
            return;
        }
    };
    const handleSPHError = (name) => {
        const error = [...sphError];
        const selectedError = [...error].find((item) => item?.name === name);
        selectedError.value = "Please choose a valid range";
        setSphError([...error]);
    };
    const handleSph = (value, name, key, parsedValue, index) => {
        if (value > 20 || value < -20) {
            handleSPHError(name);
            return;
        }
        const eyePrescription = [...eyeDetails];
        let selectedMaterial = [...eyePrescription]
            .filter((item) => {
                if (item.name == name) {
                    return {
                        ...item,
                    };
                }
            })
            .find((material, mat_id) => {
                if (mat_id === index) {
                    return material;
                }
            });
        let index_selected;
        [...eyePrescription].map((item, index) => {
            if (item == selectedMaterial) {
                index_selected = index;
            }
        });

        selectedMaterial[key] = value;

        // const from = parseFloat(selectedMaterial.sphere_from * 1);
        // const to = parseFloat(selectedMaterial.sphere_to * 1);

        const isErrorArray = eyeDetails?.map((item, index) => {
            let from,to
            from = parseFloat(item.sphere_from * 1);
            to = parseFloat(item.sphere_to * 1);
        
           const details=eyeDetails.map((intItem,int_index)=>{
            const item_from = parseFloat(intItem?.sphere_from * 1);
            const item_to = parseFloat(intItem?.sphere_to * 1);
            if (
                (item_from <= from &&
                    item_to <= from &&
                    item_to <= to &&
                    item_from <= to) ||
                (item_from >= from &&
                    item_to >= from &&
                    item_to >= to &&
                    item_from >= to)
            ) {
                return false;
            } else {
                if (index == int_index) {
                    return false;
                } else {
                    return true;
                }
            }
           })
           if(details.includes(true))
           {return true}
           else{
            return false
           }
        });
        console.log("isError array", isErrorArray);
        eyeDetails = eyeDetails.map((item, index) => {
            if (index == index_selected) {
                if (isErrorArray[index] == true) {
                    return {
                        ...item,
                        error: true,
                        [key]: selectedMaterial[key],
                    };
                } else {
                    return {
                        ...item,
                        error: false,
                        [key]: selectedMaterial[key],
                    };
                }
            } else {
                if (isErrorArray[index] == true) {
                    return { ...item, error: true };
                } else {
                    return { ...item, error: false };
                }
            }
        });
        setErrors(isErrorArray);
        setEyeDetails([...eyeDetails]);
    };

    const handleSubmit = async () => {
        try {
            setButtonLoader(true);
            let detailedObject = {
                "Hi index 1.70": [],
                "Hi Index 1.67": [],
                "Hi index 1.60": [],
                Trivex: [],
                Polycarbonate: [],
            };
            eyeDetails
                .filter((item, index) => {
                    if (
                        item?.sphere_from !== "" &&
                        item?.sphere_from !== null &&
                        item?.sphere_from !== undefined &&
                        item?.sphere_to !== "" &&
                        item?.sphere_to !== null &&
                        item?.sphere_to !== undefined
                    ) {
                        console.log(item);
                        return item;
                    }
                })
                .map((item) => {
                    Object.keys(detailedObject).map((key) => {
                        if (key == item.name) {
                            detailedObject = {
                                ...detailedObject,
                                [item.name]: [
                                    ...detailedObject[item.name],
                                    { ...item, user_id: userId },
                                ],
                            };
                        }
                    });
                });
            console.log("the data to be posted is here", detailedObject);
            const payload = {
                plan : plan,
                eye_prescriptions: detailedObject,
                user_id: userId,
            };
            const res = await Axios.post(
                `${process.env.MIX_REACT_APP_URL}/api/eye-prescriptions`,
                payload
            );
            setErrors([]);
            setButtonLoader(false);
            message.destroy();
            messageApi.open({
                type: "success",
                content: res.data.message,
                duration: 5,
                className: "custom-postion",
                className: "custom-postion",
            });
        } catch (err) {
            console.log("error while save data");
            message.destroy();
            messageApi.open({
                type: "error",
                content: err.response.data.message,
                duration: 5,
                className: "custom-postion-error",
                className: "custom-postion-error",
            });
        }
    };

    const isIncompleteRange = () => {
        let isDisabled = [];
        for (let i = 0; i <= eyeDetails?.length - 1; i++) {
            if (
                eyeDetails[i]?.sphere_from === "" ||
                eyeDetails[i]?.sphere_from === null ||
                eyeDetails[i]?.sphere_from === undefined ||
                eyeDetails[i]?.sphere_to === "" ||
                eyeDetails[i]?.sphere_to === null ||
                eyeDetails[i]?.sphere_to === undefined
            ) {
                isDisabled.push(true);
                break;
            } else {
                isDisabled.push(false);
            }
        }
        setDisable(isDisabled.includes(false));
    };
    const removePrescription = (item) => {
        const filteredData = eyeDetails.filter((range) => {
            if (item != range) {
                return item;
            }
        });
        setEyeDetails(filteredData);
    };
    const addPrescription = (item) => {
        setEyeDetails([...eyeDetails, item]);
    };

    return loading == true ? (
        <>
        <CustomLoader buttonBool={false} />
        <div>{contextHolder}</div></>
    ) : (
        <Row className={classes["container"]} justify="start" align="middle">
            <div>{contextHolder}</div>
            <Col xs={24} className={classes["page-title"]}>
                Glasses Prescription Setting
            </Col>
            <Col
                className={`email-remainder-davis_input-sections_input-section ${classes["margindefault"]}`}
                xs={24}
            >
                <Row align="middle">
                    <Col xs={24} md={3}>
                        Select Vision Plans
                    </Col>
                    <Col xs={24} md={12}>
                        <Row justify="center" align="middle">
                            <Col xs={24} className={classes["centeredContent"]}>
                                <Select
                                    className="no-outline select-width"
                                    defaultValue="vsp"
                                    value={plan}
                                    onChange={(e) => {
                                        setPlan(e);
                                    }}
                                >
                                    <Option
                                        className="ant-select-item-option-content"
                                        value={"vsp"}
                                    >
                                        VSP Plan
                                    </Option>
                                    <Option
                                        className="ant-select-item-option-content"
                                        value={"davis"}
                                    >
                                        Davis Plan
                                    </Option>
                                    <Option
                                        className="ant-select-item-option-content"
                                        value={"eyemed"}
                                    >
                                        EyeMed Plan
                                    </Option>
                                    <Option
                                        className="ant-select-item-option-content"
                                        value={"spectra"}
                                    >
                                        Spectra Plan
                                    </Option>
                                    <Option
                                        className="ant-select-item-option-content"
                                        value={"vba"}
                                    >
                                        VBA Plan
                                    </Option>
                                </Select>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Col xs={24} className={classes["content-map-container"]}>
                <Row justify="center" align="middle">
                    <Col xs={24} md={18} className={classes["max-container"]}>
                        {defaultMaterials?.map((item, index) => {
                            return (
                                <EyePrescriptionSlot
                                    key={index}
                                    data={item}
                                    onChange={handleInputChange}
                                    sphError={sphError}
                                    eyeData={eyeDetails}
                                    removeItem={removePrescription}
                                    addItem={addPrescription}
                                    btnError={errors}
                                />
                            );
                        })}
                        <Row justify="end">
                                    <button
                                        className={classes["button"]}
                                        onClick={handleSubmit}
                                        disabled={
                                            errors.length == 0
                                                ? true
                                                : errors.includes(true)
                                                ? true
                                                : !disable
                                        }
                                    >
                                        {buttonLoader == false ? (
                                            "Save"
                                        ) : (
                                            <span>
                                                <p>Save</p>
                                                <CustomLoader buttonBool={true} />
                                            </span>
                                        )}
                                    </button>
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

const EyePrescriptionSlot = ({
    data,
    onChange,
    eyeData,
    removeItem,
    addItem,
}) => {
    const isDisabled = () => {
        const eyeArray = eyeData.filter((item) => {
            if (item.name == data.name) {
                return {
                    ...item,
                };
            }
        });
        const arrayLength = eyeArray.length;
        const item = eyeArray[arrayLength - 1];
        return item["sphere_to"] == "" ||
            item["sphere_to"] == null ||
            item["sphere_from"] == "" ||
            item["sphere_from"] == null
            ? true
            : false;
    };

    return (
        <Row className={classes["slot-container"]}>
            <Col xs={24} className={classes["slot-header"]}>
                <div className={classes["header-title"]}>{`Show ${
                    data?.title || ""
                } If`}</div>
            </Col>
            <Col xs={24} className={classes["slot-body"]}>
                <Row justify="space-between">
                    <Col
                        xs={24}
                        md={24}
                        lg={24}
                        className={classes["slot-body-content"]}
                    >
                        <div className={classes["slot-body-label"]}>
                            Select Range
                        </div>
                        {eyeData
                            .filter((item) => {
                                if (item.name == data.name) {
                                    return {
                                        ...item,
                                    };
                                }
                            })
                            .map((item, index) => {
                                return (
                                    <>
                                        <div
                                            className={
                                                classes[
                                                    "slot-body-input-section"
                                                ]
                                            }
                                        >
                                            <input
                                                type={"text"}
                                                placeholder={"From"}
                                                className={classes["input"]}
                                                value={
                                                    item["sphere_from"] || ""
                                                }
                                                onChange={(e) =>
                                                    onChange(
                                                        e.target?.value,
                                                        item?.name,
                                                        "sphere_from",
                                                        index
                                                    )
                                                }
                                            />
                                            <div
                                                className={classes["to-label"]}
                                            >
                                                to
                                            </div>
                                            <input
                                                placeholder={"Select"}
                                                className={classes["input"]}
                                                type={"text"}
                                                value={item["sphere_to"] || ""}
                                                onChange={(e) =>
                                                    onChange(
                                                        e.target?.value,
                                                        item?.name,
                                                        "sphere_to",
                                                        index
                                                    )
                                                }
                                            />
                                            <div>
                                                {index == 0 ? (
                                                    <div
                                                        className={
                                                            isDisabled(item)
                                                                ? classes[
                                                                      "add-disabled"
                                                                  ]
                                                                : classes["add"]
                                                        }
                                                        onClick={() => {
                                                            isDisabled(item)
                                                                ? null
                                                                : addItem({
                                                                      id: null,
                                                                      name: item.name,
                                                                      sphere_from:
                                                                          "",
                                                                      sphere_to:
                                                                          "",
                                                                      title: item.name,
                                                                  });
                                                        }}
                                                    >
                                                        <img
                                                            src={removeIcon}
                                                            className={
                                                                classes[
                                                                    "add-image"
                                                                ]
                                                            }
                                                        />
                                                    </div>
                                                ) : (
                                                    <div
                                                        className={
                                                            classes["remove"]
                                                        }
                                                        onClick={() => {
                                                            removeItem(item);
                                                        }}
                                                    >
                                                        <img
                                                            src={removeIcon}
                                                            className={
                                                                classes[
                                                                    "remove-img"
                                                                ]
                                                            }
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {item.error == true ? (
                                            <div className={classes["error"]}>
                                                please select a valid range
                                            </div>
                                        ) : null}
                                    </>
                                );
                            })}
                    </Col>
                    
                </Row>
            </Col>
        </Row>
    );
};

const materialArrangement = [
    "Hi index 1.70",
    "Hi Index 1.67",
    "Hi index 1.60",
    "Trivex",
    "Polycarbonate",
];
const defaultSphError = [
    { value: "", label: "Hi index 1.70", from: false, to: false },
    { value: "", label: "Hi Index 1.67", from: false, to: false },
    { value: "", label: "Hi index 1.60", from: false, to: false },
    { value: "", label: "Trivex", from: false, to: false },
    { value: "", label: "Polycarbonate", from: false, to: false },
];

const getArrangedMaterials = (data) => {
    let materialsList = [];
    materialArrangement?.forEach((material) => {
        const targetedMaterial = data?.find((item) => item?.name === material);
        if (targetedMaterial) materialsList.push(targetedMaterial);
    });
    return materialsList;
};
