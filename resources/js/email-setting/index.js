import React, {useEffect, useState} from 'react'
import './style.scss'
import {connect} from "react-redux";
import PropTypes from "prop-types";
import AuthServices from '../services'

const EmailSetting = (props) => {
    const handleClick = () => {
        props.dispatch(AuthServices.activeSetting(props.isActiveSettingState+1))

    }
useEffect(()=>{
    console.log(props.isActiveSettingState)

},[props.isActiveSettingState])

    return (
        <div className='email-setting'>
            <p className='email-setting_heading'>Email Settings</p>
            <div className='email-setting_button-section'>
                <button onClick={handleClick} className='email-setting_button-section_save-button'>Add New</button>
            </div>
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
