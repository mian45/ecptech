import React, { useState } from "react";
import { Switch, Col, Row, message } from "antd";

import classes from "./editInsurance.module.scss";
import { useHistory, useParams } from "react-router";
import Axios from "../Http";
import { connect } from "react-redux";
import backArrow from "../../images/arrow-back.svg";
import CustomCheckbox from "../components/customCheckbox";
import CustomLoader from "../components/customLoader";
function EditInsurance({ userId }) {
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const [buttonLoader, setButtonLoader] = useState(false);
    const [selectedRow, setSelectedRow] = React.useState([]);
    const [updateInsurancePlan, setUpdateInsurancePlan] = useState([]);
    const [visionID, setVisionId] = useState("");
    const history = useHistory();
    const params = useParams();

    //for editing
    React.useEffect(() => {
        if (userId == null) return;
        setLoading(true);
        setVisionId(params?.id);

        Axios.get(
            process.env.MIX_REACT_APP_URL +
            `/api/get-client-plan-questions?visionPlanId=${params?.id}`
        )
            .then((res) => {
                setSelectedRow(res.data?.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log({ error });
                setLoading(false);
                messageApi.open({
                    type: "error",
                    content: error.response.data.message,
                    duration: 5,
                    className: 'custom-postion-error',
                });
            });
    }, [userId]);

    //for toggle switch

    const handleSwitch = (value, toggleSwitch) => {
        setSelectedRow((oldState) => {
            let rowCopy = [...oldState];
            rowCopy.find((insurance) => insurance.id == value.id).optional =
                toggleSwitch;
            return rowCopy;
        });
        setUpdateInsurancePlan((oldState) => {
            let oldStateCopy = [...oldState];
            let current = oldStateCopy.find(
                (insurance) => insurance.id == value.id
            );
            if (current) {
                oldStateCopy.find(
                    (insurance) => insurance.id == value.id
                ).optional = toggleSwitch;
            } else {
                oldStateCopy = [
                    ...oldStateCopy,
                    {
                        id: value?.id,
                        question_id: value?.id,
                        optional: toggleSwitch,
                        status: value?.status,
                    },
                ];
            }
            return oldStateCopy;
        });
    };

    //for checkbox switch

    const handleCheck = (value, toggleCheck) => {
        setSelectedRow((oldState) => {
            let rowCopy = [...oldState];
            rowCopy.find((insurance) => insurance.id == value.id).status =
                toggleCheck;
            return rowCopy;
        });
        setUpdateInsurancePlan((oldState) => {
            let oldStateCopy = [...oldState];
            let current = oldStateCopy.find(
                (insurance) => insurance.id == value.id
            );
            if (current) {
                oldStateCopy.find(
                    (insurance) => insurance.id == value.id
                ).status = toggleCheck;
            } else {
                oldStateCopy = [
                    ...oldStateCopy,
                    {
                        id: value?.id,
                        question_id: value?.id,
                        optional: value?.optional,
                        status: toggleCheck,
                    },
                ];
            }
            return oldStateCopy;
        });
    };

    const handleSubmit = async () => {
        if (updateInsurancePlan.length == 0) {
            return;
        }
        setButtonLoader(true);
        const toggle = {
            user_id: userId,
            vision_plan_id: visionID,
            data: updateInsurancePlan,
        };
        const res = await Axios.post(
            process.env.MIX_REACT_APP_URL +
            `/api/update-user-plan-question-permission`,
            toggle
        )
            .then((response) => {
                console.log(response, "res-----");
                messageApi.open({
                    type: "success",
                    content: response.data.message,
                    duration: 5,
                    className: 'custom-postion',
                });
                setUpdateInsurancePlan([]);
                setButtonLoader(false);
            })
            .catch((error) => {
                messageApi.open({
                    type: "error",
                    content: error.response.data.message,
                    duration: 5,
                    className: 'custom-postion-error',
                });
            });
    };

    const label = { inputProps: { "aria-label": "Switch demo" } };
    return loading == true ? (
        <CustomLoader buttonBool={false} />
    ) : (
        <Row
            className={classes["root-container"]}
            justify="center"
            align="middle"
        >
            <div>{contextHolder}</div>
            <Col xs={24}>
                <div>
                    <div className={classes["container"]}>
                        <Row>
                            <Col xs={24}>
                                <div className={classes["page-title"]}>
                                    Edit {history?.location?.state}
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={24}>
                                <div
                                    className={classes["back-container"]}
                                    onClick={() => history.goBack()}
                                >
                                    <img
                                        src={backArrow}
                                        className={classes["back-image"]}
                                    />
                                    <div className={classes["back-text"]}>
                                        Back
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row justify="center">
                            <Col xs={24} md={14}>
                                <div className={classes["content-container"]}>
                                    <div className={classes["content-box"]}>
                                        <div
                                            className={
                                                classes["content-header"]
                                            }
                                        >
                                            <div
                                                className={
                                                    classes[
                                                    "content-header-text"
                                                    ]
                                                }
                                            >
                                                <p
                                                    className={
                                                        classes[
                                                        "header-text-left"
                                                        ]
                                                    }
                                                >
                                                    Click to Display as Option on Calculator
                                                </p>
                                            </div>
                                            <div
                                                className={
                                                    classes[
                                                    "content-header-text"
                                                    ]
                                                }
                                            >
                                                <p
                                                    className={
                                                        classes[
                                                        "header-text-right"
                                                        ]
                                                    }
                                                >
                                                    Optional / Mandatory
                                                </p>
                                            </div>
                                        </div>
                                        {selectedRow?.length > 0 &&
                                            selectedRow?.map((item) => {
                                                return (
                                                    <div
                                                        className={
                                                            classes[
                                                            "content-body-slot"
                                                            ]
                                                        }
                                                        key={item?.id}
                                                    >
                                                        <CustomCheckbox
                                                            containerClass={
                                                                classes[
                                                                "checkbox-container"
                                                                ]
                                                            }
                                                            labelClass={
                                                                classes[
                                                                "checkbox-label"
                                                                ]
                                                            }
                                                            label={item?.title}
                                                            defaultChecked={
                                                                item?.status ||
                                                                false
                                                            }
                                                            onValueChange={(
                                                                value
                                                            ) =>
                                                                handleCheck(
                                                                    item,
                                                                    value
                                                                )
                                                            }
                                                        />

                                                        <Switch
                                                            disabled={
                                                                item?.status ==
                                                                    0
                                                                    ? true
                                                                    : false
                                                            }
                                                            defaultChecked={
                                                                item?.optional ==
                                                                    0
                                                                    ? false
                                                                    : true
                                                            }
                                                            onChange={(e) =>
                                                                handleSwitch(
                                                                    item,
                                                                    e
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                );
                                            })}
                                    </div>
                                    <div
                                        className={classes["button-container"]}
                                    >
                                        <button
                                            disabled={
                                                updateInsurancePlan.length === 0
                                            }
                                            onClick={handleSubmit}
                                            type="submit"
                                            className={classes["save-button"]}
                                        >
                                            {buttonLoader == false ? (
                                                "Save"
                                            ) : (
                                                <span>
                                                    <p>Save</p>
                                                    <CustomLoader
                                                        buttonBool={true}
                                                    />
                                                </span>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Col>
        </Row>
    );
}
const mapStateToProps = (state) => ({
    userId: state.Auth?.user?.id,
});
export default connect(mapStateToProps)(EditInsurance);
