import React, { useState } from "react";
import { Switch } from "antd";
import classes from "./editInsurance.module.scss";
import { useHistory, useParams } from "react-router";
import Axios from "../Http";
import { connect } from "react-redux";
import backArrow from "../../images/arrow-back.svg";
import CustomCheckbox from "../components/customCheckbox";
import CustomLoader from "../components/customLoader";
function EditInsurance({ userId }) {
    const [loading, setLoading] = useState(false)
    const [buttonLoader , setButtonLoader] = useState(false)
    const [selectedRow, setSelectedRow] = React.useState([]);
    const [updateInsurancePlan, setUpdateInsurancePlan] = useState([]);
    const [visionID, setVisionId] = useState("");
    const history = useHistory();
    const params = useParams();

    //for editing
    React.useEffect(() => {
        setLoading(true)
        setVisionId(params?.id);

        Axios.get(
            process.env.MIX_REACT_APP_URL +
            `/api/get-client-plan-questions?visionPlanId=${params?.id}`
        )
            .then((res) => {
                setSelectedRow(res.data?.data);
                setLoading(false)
            })
            .catch((error) => {
                console.log({ error })
                setLoading(false)
            });
    }, []);

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
        setButtonLoader(true)
        if (updateInsurancePlan.length == 0) {
            return;
        }
        const toggle = {
            user_id: userId,
            vision_plan_id: visionID,
            data: updateInsurancePlan,
        };
        await Axios.post(
            process.env.MIX_REACT_APP_URL +
            `/api/update-user-plan-question-permission`,
            toggle
        ).then(() => {
            setUpdateInsurancePlan([]);
            setButtonLoader(false)
        });
    };

    const label = { inputProps: { "aria-label": "Switch demo" } };
    return (
        loading == true ?
                    <CustomLoader buttonBool={false}/>
                :
        <div className={classes["root-container"]}>
                <div className={classes["container"]}>
                    <div className={classes["page-title"]}>
                        Edit {history?.location?.state}
                    </div>
                    <>
                    <div
                        className={classes["back-container"]}
                        onClick={() => history.goBack()}
                    >
                        <img src={backArrow} className={classes["back-image"]} />
                        <div className={classes["back-text"]}>Back</div>
                    </div>
                    <div className={classes["content-container"]}>
                        <div className={classes["content-box"]}>
                            <div className={classes["content-header"]}>
                                <div className={classes["content-header-text"]}>
                                    Select / De select questions
                                </div>
                                <div className={classes["content-header-text"]}>
                                    Optional / Mandatory
                                </div>
                            </div>
                            {selectedRow?.length > 0 &&
                                selectedRow?.map((item) => {
                                    return (
                                        <div
                                            className={classes["content-body-slot"]}
                                            key={item?.id}
                                        >
                                            <CustomCheckbox
                                                containerClass={
                                                    classes["checkbox-container"]
                                                }
                                                labelClass={
                                                    classes["checkbox-label"]
                                                }
                                                label={item?.title}
                                                defaultChecked={
                                                    item?.status || false
                                                }
                                                onValueChange={(value) =>
                                                    handleCheck(item, value)
                                                }
                                            />

                                            <Switch
                                                disabled={
                                                    item?.status == 0 ? true : false
                                                }
                                                defaultChecked={
                                                    item?.optional == 0
                                                        ? false
                                                        : true
                                                }
                                                onChange={(e) =>
                                                    handleSwitch(item, e)
                                                }
                                            />
                                        </div>
                                    );
                                })}
                        </div>
                        <div className={classes["button-container"]}>
                            <button
                                onClick={handleSubmit}
                                type="submit"
                                className={classes["save-button"]}
                            >
                                {buttonLoader == false ?
                                'Save'
                                 :
                                 <span>
                                 <p>Save</p> 
                                 <CustomLoader buttonBool={true}/>
                                 </span>
                                 }
                            </button>
                        </div>
                    </div>
                    </>
                </div>
        </div>
    );
}
const mapStateToProps = (state) => ({
    userId: state.Auth?.user?.id,
});
export default connect(mapStateToProps)(EditInsurance);
