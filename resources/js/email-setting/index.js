import React, { useState } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Select } from 'antd';
const { Option } = Select;
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import CKEditor from "react-ckeditor-component";

import axios from 'axios';

import edit from "../../images/edit.png"
import cross from "../../images/cross.png"
import iconRemainder from '../../images/remainder.svg'
import bellIcon from '../../images/bell-icon.svg'

import './style.scss'

const EmailSetting = (props) => {

    const [emailSettingProps, setEmailSettingProps] = useState(false)

    const [remainderType, setRemainderType] = useState('')
    const [sentTo, setSentTo] = useState('')
    const [subject, setSubject] = useState('')
    const [editorState, setEditorState] = useState('')
    const [dates, setDate] = useState('')
    const [times, setTimes] = useState()
    const [timeZone, setTimeZone] = useState('')

    const addRemainder = () => {
        var data = new FormData();
        data.append('userId', '43');
        data.append('type', remainderType);
        data.append('invoiceType', sentTo);
        data.append('subject', subject);
        data.append('body', editorState);
        data.append('sendDate', dates);
        data.append('sendTime', times);
        data.append('TimeZone', 'Washington, DC, USA (GMT-4)');

        var config = {
            method: 'post',
            url: `${process.env.MIX_REACT_APP_URL}/api/addReminder`,
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNDY1NDg2MzcwNjEwZGZmZTc0YmYzNTBiMWNiNDRjYzczNGZiNTdlNWZiZjg2ZmY2MWM5YjRjOTEwM2I3Y2QwYTc4ZjFjOTFiZmQ4MzhhMjYiLCJpYXQiOjE2NjMwMTA2MjIuMTM5Njc5LCJuYmYiOjE2NjMwMTA2MjIuMTM5NjgyLCJleHAiOjE2OTQ1NDY2MjIuMTM1NjQ5LCJzdWIiOiIxMCIsInNjb3BlcyI6W119.ShZcewYnVARNHPvNTuuQWMIJ6Zt2iorUkJ5qAcQ10_u0X709vHK3jo72stRaFj0fw3O65XrqW5pwK3kvF_I9E6oEBglpFH7h9SDfl_uccVd5h2HVtfK3sBAzYyA_9wsVcGOFhsPcOVAevwA5FAYQz_49eQcy1q4_CV_wpVFr0rQO-jrSePT57nabp6wBHbDvgllNkmDuJ2w97rMn7dUddMdhh1eh2sA5lL7AfzOV8BYbajuotgr2fCfd8zSOS7us9p8rKk0Y_3mLyW6HAuDJGRvt2ENnavgoM2hpx5wmO9EX095DDanIjpmXtfAGT2uHCU2DxhgXsMMXSLII7wVXLTxjCZHYIVaqxT4ghHL6MpFjJUeXFjOGxogDQOulRoM1rDZ9IeK5bd6ZcQAwVi7DcvVpCr0dsutspVS8fBN9NsAT6wZl_Od3CW9jfah2_I66oU5FTrnOmvzuPlJp_CS7UDRUofWB1OPzdbCWx6NB_x0rIhQXJkMjZ1UJELG0qV3vXSNG2_vm890_IqQqKNGgeBIDJ5CDf4DSbZ2ZnQMQGKhkdU8f51U_lf5xuTRBNolu4w8f8bvuRaOO3WNh6qzvS09lzbvEfJRV3BjCqqlYBKxd7eZiURDXUSx71AuqzrSwoTbGrqijwlzoOQA6fHPhFdx1RiGkGZP_TLLNkwjZyWo',
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

    const editRemainder = () => {
        var data = new FormData();
        data.append('id', '1');
        data.append('type', 'remainder');
        data.append('invoiceType', 'paid');
        data.append('subject', 'pay invoice to confirm your order');
        data.append('body', 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without');
        data.append('sendDate', '2');
        data.append('sendTime', '9999-12-31 23:59:59');
        data.append('TimeZone', 'Washington, DC, USA (GMT-4)');

        var config = {
            method: 'post',
            url: `${process.env.MIX_REACT_APP_URL}/api/editReminder`,
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNjJkNjMyYTEwZDE5YTllOTQyZWNlZjBjMjRlZmE5ZjBhZWUxZGY4ZmE2MDZkYjAwMDllNjc1MDEyOTgwMjI0MzAzYzNmNDhhMjU4OGY4MjciLCJpYXQiOjE2NjI0ODk3NjEuNjU0MzMyLCJuYmYiOjE2NjI0ODk3NjEuNjU0MzM2LCJleHAiOjE2OTQwMjU3NjEuNjQ5NjEzLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.YtL0ZHDefL4TlllfUvbWG4BavLs9FCRiAQDzeDvjXw2sdcmLtK1WMRKzU5gaPi8bZHutmWXVJkdeGl79pNtphcmFEw20tSICTgZ4XQ2lkt5rU0PyG1PFbPOpOHsNU-rsI5VpyRFETKWphawT61eB_raDNYYYmu9uzMdxiJVmcbLqApUKU5F8TGlwUPazEsFQNkHPus9_lH02_t1n8IYHu4tnMrQxDQK7xi40bYcHEz2kmce1NUJp_3N5I-mCY7oOfIbkreURsv6NBt3Hhw1vtu2tSRkfA770mb4gjlAUvx-PZ38ORYbrBNMTK0NZVZ4vKWLw-2Jr-tNZO0lJKRUSoh5HsMj3nBB2snSTcdfINc7rMAnnhI-f3eOsWUjanUbo3ek35eAUyMNR9vYaXHn7M_mZHMAyNWdTlYcyMJr6bMjZMACAqxaSOJSzRzENhVa2sPPoxN1uQu19Y7WbKSjNibdQBJoSH0sD5rP3vnMBOP_mUtTznIZ3rVAcg3TQ8BeJfW_ThgZ9YMUt0cZnM_qP2yMKlCUCOWFvr-1B60M9sqm01xTOQc4pT6GQAugMUBMR8mKas8MC8QiDNQjGScvY3We4FgXz2R3dY9-ral3ppbqfgfPqIwFDFww4xjkkMoS7FS6-ImcT_glfuXxX8_ihTCDphZkZp-tIRddze4kJ8Kw',
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

    const deleteRemainder = () => {
        var data = new FormData();
        data.append('id', '6');

        var config = {
            method: 'post',
            url: `${process.env.MIX_REACT_APP_URL}/api/deleteReminder`,
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNjJkNjMyYTEwZDE5YTllOTQyZWNlZjBjMjRlZmE5ZjBhZWUxZGY4ZmE2MDZkYjAwMDllNjc1MDEyOTgwMjI0MzAzYzNmNDhhMjU4OGY4MjciLCJpYXQiOjE2NjI0ODk3NjEuNjU0MzMyLCJuYmYiOjE2NjI0ODk3NjEuNjU0MzM2LCJleHAiOjE2OTQwMjU3NjEuNjQ5NjEzLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.YtL0ZHDefL4TlllfUvbWG4BavLs9FCRiAQDzeDvjXw2sdcmLtK1WMRKzU5gaPi8bZHutmWXVJkdeGl79pNtphcmFEw20tSICTgZ4XQ2lkt5rU0PyG1PFbPOpOHsNU-rsI5VpyRFETKWphawT61eB_raDNYYYmu9uzMdxiJVmcbLqApUKU5F8TGlwUPazEsFQNkHPus9_lH02_t1n8IYHu4tnMrQxDQK7xi40bYcHEz2kmce1NUJp_3N5I-mCY7oOfIbkreURsv6NBt3Hhw1vtu2tSRkfA770mb4gjlAUvx-PZ38ORYbrBNMTK0NZVZ4vKWLw-2Jr-tNZO0lJKRUSoh5HsMj3nBB2snSTcdfINc7rMAnnhI-f3eOsWUjanUbo3ek35eAUyMNR9vYaXHn7M_mZHMAyNWdTlYcyMJr6bMjZMACAqxaSOJSzRzENhVa2sPPoxN1uQu19Y7WbKSjNibdQBJoSH0sD5rP3vnMBOP_mUtTznIZ3rVAcg3TQ8BeJfW_ThgZ9YMUt0cZnM_qP2yMKlCUCOWFvr-1B60M9sqm01xTOQc4pT6GQAugMUBMR8mKas8MC8QiDNQjGScvY3We4FgXz2R3dY9-ral3ppbqfgfPqIwFDFww4xjkkMoS7FS6-ImcT_glfuXxX8_ihTCDphZkZp-tIRddze4kJ8Kw',
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

    const getRemainder = () => {
        var data = new FormData();

        var config = {
            method: 'get',
            url: `${process.env.MIX_REACT_APP_URL}/api/getReminders?userId=43`,
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOTk5ZTE1Y2I0ZWU0YjllMTk0MWQzODA0ZDc5YzRlMjQxZDkyNzg4NTk4MDQyZjBkMGEyM2JiYmQ3MGUzODRlYTVlNzUzNDQ5ZDhjYzZmMDkiLCJpYXQiOjE2NjMwMTQ3ODQuMzA2MTQzLCJuYmYiOjE2NjMwMTQ3ODQuMzA2MTQ3LCJleHAiOjE2OTQ1NTA3ODQuMjk2MTg3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.GzB1Iq-0Qb53ljZAkBIetOrdGb1nTz6SJ9OfvMI__VQ2dyg0ZsOk0GDlAOG5n03v5oSWWSNlUQ7_mtIgXzq1y94KNjv-lEnfDdl9a--Ac5EcAZm_uu6nZ2GoyXfHfWI8M89IvU7Tz1BFeBPmZvticB35EZMtK9Ghed3e_5Yxbglucity59gI2FoWBF-gHwLiJpLqQRPSo2ifz2IzrP01kB0FP6NU7C5PEguRikE9eYL3l6bOE4ftmo4sTmw-YiEPJ4IdRcELRzOCVOHPYg_RhoDsbRyPRI3w2j3o9cLSXUDwP4syUfsQhfUchngF5BwDWChx2XUXpROBltTTw9sYstMC1hx6odFebS-Q_CW8UiJr0ffydPXoJkJ_Kbl9zFA8e1BLSaGKFDPkslQOikexUn8SzDCPSY_Muqv-oc3TYUOW5l3okURg-Y50bwfX64ECj7QowXVlmjeMjIgt-H5M2Xi66tb4TIRRXrREsxEfABEzMQ8zZm8rAvyg2V2nBsOazj8ljjAt2v2tg2nsw7Lyb2JPvH8JjrRcMD0qD8k7xRh8kXZAjC9Xy_cFNVhD4zo1DQvAJoG6cd2wVaCYd89qc1NMG7yVMcCfF7JDen7FPXhYyR1UXmI9P290ov5snGaWx1Yas7zrr3upF-NY9Bjj-vQXnbZdGYk9zgPemPAEkBM',
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
        setRemainderType(value)
    }

    const handleSentToClick = (value) => {
        setSentTo(value)
    }

    const handleDateClick = (value) => {
        setDate(value)
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

    const handleSubmit = (event) => {
        event.preventDefault();
        addRemainder()
        setEmailSettingProps(false)
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
                    <div className='email-setting-content'>
                        <div className='email-setting-content-section'>
                            <div className='email-setting-content-section-image'>
                                <img src={iconRemainder} /></div>
                            <div>
                                <div>
                                    <p className='email-setting-content-section-heading'>{subject}Pay your invoice to confirm your order</p>
                                </div>
                                <div className='email-setting-content-section-subsection' >
                                    <p className='email-setting-content-section-subsection-subheading'>{remainderType}Reminder</p>
                                    <p className='email-setting-content-section-subsection-subheading'>{dates} days after invoice</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <img style={{ width: '18px', height: '18px', marginRight: '35.4px' }} src={edit} />
                            <img style={{ width: '16px', height: '18px', marginRight: '35.6px' }} src={bellIcon} />
                            <img style={{ width: '16px', height: '16px', }} src={cross} />
                        </div>
                    </div>
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
                                        value={remainderType || "Select"}
                                    >
                                        <Option value={'remainder'}>Remainder</Option>
                                        <Option value={'thanks'}>Thank You</Option>
                                    </Select>
                                </div>
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
                                <div className='email-remainder_input-sections_input-section'>
                                    <p>Subject</p>
                                    <input className='email-remainder_input-sections_input-section_input' value={subject} onChange={(e) => {
                                        setSubject(e.target.value)
                                    }} type={'text'} required />
                                </div>
                                <div>
                                    <CKEditor
                                        activeClass="p10"
                                        content={editorState}
                                        events={{
                                            "change": onChange
                                        }}
                                    />
                                </div>
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
                                        <Option value={'Washington, DC, USA (GMT-4)'}>Remainder</Option>
                                        <Option value={'Washington, DC, USA (GMT-4)'}>Thank You</Option>
                                    </Select>
                                </div>
                                <button onClick={handleSubmit} className='email-remainder_save-button'>Save</button>
                            </div>
                        </div>
                    </div>
                </form >
            }
        </div>
    )
}

EmailSetting.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isActiveSettingState: PropTypes.number.isRequired,

};

const mapStateToProps = (state) => ({

    isActiveSettingState: state.Auth.isActiveSettingState
});
export default connect(mapStateToProps)(EmailSetting)
