import React, { useEffect, useState } from "react";
import { Select } from "antd";
const { Option } = Select;
import { connect } from "react-redux";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
    convertToRaw,
    convertFromHTML,
    EditorState,
    ContentState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToMarkdown from "draftjs-to-markdown";
import axios from "axios";

import edit from "../../images/edit.png";
import fontColor from "../../images/color.png";
import cross from "../../images/cross.png";
import iconRemainder from "../../images/remainder.svg";
import bellIcon from "../../images/bell-icon.svg";
import bellCloseIcon from "../../images/bell-close.svg";
import emailButton from "../../images/email.svg";
import Axios from "../Http";
import CustomLoader from "../components/customLoader";

import DeleteModal from "../components/deleteModal/index"
import "./style.scss";

const EmailSetting = (props) => {
    const [emailSettingProps, setEmailSettingProps] = useState(false);
    const [idState, setIdState] = useState("");
    const token = localStorage.getItem("access_token");
    const [reminderType, setReminderType] = useState("");
    const [sentTo, setSentTo] = useState("");
    const [subject, setSubject] = useState("");
    const [editorState, setEditorState] = useState("");
    const [dates, setDates] = useState("");
    const [times, setTimes] = useState("");
    const [timeZone, setTimeZone] = useState("");
    const [emailArray, setEmailArray] = useState([]);
    const [timeZones, setTimeZones] = useState([]);
    const [timeSelector,setTimeSelector]=useState("")
    const [timeSelectorValue,setTimeSelectorValue]=useState("")
    const [loading , setLoading] = useState(false)
    const [buttonLoader , setButtonLoader] = useState(false)
    const [showDeleteReminder,setShowDeleteReminder]=useState(false)
    const [deleteReminderId,setDeleteReminderId]=useState(0)
    
    const blockStyleFn = (block) => {
        let alignment = "left";
        block.findStyleRanges((e) => {
            if (e.hasStyle("center")) {
                alignment = "center";
            }
            if (e.hasStyle("right")) {
                alignment = "right";
            }
        });
        return `editor-alignment-${alignment}`;
    };
    useEffect(() => {
        getTimeZones();
    }, []);
    useEffect(() => {
        getReminder();
    }, []);
    const getTimeZones = () => {
        var data = new FormData();

        var config = {
            method: "get",
            url: `${process.env.MIX_REACT_APP_URL}/api/get-time-zone`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                setTimeZones(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    };
    const addReminder = () => {
        setButtonLoader(true)
        var data = new FormData();
        if (reminderType === "orderComplete") {
            data.append("userId", props.userID);
            data.append("type", reminderType);
            data.append("invoiceType", reminderType);
            data.append("subject", subject);
            data.append(
                "body",
                draftToMarkdown(convertToRaw(editorState.getCurrentContent()))
            );
        } else if (reminderType ==='reminder' ){
            data.append("userId", props.userID);
            data.append("type", reminderType);
            data.append("invoiceType", sentTo);
            data.append("subject", subject);
            data.append(
                "body",
                draftToMarkdown(convertToRaw(editorState.getCurrentContent()))
            );
            data.append("afterSend", timeSelectorValue);
            data.append("afterSendType", timeSelector);
            data.append("sendTime", times);
            data.append("TimeZone", timeZone);
        }
        else {
            data.append("userId", props.userID);
            data.append("type", reminderType);
            data.append("invoiceType", sentTo);
            data.append("subject", subject);
            data.append(
                "body",
                draftToMarkdown(convertToRaw(editorState.getCurrentContent()))
            );
            data.append("sendDate", dates);
            data.append("sendTime", times);
            data.append("TimeZone", timeZone);
        }
        var config = {
            method: "post",
            url: `${process.env.MIX_REACT_APP_URL}/api/add-reminder`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                getReminder();
                setButtonLoader(false)
            })
            .catch(function (error) {
                setButtonLoader(true)
                console.log(error);
                setButtonLoader(false)
            });
    };

    const editReminder = (value) => {
        setButtonLoader(true)
        var data = new FormData();
        if (reminderType === "orderComplete") {
            data.append("id", idState);
            data.append("type", reminderType);
            data.append("invoiceType", reminderType);
            data.append("subject", subject);
            data.append(
                "body",
                draftToMarkdown(convertToRaw(editorState.getCurrentContent()))
            );
        }
        else if(reminderType ==='reminder'){
            data.append("id", idState);
            data.append("type", reminderType);
            data.append("invoiceType", sentTo);
            data.append("subject", subject);
            data.append(
                "body",
                draftToMarkdown(convertToRaw(editorState.getCurrentContent()))
            );
            data.append("afterSend", timeSelectorValue);
            data.append("afterSendType", timeSelector);
            data.append("sendTime", times);
            data.append("TimeZone", timeZone);
        }else{
            data.append("id", idState);
            data.append("type", reminderType);
            data.append("invoiceType", sentTo);
            data.append("subject", subject);
            data.append(
                "body",
                draftToMarkdown(convertToRaw(editorState.getCurrentContent()))
            );
            data.append("sendDate", dates);
            data.append("sendTime", times);
            data.append("TimeZone", timeZone);
        }
        var config = {
            method: "post",
            url: `${process.env.MIX_REACT_APP_URL}/api/edit-reminder`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        };
        axios(config)
            .then(function (response) {
                getReminder();
                setReminderType("");
                setSentTo("");
                setSubject("");
                setEditorState("");
                setDates("");
                setTimes("");
                setTimeZone("");
                setIdState(null);
                setTimeSelector("");
                setTimeSelectorValue("")
                setButtonLoader(false)
            })
            .catch(function (error) {
                setButtonLoader(true)
                console.log(error);
                setButtonLoader(false)
            });
    };

    const deleteReminder = (id) => {
        var data = new FormData();
        data.append("id", id);

        var config = {
            method: "post",
            url: `${process.env.MIX_REACT_APP_URL}/api/delete-reminder`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                setShowDeleteReminder(false)
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const getReminder = () => {
        setLoading(true)
        var data = new FormData();

        var config = {
            method: "get",
            url: `${process.env.MIX_REACT_APP_URL}/api/get-reminders?userId=${props.userID}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                let res = response.data.data;
                setEmailArray(res);
                setLoading(false)
            })
            .catch(function (error) {
                setLoading(true)
                console.log(error);
                setLoading(false)
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setEmailArray([...emailArray]);
        addReminder();
        getReminder();
        setReminderType("");
        setEmailSettingProps(false);
    };

    const updateHandler = (obj) => {
        setIdState(obj.id);
        setReminderType(obj.type);
        setSentTo(obj.invoice_type);
        const contentBlock = convertFromHTML(obj.body);
        const contentState = ContentState.createFromBlockArray(contentBlock);
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState);
        setSubject(obj.subject);
        setDates(obj.send_date);
        setTimes(obj.send_time);
        setTimeZone(obj.time_zone);
        setEmailSettingProps(true);
    };

    const handleEdit = (e) => {
        e.preventDefault();
        editReminder();
        setEmailSettingProps(false);
    };

    const handleDelete = (id) => {
        setShowDeleteReminder(true)
        setDeleteReminderId(id)
        
    };
    const deleteReminderbyPopup=()=>{
        deleteReminder(deleteReminderId);
        setEmailArray(
            [...emailArray].filter((emailObj) => {
                return emailObj.id !== deleteReminderId;
            })
        );
    }
    var quarterHours = ["00", "15", "30", "45"];
    var time = [];
    for (var i = 0; i < 24; i++) {
        if (i < 13) {
            for (var j = 0; j < 4; j++) {
                time.push(`${i + ":" + quarterHours[j]} AM`);
            }
        } else {
            for (var j = 0; j < 4; j++) {
                time.push(`${i - 12 + ":" + quarterHours[j]} PM`);
            }
        }
    }

    const handleRemainderClick = (value) => {
        setReminderType(value);
    };

    const handleSentToClick = (value) => {
        setSentTo(value);
    };

    const handleDateClick = (value) => {
        setTimeSelector(value);
    };

    const handleTimeClick = (value) => {
        setTimes(value);
    };

    const onChange = (value) => {
        setEditorState(value.data);
    };

    const handleTimeZoneClick = (value) => {
        setTimeZone(value);
    };

    const handleClick = () => {
        setReminderType("");
        setSentTo("");
        setSubject("");
        setEditorState("");
        setDates("");
        setTimes("");
        setTimeZone("");
        setIdState(null);
        setTimeSelector("");
        setTimeSelectorValue("")
        setEmailSettingProps(false);
    };

    const activeInActiveReminder = async (data) => {
        try {
            await axios.post(
                process.env.MIX_REACT_APP_URL + "/api/active-inactive-reminder",
                {
                    id: data?.id,
                    isActive: data?.is_active === 1 ? 0 : 1,
                }
            );
            const emails = [...emailArray];
            const selectedValue = [...emails].find(
                (singleEmail) => data?.id === singleEmail.id
            );
            selectedValue.is_active = data?.is_active === 1 ? 0 : 1;
            const editIndex = [...emails].indexOf(
                (singleEmail) => data?.id === singleEmail.id
            );
            [...emails].splice(editIndex, 1, selectedValue);
            setEmailArray([...emails]);
        } catch (err) {
            console.log("error");
        }
    };
    return (
        loading == true ?
        <CustomLoader buttonBool={false}/>  :
        <>
        {showDeleteReminder?
        <DeleteModal accept={()=>{
            deleteReminderbyPopup();

        }}
        cancel={()=>{setShowDeleteReminder(false)}}
        open={showDeleteReminder}
        /> :null}

       
        <div>
            
            {!emailSettingProps && (
                <div className="email-setting">
                    <p className="email-setting_heading email-settings-title">
                        Email Settings
                    </p>
                    <div className="email-setting-slots-container">
                        {emailArray &&
                            emailArray.map((obj, i) => {
                                return (
                                    <div className="email-setting-content">
                                        <div className="email-setting-content-section">
                                            <div className="email-setting-content-section-image">
                                                <img
                                                    src={
                                                        obj.type == "reminder"
                                                            ? iconRemainder
                                                            : emailButton
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <div>
                                                    <p className="email-setting-content-section-heading">
                                                        {obj.subject}
                                                    </p>
                                                </div>
                                                <div className="email-setting-content-section-subsection">
                                                    <p
                                                        className="email-setting-content-section-subsection-heading email-reminder-tag"
                                                        style={
                                                            obj.type ==
                                                            "reminder"
                                                                ? {
                                                                      color: "#61C77B",
                                                                  }
                                                                : {
                                                                      color: "#6FA5CB",
                                                                  }
                                                        }
                                                    >
                                                        {obj.type == "reminder"
                                                            ? obj.type
                                                            : "Order Success"}
                                                    </p>
                                                    <p
                                                        className="email-setting-content-section-subsection-subheading"
                                                        style={{
                                                            color: "#CBCBCB",
                                                        }}
                                                    >
                                                        {obj.type == "reminder"
                                                            ? `${obj.send_after_day} days after invoice`
                                                            : "Payment Completed"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <img
                                                className="edit-icon"
                                                src={edit}
                                                onClick={() => {
                                                    updateHandler(obj);
                                                }}
                                            />
                                            {obj?.is_active === 1 ? (
                                                <img
                                                    className="bell-icon"
                                                    src={bellIcon}
                                                    onClick={() => {
                                                        activeInActiveReminder(
                                                            obj
                                                        );
                                                    }}
                                                />
                                            ) : (
                                                <img
                                                    className="bell-icon"
                                                    src={bellCloseIcon}
                                                    onClick={() => {
                                                        activeInActiveReminder(
                                                            obj
                                                        );
                                                    }}
                                                />
                                            )}

                                            <img
                                                className="delete-icon"
                                                src={cross}
                                                onClick={() => {
                                                    handleDelete(obj.id);
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        <div className="save-button-wrpper">
                            <div className="email-setting_button-section button-margin">
                                <button
                                    onClick={() => {
                                        setEmailSettingProps(true);
                                    }}
                                    className="email-setting_button-section_save-button"
                                    style={{ float: "left" }}
                                >
                                    Add New
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {emailSettingProps && (
                <form>
                    <div className="email-remainder">
                        <p className="email-remainder_heading">Add New</p>

                        <div>
                            <div
                                onClick={handleClick}
                                className="email-remainder_arrow-section"
                                style={{ cursor: "pointer" }}
                            >
                                <img src={"/arrow-back.svg"} alt="arrow" />
                                <p className="email-remainder_arrow-section_back">
                                    Back
                                </p>
                            </div>
                            <div className="email-remainder_input-sections reminders-container">
                                <div className="email-remainder_input-sections_input-section">
                                    <p>Email Type</p>
                                    <Select
                                        className="no-outline"
                                        defaultValue="Select"
                                        style={{
                                            width: 120,
                                        }}
                                        onChange={handleRemainderClick}
                                        value={reminderType || "Select"}
                                    >
                                        <Option
                                            className="ant-select-item-option-content"
                                            value={"reminder"}
                                        >
                                            Reminder
                                        </Option>
                                        <Option
                                            className="ant-select-item-option-content"
                                            value={"orderComplete"}
                                        >
                                           Order Paid
                                        </Option>
                                        <Option
                                            className="ant-select-item-option-content"
                                            value={"custom"}
                                        >
                                            Custom
                                        </Option>
                                    </Select>
                                </div>
                                {reminderType != "orderComplete" ? (
                                    <div className="email-remainder_input-sections_input-section">
                                        <p>Send to</p>
                                        <Select
                                            className="no-outline"
                                            defaultValue="Select"
                                            style={{
                                                width: 120,
                                            }}
                                            onChange={handleSentToClick}
                                            value={sentTo || "Select"}
                                        >
                                            <Option
                                                className="ant-select-item-option-content"
                                                value={"paid"}
                                            >
                                                Paid
                                            </Option>
                                            <Option
                                                className="ant-select-item-option-content"
                                                value={"unpaid"}
                                            >
                                                Unpaid
                                            </Option>
                                            <Option
                                                className="ant-select-item-option-content"
                                                value={"all"}
                                            >
                                                All
                                            </Option>
                                        </Select>
                                    </div>
                                ) : null}

                                <div className="email-remainder_input-sections_input-section">
                                    <p>Subject</p>
                                    <input
                                        className="email-remainder_input-sections_input-section_input input-pad-val no-outline email-input-border"
                                        value={subject}
                                        onChange={(e) => {
                                            setSubject(e.target.value);
                                        }}
                                        type={"text"}
                                        required
                                    />
                                </div>
                                <div>
                                    <Editor
                                        toolbar={{
                                            options: [
                                                "fontSize",
                                                "inline",
                                                "textAlign",
                                                "colorPicker",
                                                "image",
                                            ],
                                            inline: {
                                                inDropdown: false,
                                                options: ["bold", "italic"],
                                            },
                                            textAlign: { inDropdown: true },
                                            colorPicker: { icon: fontColor },
                                        }}
                                        editorState={editorState}
                                        wrapperClassName="demo-wrapper"
                                        editorClassName="demo-editor"
                                        onEditorStateChange={
                                            onEditorStateChange
                                        }
                                    />
                                </div>
                                {reminderType != "orderComplete" && (
                                    <>
                                        <div className="reminders-container-schedule">
                                            <p className="email-remainder_schedule">
                                                Schedule
                                            </p>
                                        </div>
                                        <div className="email-remainder_input-sections_input-section">
                                            <p>Send Date</p>
                                            {reminderType == "custom" ? (
                                                <input
                                                    className="email-remainder_input-sections_input-section_input picker-padding no-outline"
                                                    style={{
                                                        paddingRight: "10px",
                                                    }}
                                                    value={dates}
                                                    onChange={(e) => {
                                                        setDates(
                                                            e.target.value
                                                        );
                                                    }}
                                                    type={"date"}
                                                    required
                                                />
                                            ) : (
                                                <div className="reminder-select-date-container">
                                                    <input
                                                className="email-remainder_input-sections_input-section_input-short input-pad-val no-outline email-input-border"
                                                value={timeSelectorValue}
                                                onChange={(e) => {
                                                    setTimeSelectorValue(e.target.value);
                                                }}
                                                type='number'
                                                required
                                            /><Select
                                            className="no-outline ant-select-short"
                                            defaultValue="Select"
                                            style={{
                                                width: 120,
                                            }}
                                            onChange={handleDateClick}
                                            value={timeSelector || "Select"}
                                        >
                                            <Option
                                                className="ant-select-item-option-content "
                                                value={"day"}
                                            >
                                                Day
                                            </Option>
                                            <Option
                                                className="ant-select-item-option-content"
                                                value={'hour'}
                                            >
                                                Hour
                                            </Option>
                                            <Option
                                                className="ant-select-item-option-content"
                                                value={'month'}
                                            >
                                               Month
                                            </Option>
                                            <Option
                                                className="ant-select-item-option-content"
                                                value={'year'}
                                            >
                                               Year
                                            </Option>
                                         
                                        </Select></div>
                                                
                                            )}
                                        </div>
                                        <div className="email-remainder_input-sections_input-section">
                                            <p>Send Time</p>
                                            <Select
                                                className="no-outline"
                                                defaultValue="Select"
                                                style={{
                                                    width: 120,
                                                }}
                                                onChange={handleTimeClick}
                                                value={times || "Select"}
                                            >
                                                {time &&
                                                    time?.map((e, key) => {
                                                        return (
                                                            <Option
                                                                className="ant-select-item-option-content"
                                                                value={e}
                                                            >
                                                                {e}
                                                            </Option>
                                                        );
                                                    })}
                                            </Select>
                                        </div>
                                        <div className="email-remainder_input-sections_input-section">
                                            <p>Time Zone</p>

                                            <Select
                                                defaultValue="Select"
                                                style={{
                                                    width: 120,
                                                }}
                                                onChange={handleTimeZoneClick}
                                                value={timeZone || "Select"}
                                            >
                                                {timeZones.map(
                                                    (zone, index) => {
                                                        return (
                                                            <Option
                                                                className="ant-select-item-option-content"
                                                                value={zone.id}
                                                            >
                                                                {zone.name}
                                                            </Option>
                                                        );
                                                    }
                                                )}
                                            </Select>
                                        </div>
                                    </>
                                )}
                                <div className="reminders-container-schedule">
                                    <button
                                        onClick={(e) => {
                                            idState
                                                ? handleEdit(e)
                                                : handleSubmit(e);
                                        }}
                                        className="email-remainder_save-button"
                                        style={{
                                            marginBottom: "50px",
                                        }}
                                    >
                                     {buttonLoader == false ?
                                        'Save' : 
                                        <>
                                        <p>Save</p> 
                                        <CustomLoader buttonBool={true}/>
                                        </>
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </div></>
    );
};
const mapStateToProps = (state) => ({
    userID: state.Auth.user?.id,
    token: state.Auth.token,
});
export default connect(mapStateToProps)(EmailSetting);
