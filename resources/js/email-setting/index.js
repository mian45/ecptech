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

import DeleteModal from "../components/deleteModal/index";
import "./style.scss";
import { Row, Col, message } from "antd";
const EmailSetting = (props) => {
    const [messageApi, contextHolder] = message.useMessage();
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
    const [timeSelector, setTimeSelector] = useState("");
    const [timeSelectorValue, setTimeSelectorValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [buttonLoader, setButtonLoader] = useState(false);
    const [showDeleteReminder, setShowDeleteReminder] = useState(false);
    const [deleteReminderId, setDeleteReminderId] = useState(0);

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
    }, [props.userID]);
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
        setButtonLoader(true);
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
        } else if (reminderType === "reminder") {
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
        } else {
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
                messageApi.open({
                    type: "success",
                    content: response.data.message,
                    duration: 5,
                    className: 'custom-postion',
                });
                setButtonLoader(false);
            })
            .catch(function (error) {
                setButtonLoader(true);
                console.log(error);
                setButtonLoader(false);
                messageApi.open({
                    type: "error",
                    content: error.message,
                    duration: 5,
                    className: 'custom-postion',
                });
            });
    };

    const editReminder = (value) => {
        setButtonLoader(true);
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
        } else if (reminderType === "reminder") {
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
        } else {
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
                messageApi.open({
                    type: "success",
                    content: response.data.message,
                    duration: 5,
                    className: 'custom-postion',
                });
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
                setTimeSelectorValue("");
                setButtonLoader(false);
            })
            .catch(function (error) {
                setButtonLoader(true);
                console.log(error);
                setButtonLoader(false);
                messageApi.open({
                    type: "error",
                    content: error.message,
                    duration: 5,
                    className: 'custom-postion',
                });
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
                messageApi.open({
                    type: "success",
                    content: response.data.message,
                    duration: 5,
                    className: 'custom-postion',
                });
                setShowDeleteReminder(false);
            })
            .catch(function (error) {
                console.log(error);
                messageApi.open({
                    type: "error",
                    content: error.message,
                    duration: 5,
                    className: 'custom-postion',
                });
            });
    };

    const getReminder = () => {
        setLoading(true);
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
                if (props.userID !== null && props.userID !== undefined) {
                    setLoading(false);
                }
            })
            .catch(function (error) {
                messageApi.open({
                    type: "error",
                    content: error.message,
                    duration: 5,
                    className: 'custom-postion',
                });
                setLoading(true);
                console.log(error);
                setLoading(false);
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
        setShowDeleteReminder(true);
        setDeleteReminderId(id);
    };
    const deleteReminderbyPopup = () => {
        deleteReminder(deleteReminderId);
        setEmailArray(
            [...emailArray].filter((emailObj) => {
                return emailObj.id !== deleteReminderId;
            })
        );
    };
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
        setTimeSelectorValue("");
        setEmailSettingProps(false);
    };

    const activeInActiveReminder = async (data) => {
        try {
            const res = await axios.post(
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
            messageApi.open({
                type: "success",
                content: res.data.message,
                duration: 5,
                className: 'custom-postion',
            });
        } catch (err) {
            messageApi.open({
                type: "error",
                content: err.message,
                duration: 5,
                className: 'custom-postion',
            });
            console.log("error");
        }
    };
    const EmailForm = () => {
        return (
            <form>
                <Row className="email-remainder">
                    <Col xs={24}>
                        <Row>
                            <Col
                                xs={24}
                                md={24}
                                className="email-remainder_heading"
                            >
                                Add New
                            </Col>
                            <Col
                                xs={24}
                                md={24}
                                onClick={handleClick}
                                className="back"
                            >
                                <Row>
                                    <img src={"/arrow-back.svg"} alt="arrow" />
                                    <p className="email-remainder_arrow-section_back">
                                        Back
                                    </p>
                                </Row>
                            </Col>
                        </Row>
                        <Row
                            justify="center"
                            className="email-remainder_input-sections"
                        >
                            <Col
                                className="email-remainder_input-sections_input-section"
                                xs={24}
                            >
                                <Row justify="center" align="middle">
                                    <Col xs={24} md={4}>
                                        <p>Email Type</p>
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <Row justify="center" align="middle">
                                            <Col xs={24}>
                                                <Select
                                                    className="no-outline select-width"
                                                    defaultValue="Select"
                                                    onChange={
                                                        handleRemainderClick
                                                    }
                                                    value={
                                                        reminderType || "Select"
                                                    }
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
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            {reminderType != "orderComplete" ? (
                                <Col
                                    xs={24}
                                    className="email-remainder_input-sections_input-section"
                                >
                                    <Row justify="center" align="middle">
                                        <Col xs={24} md={4}>
                                            {" "}
                                            <p>Send to</p>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Row
                                                justify="center"
                                                align="middle"
                                            >
                                                <Col xs={24}>
                                                    <Select
                                                        className="no-outline select-width"
                                                        defaultValue="Select"
                                                        onChange={
                                                            handleSentToClick
                                                        }
                                                        value={
                                                            sentTo || "Select"
                                                        }
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
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            ) : null}

                            <Col
                                xs={24}
                                className="email-remainder_input-sections_input-section"
                            >
                                <Row justify="center" align="middle">
                                    <Col xs={24} md={4}>
                                        <p>Subject</p>
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <Row justify="center" align="middle">
                                            <Col xs={24}>
                                                <input
                                                    className="email-remainder_input-sections_input-section_input input-pad-val no-outline email-input-border"
                                                    value={subject}
                                                    onChange={(e) => {
                                                        setSubject(
                                                            e.target.value
                                                        );
                                                    }}
                                                    type={"text"}
                                                    required
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={24}>
                                <Row justify="center" align="middle">
                                    <Col xs={24} md={16} lg={16} xl={16}>
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
                                                colorPicker: {
                                                    icon: fontColor,
                                                },
                                            }}
                                            editorState={editorState}
                                            wrapperClassName="demo-wrapper"
                                            editorClassName="demo-editor"
                                            onEditorStateChange={
                                                onEditorStateChange
                                            }
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            {reminderType != "orderComplete" && (
                                <>
                                    <Col xs={24}>
                                        <Row justify="center" align="middle">
                                            <Col xs={24} md={4}>
                                                <p className="email-remainder_schedule">
                                                    Schedule
                                                </p>
                                            </Col>
                                            <Col xs={24} md={12}></Col>
                                        </Row>
                                    </Col>
                                    <Col
                                        xs={24}
                                        className="email-remainder_input-sections_input-section"
                                    >
                                        <Row justify="center" align="middle">
                                            <Col xs={24} md={4}>
                                                <p>Send Date</p>
                                            </Col>
                                            <Col xs={24} md={12}>
                                                {reminderType == "custom" ? (
                                                    <input
                                                        className="email-remainder_input-sections_input-section_input picker-padding no-outline"
                                                        style={{
                                                            paddingRight:
                                                                "10px",
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
                                                    <Row
                                                        className="reminder-select-date-container"
                                                        align="middle"
                                                    >
                                                        {" "}
                                                        <div className="align-items margin-div">
                                                            <input
                                                                className="email-remainder_input-sections_input-section_input-short input-pad-val no-outline email-input-border margin-div"
                                                                value={
                                                                    timeSelectorValue
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setTimeSelectorValue(
                                                                        e.target
                                                                            .value
                                                                    );
                                                                }}
                                                                type="number"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="align-items margin-div">
                                                            {" "}
                                                            <Select
                                                                className="no-outline ant-select-short select-width margin-div "
                                                                defaultValue="Select"
                                                                onChange={
                                                                    handleDateClick
                                                                }
                                                                value={
                                                                    timeSelector ||
                                                                    "Select"
                                                                }
                                                            >
                                                                <Option
                                                                    className="ant-select-item-option-content "
                                                                    value={
                                                                        "day"
                                                                    }
                                                                >
                                                                    Day
                                                                </Option>
                                                                <Option
                                                                    className="ant-select-item-option-content"
                                                                    value={
                                                                        "hour"
                                                                    }
                                                                >
                                                                    Hour
                                                                </Option>
                                                                <Option
                                                                    className="ant-select-item-option-content"
                                                                    value={
                                                                        "month"
                                                                    }
                                                                >
                                                                    Month
                                                                </Option>
                                                                <Option
                                                                    className="ant-select-item-option-content"
                                                                    value={
                                                                        "year"
                                                                    }
                                                                >
                                                                    Year
                                                                </Option>
                                                            </Select>
                                                        </div>
                                                    </Row>
                                                )}
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col
                                        xs={24}
                                        className="email-remainder_input-sections_input-section"
                                    >
                                        <Row justify="center" align="middle">
                                            <Col xs={24} md={4}>
                                                <p>Send Time</p>
                                            </Col>
                                            <Col xs={24} md={12}>
                                                <Select
                                                    className="no-outline select-width"
                                                    defaultValue="Select"
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
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col
                                        xs={24}
                                        className="email-remainder_input-sections_input-section"
                                    >
                                        <Row justify="center" align="middle">
                                            <Col xs={24} md={4}>
                                                <p>Time Zone</p>
                                            </Col>
                                            <Col xs={24} md={12}>
                                                <Select
                                                    defaultValue="Select"
                                                    className="select-width"
                                                    onChange={
                                                        handleTimeZoneClick
                                                    }
                                                    value={timeZone || "Select"}
                                                >
                                                    {timeZones.map(
                                                        (zone, index) => {
                                                            return (
                                                                <Option
                                                                    className="ant-select-item-option-content"
                                                                    value={
                                                                        zone.id
                                                                    }
                                                                >
                                                                    {zone.name}
                                                                </Option>
                                                            );
                                                        }
                                                    )}
                                                </Select>
                                            </Col>
                                        </Row>
                                    </Col>
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
                                    {buttonLoader == false ? (
                                        "Save"
                                    ) : (
                                        <span>
                                            <p>Save</p>
                                            <CustomLoader buttonBool={true} />
                                        </span>
                                    )}
                                </button>
                            </div>
                        </Row>
                    </Col>
                </Row>
            </form>
        );
    };

    return (
        <>
            {loading ? <CustomLoader buttonBool={false} /> : null}
            <div>{contextHolder}</div>
            {console.log("the dev data is here", props.user)}
            {showDeleteReminder ? (
                <DeleteModal
                    accept={() => {
                        deleteReminderbyPopup();
                    }}
                    cancel={() => {
                        setShowDeleteReminder(false);
                    }}
                    open={showDeleteReminder}
                />
            ) : null}
            {!emailSettingProps && (
                <Row className="email-setting" justify="center">
                    <Col xs={24}>
                        <p className="email-setting_heading email-settings-title">
                            Email Settings
                        </p>
                        <Row justify="center">
                            <Col xs={24} md={18}>
                                {emailArray &&
                                    emailArray.map((obj, i) => {
                                        return (
                                            <Row
                                                className="email-setting-content"
                                                justify="space-between"
                                                align="middle"
                                            >
                                                <Col xs={24} md={20}>
                                                    <Row
                                                        justify="center"
                                                        align="middle"
                                                    >
                                                        <Col
                                                            xs={6}
                                                            md={4}
                                                            lg={3}
                                                            className="email-setting-content-section-image"
                                                        >
                                                            <img
                                                                src={
                                                                    obj.type ==
                                                                    "reminder"
                                                                        ? iconRemainder
                                                                        : emailButton
                                                                }
                                                            />
                                                        </Col>
                                                        <Col xs={18} md={20}>
                                                            <p className="email-setting-content-section-heading">
                                                                {obj.subject}
                                                            </p>
                                                            <Row
                                                                className="email-setting-content-section-subsection"
                                                                align="middle"
                                                            >
                                                                <Col
                                                                    xs={24}
                                                                    md={8}
                                                                    lg={6}
                                                                >
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
                                                                        {obj.type ==
                                                                        "reminder"
                                                                            ? obj.type
                                                                            : "Order Success"}
                                                                    </p>
                                                                </Col>
                                                                <Col
                                                                    xs={24}
                                                                    md={16}
                                                                >
                                                                    <p
                                                                        className="email-setting-content-section-subsection-subheading"
                                                                        style={{
                                                                            color: "#CBCBCB",
                                                                        }}
                                                                    >
                                                                        {obj.type ==
                                                                        "reminder"
                                                                            ? `${obj.send_after_day} days after invoice`
                                                                            : "Payment Completed"}
                                                                    </p>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col xs={24} md={3}>
                                                    <Row
                                                        justify="space-between"
                                                        align="middle"
                                                    >
                                                        <Col md={6}>
                                                            <img
                                                                className="edit-icon"
                                                                src={edit}
                                                                onClick={() => {
                                                                    updateHandler(
                                                                        obj
                                                                    );
                                                                }}
                                                            />
                                                        </Col>
                                                        <Col md={6}>
                                                            {obj?.is_active ===
                                                            1 ? (
                                                                <img
                                                                    className="bell-icon"
                                                                    src={
                                                                        bellIcon
                                                                    }
                                                                    onClick={() => {
                                                                        activeInActiveReminder(
                                                                            obj
                                                                        );
                                                                    }}
                                                                />
                                                            ) : (
                                                                <img
                                                                    className="bell-icon"
                                                                    src={
                                                                        bellCloseIcon
                                                                    }
                                                                    onClick={() => {
                                                                        activeInActiveReminder(
                                                                            obj
                                                                        );
                                                                    }}
                                                                />
                                                            )}
                                                        </Col>
                                                        <Col md={6}>
                                                            <img
                                                                className="delete-icon"
                                                                src={cross}
                                                                onClick={() => {
                                                                    handleDelete(
                                                                        obj.id
                                                                    );
                                                                }}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        );
                                    })}

                                <Row
                                    className="email-setting_button-section button-margin"
                                    justify="end"
                                >
                                    <button
                                        onClick={() => {
                                            setEmailSettingProps(true);
                                        }}
                                        className="email-setting_button-section_save-button"
                                        style={{ float: "left" }}
                                    >
                                        Add New
                                    </button>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            )}
            {emailSettingProps && <EmailForm />}
        </>
    );
};
const mapStateToProps = (state) => ({
    userID: state.Auth.user?.id,
    token: state.Auth.token,
    user: state.Auth.user,
});
export default connect(mapStateToProps)(EmailSetting);
