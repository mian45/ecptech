import React, { useState } from 'react'
import {connect} from "react-redux";
import PropTypes from "prop-types";
import AuthServices from '../services'

import './style.scss'

import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, message, Space, Tooltip } from 'antd';

import { Tag } from 'antd';

import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


const EmailRemainder = (props) => {
    const [editorState, setEditorState] = useState('')

    const handleMenuClick = (e) => {
        message.info('Click on menu item.');
    };

    const onEditorStateChange = () => {
        setEditorState(editorState)
    }

    const handleClick = () => {
        props.dispatch(AuthServices.activeSetting(props.isActiveSettingState-1))

    }

    const menu = (
        <Menu
            onClick={handleMenuClick}
            items={[
                {
                    label: 'Reminder',
                    key: '1',
                    icon: <UserOutlined />,
                },
                {
                    label: '2nd menu item',
                    key: '2',
                    icon: <UserOutlined />,
                },
            ]}
        />
    );

    const date = (
        <Menu
            onClick={handleMenuClick}
            items={[
                {
                    label: 'Reminder',
                    key: '1',
                    icon: <UserOutlined />,
                },
                {
                    label: '2nd menu item',
                    key: '2',
                    icon: <UserOutlined />,
                },
            ]}
        />
    );

    const time = (
        <Menu
            onClick={handleMenuClick}
            items={[
                {
                    label: 'Reminder',
                    key: '1',
                    icon: <UserOutlined />,
                },
                {
                    label: '2nd menu item',
                    key: '2',
                    icon: <UserOutlined />,
                },
            ]}
        />
    );

    const timeZone = (
        <Menu
            onClick={handleMenuClick}
            items={[
                {
                    label: 'Reminder',
                    key: '1',
                    icon: <UserOutlined />,
                },
                {
                    label: '2nd menu item',
                    key: '2',
                    icon: <UserOutlined />,
                },
            ]}
        />
    );
    const handleSubmit = (event) => {
        event.preventDefault();


    }
    return (
        <form onSubmit={handleSubmit}>
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
                            <Dropdown className='dropdown-email' overlay={menu}>
                                <Button>
                                    <Space>
                                        Reminder
                                        <DownOutlined />
                                    </Space>
                                </Button>
                            </Dropdown>
                        </div>
                        <div className='email-remainder_input-sections_input-section'>
                            <p>Send to</p>
                            <Dropdown className='dropdown-email' overlay={menu}>
                                <Button>
                                    <Space>
                                        <Tag className='tags'>All customer</Tag>
                                        <DownOutlined />
                                    </Space>
                                </Button>
                            </Dropdown>
                        </div>
                        <div className='email-remainder_input-sections_input-section'>
                            <p>Subject</p>
                            <input className='email-remainder_input-sections_input-section_input' onChange={(e) => {
                                setSubject(e.target.value)
                            }} type={'text'} required />
                        </div>

                        <Editor
                            editorState={editorState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={onEditorStateChange}
                        />
                        <p className='email-remainder_schedule'>Schedule</p>
                        <div className='email-remainder_input-sections_input-section'>
                            <p>Send date</p>
                            <Dropdown className='dropdown-email' overlay={date}>
                                <Button>
                                    <Space>
                                        2 days after invoice sent
                                        <DownOutlined />
                                    </Space>
                                </Button>
                            </Dropdown>
                        </div>
                        <div className='email-remainder_input-sections_input-section'>
                            <p>Send Time</p>
                            <Dropdown className='dropdown-email' overlay={time}>
                                <Button>
                                    <Space>
                                        9:00 AM
                                        <DownOutlined />
                                    </Space>
                                </Button>
                            </Dropdown>
                        </div>
                        <div className='email-remainder_input-sections_input-section'>
                            <p>Time Zone</p>
                            <Dropdown className='dropdown-email' overlay={timeZone}>
                                <Button>
                                    <Space>
                                        Washington, DC, USA (GMT-4)
                                        <DownOutlined />
                                    </Space>
                                </Button>
                            </Dropdown>
                        </div>
                        <button className='email-remainder_save-button'>Save</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

EmailRemainder.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isActiveSettingState: PropTypes.number.isRequired,

};

const mapStateToProps = (state) => ({

    isActiveSettingState: state.Auth.isActiveSettingState
});

export default  connect(mapStateToProps) (EmailRemainder)
