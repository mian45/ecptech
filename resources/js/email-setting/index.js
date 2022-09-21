import React, { useEffect, useState } from 'react'
import { Select } from 'antd';
const { Option } = Select;
import { connect } from "react-redux";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToMarkdown from 'draftjs-to-markdown';

import axios from 'axios';

import edit from "../../images/edit.png"
import cross from "../../images/cross.png"
import iconRemainder from '../../images/remainder.svg'
import bellIcon from '../../images/bell-icon.svg'
import emailButton from '../../images/email.svg'

import './style.scss'

const EmailSetting = (props) => {

    const [emailSettingProps, setEmailSettingProps] = useState(false)

    const [idState, setIdState] = useState('')

    const [reminderType, setReminderType] = useState('reminder')
    const [sentTo, setSentTo] = useState('')
    const [subject, setSubject] = useState('')
    const [editorState, setEditorState] = useState('')
    const [dates, setDates] = useState('')
    const [times, setTimes] = useState('')
    const [timeZone, setTimeZone] = useState('')
    const [emailArray, setEmailArray] = useState([])


    useEffect(() => {
        getReminder()
    }, [])

    const onEditorStateChange = (editorState) => {
        console.log(editorState , 'value');
        setEditorState(editorState)
    }


    const addReminder = () => {
        var data = new FormData();
        data.append('userId', props.userID);
        data.append('type', reminderType);
        data.append('invoiceType', sentTo);
        data.append('subject', subject);
        data.append('body', draftToMarkdown(convertToRaw(editorState.getCurrentContent())));
        data.append('sendDate', dates);
        data.append('sendTime', times);
        data.append('TimeZone', timeZone);

        var config = {
            method: 'post',
            url: `${process.env.MIX_REACT_APP_URL}/api/addReminder`,
            headers: {
                'Authorization': `Bearer ${props.token}`,
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const editReminder = (value) => {
        var data = new FormData();
        data.append('id', idState);
        data.append('type', reminderType);
        data.append('invoiceType', sentTo);
        data.append('subject', subject);
        data.append('body', draftToMarkdown(convertToRaw(editorState.getCurrentContent())));
        data.append('sendDate', dates);
        data.append('sendTime', times);
        data.append('TimeZone', timeZone);

        var config = {
            method: 'post',
            url: `${process.env.MIX_REACT_APP_URL}/api/editReminder`,
            headers: {
                'Authorization': `Bearer ${props.token}`,
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                getReminder()
                setReminderType('')
                setSentTo('')
                setSubject('')
                setEditorState('')
                setDates('')
                setTimes('')
                setTimeZone('')
                setIdState(null)
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const deleteReminder = (id) => {
        var data = new FormData();
        data.append('id', id);

        var config = {
            method: 'post',
            url: `${process.env.MIX_REACT_APP_URL}/api/deleteReminder`,
            headers: {
                'Authorization': `Bearer ${props.token}`,
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const getReminder = () => {
        var data = new FormData();

        var config = {
            method: 'get',
            url: `${process.env.MIX_REACT_APP_URL}/api/getReminders?userId=${props.userID}`,
            headers: {
                'Authorization': `Bearer ${props.token}`,
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                let res = response.data.data;
                setEmailArray(res)
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setEmailArray([...emailArray])
        addReminder()
        getReminder()
        setReminderType('')
        setEmailSettingProps(false)
    }

    const updateHandler = (obj) => {
        setIdState(obj.id)
        console.log(obj.id);
        setReminderType(obj.type)
        setSentTo(obj.invoice_type)
        setSubject(obj.subject)
        setEditorState(obj.body)
        setDates(obj.send_date)
        setTimes(obj.send_time)
        setTimeZone(obj.time_zone)
        setEmailSettingProps(true)
    }

    const handleEdit = (e) => {
        e.preventDefault()
        editReminder()
        setEmailSettingProps(false)
    }

    const handleDelete = (id) => {
        deleteReminder(id)
        setEmailArray([...emailArray].filter((emailObj) => {
            return emailObj.id !== id
        }))
    }

    var quarterHours = ["00", "15", "30", "45"];
    var time = [];
    for (var i = 0; i < 24; i++) {
        if (i < 13) {
            for (var j = 0; j < 4; j++) {
                time.push(`${i + ":" + quarterHours[j]} AM`);
            }

        }
        else {
            for (var j = 0; j < 4; j++) {
                time.push(`${i - 12 + ":" + quarterHours[j]} PM`);
            }
        }
    }

    const handleRemainderClick = (value) => {
        setReminderType(value)
    }

    const handleSentToClick = (value) => {
        setSentTo(value)
    }

    const handleDateClick = (value) => {
        setDates(value)
    }

    const handleTimeClick = (value) => {
        setTimes(value)
    }

    const onChange = (value) => {
        setEditorState(value.data)
    }

    const handleTimeZoneClick = (value) => {
        setTimeZone(value)
    }

    const handleClick = () => {
        setEmailSettingProps(false)
    }

    return (
        <div>
            {
                !emailSettingProps &&
                <div className='email-setting'>
                    <p className='email-setting_heading'>Email Settings</p>
                    {
                        emailArray && emailArray.map((obj, i) => {
                            return (
                                <div className='email-setting-content'>
                                    <div className='email-setting-content-section'>
                                        <div className='email-setting-content-section-image'>
                                            <img src={obj.type == 'reminder' ? iconRemainder : emailButton} /></div>
                                        <div>
                                            <div>
                                                <p className='email-setting-content-section-heading'>{obj.subject}</p>
                                            </div>
                                            <div className='email-setting-content-section-subsection' >
                                                <p className='email-setting-content-section-subsection-subheading' style={obj.type == 'reminder' ? { color: '#61C77B' } : { color: '#6FA5CB' }}>{obj.type}</p>
                                                <p className='email-setting-content-section-subsection-subheading' style={{ color: '#CBCBCB' }}>{obj.type == 'reminder' ? `${obj.send_date} days after invoice` : 'Payment Completed'}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <img style={{ width: '18px', height: '18px', marginRight: '35.4px' }} src={edit} onClick={() => { updateHandler(obj) }} />
                                        <img style={{ width: '16px', height: '18px', marginRight: '35.6px' }} src={bellIcon} />
                                        <img style={{ width: '16px', height: '16px', }} src={cross}
                                            onClick={() => {
                                                handleDelete(obj.id)
                                            }}
                                        />
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className='email-setting_button-section'>
                        <button onClick={() => { setEmailSettingProps(true) }} className='email-setting_button-section_save-button'>Add New</button>
                    </div>
                </div>
            }
            {
                emailSettingProps &&
                <form>
                    <div className='email-remainder'>
                        <p className='email-remainder_heading'>Add New</p>

                        <div>
                            <div onClick={handleClick} className='email-remainder_arrow-section'>
                                <img src={'/arrow-back.svg'} alt='arrow' />
                                <p className='email-remainder_arrow-section_back'>Back</p>
                            </div>
                            <div className='email-remainder_input-sections'>
                                <div className='email-remainder_input-sections_input-section'>
                                    <p>Email Type</p>
                                    <Select

                                        defaultValue="Select"
                                        style={{
                                            width: 120,
                                        }}
                                        onChange={handleRemainderClick}
                                        value={reminderType || "Select"}
                                    >
                                        <Option value={'reminder'}>Reminder</Option>
                                        <Option value={'orderComplete'}>Thank You</Option>
                                    </Select>
                                </div>
                                {
                                    reminderType == 'reminder' ?
                                        <div className='email-remainder_input-sections_input-section'>
                                            <p>Send to</p>
                                            <Select

                                                defaultValue="Select"
                                                style={{
                                                    width: 120,
                                                }}
                                                onChange={handleSentToClick}
                                                value={sentTo || "Select"}
                                            >
                                                <Option value={'paid'}>Paid</Option>
                                                <Option value={'unpaid'}>Unpaid</Option>
                                                <Option value={'all'}>All</Option>
                                            </Select>
                                        </div>
                                        :
                                        <div className='email-remainder_input-sections_input-section'>
                                            <p>Send to</p>
                                            <Select

                                                defaultValue="Select"
                                                style={{
                                                    width: 120,
                                                }}
                                                onChange={handleSentToClick}
                                                value={sentTo || "Select"}
                                            >
                                                <Option value={'thanku'}>Thank You</Option>
                                            </Select>
                                        </div>
                                }


                                <div className='email-remainder_input-sections_input-section'>
                                    <p>Subject</p>
                                    <input className='email-remainder_input-sections_input-section_input' value={subject} onChange={(e) => {
                                        setSubject(e.target.value)
                                    }} type={'text'} required />
                                </div>
                                <div>
                                    <Editor
                                        toolbar={{
                                            options: ['fontSize', 'inline', 'textAlign', 'image'],
                                            inline: { inDropdown: false, options: ['bold', 'italic'] },
                                            textAlign: { inDropdown: true },
                                        }}

                                        editorState={editorState}
                                        wrapperClassName="demo-wrapper"
                                        editorClassName="demo-editor"
                                        onEditorStateChange={onEditorStateChange}
                                    />
                                </div>
                                {
                                    reminderType == 'reminder' &&
                                    <>
                                        <p className='email-remainder_schedule'>Schedule</p>
                                        <div className='email-remainder_input-sections_input-section'>
                                            <p>Send date</p>
                                            <Select

                                                defaultValue="Select"
                                                style={{
                                                    width: 120,
                                                }}
                                                onChange={handleDateClick}
                                                value={dates || "Select"}
                                            >
                                                <Option value={1}>1 days after invoice sent</Option>
                                                <Option value={2}>2 days after invoice sent</Option>
                                                <Option value={3}>3 days after invoice sent</Option>
                                                <Option value={4}>4 days after invoice sent</Option>
                                                <Option value={5}>5 days after invoice sent</Option>
                                                <Option value={6}>6 days after invoice sent</Option>
                                                <Option value={7}>7 days after invoice sent</Option>
                                            </Select>
                                        </div>
                                        <div className='email-remainder_input-sections_input-section'>
                                            <p>Send Time</p>
                                            <Select

                                                defaultValue="Select"
                                                style={{
                                                    width: 120,
                                                }}
                                                onChange={handleTimeClick}
                                                value={times || "Select"}
                                            >
                                                {
                                                    time && time?.map((e, key) => {
                                                        return < Option value={e}>{e}</Option>
                                                    })

                                                }
                                            </Select>
                                        </div>
                                        <div className='email-remainder_input-sections_input-section'>
                                            <p>Time Zone</p>
                                            <Select

                                                defaultValue="Select"
                                                style={{
                                                    width: 120,
                                                }}
                                                onChange={handleTimeZoneClick}
                                                value={timeZone || "Select"}
                                            >
                                                <Option value={'Washington, DC, USA (GMT-4)'}>Washington, DC, USA (GMT-4)</Option>
                                            </Select>
                                        </div>
                                    </>
                                }
                                <button onClick={(e) => { idState ? handleEdit(e) : handleSubmit(e) }} className='email-remainder_save-button'>Save</button>
                            </div>
                        </div>
                    </div>
                </form >
            }
        </div>
    )
}
const mapStateToProps = (state) => ({

    userID: state.Auth.user?.id,
    token: state.Auth.token
});
export default connect(mapStateToProps)(EmailSetting)
