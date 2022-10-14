import React from 'react';
import { Switch } from 'antd';
import './style.scss'
import { Checkbox } from 'antd';
import { useHistory } from 'react-router';

function EditInsurance(props) {
  const history=useHistory()
    const label = { inputProps: { 'aria-label': 'Switch demo' } }
    return (
        <div className="root-container">
        <div className="setting-dashboard_container">
        <div className='other-setting'>
            <p className='other-setting_sub_heading'>Edit VSP Signature</p>
            <div className='back-btn' onClick={()=>{history.goBack()}}>
            <img src={"/arrow-back.svg"} alt="arrow" />
            <h6 className='back-text'>
            Back
            </h6>
            </div>
            <div className='other-setting_section'>
                <div className='heading-title'>
                <h6 className='optional-heading'>Select/De select questions</h6>
                <h6 className='optional-heading'>Optional/Mandatory</h6>
                </div>
                <div className='other-setting_section-first' >
                {/* component to be used in map */}
                <div className='other-setting_section-first_switches-switch-edit'>
                          <Checkbox  >Select Vision Plan</Checkbox>
                            
                            <Switch {...label} />
                            
                </div>
                <div className='other-setting_section-first_switches-switch-edit'>
                          <Checkbox  >Select Vision Plan</Checkbox>
                            
                            <Switch {...label} />
                            
                </div>
                <div className='other-setting_section-first_switches-switch-edit'>
                          <Checkbox  >Select Vision Plan</Checkbox>
                            
                            <Switch {...label} />
                            
                </div>
                <div className='other-setting_section-first_switches-switch-edit'>
                          <Checkbox  >Select Vision Plan</Checkbox>
                            
                            <Switch {...label} />
                            
                </div>
                <div className='other-setting_section-first_switches-switch-edit'>
                          <Checkbox  >Select Vision Plan</Checkbox>
                            
                            <Switch {...label} />
                            
                </div>
                <div className='other-setting_section-first_switches-switch-edit'>
                          <Checkbox  >Select Vision Plan</Checkbox>
                            
                            <Switch {...label} />
                            
                </div>
                </div>
               
            </div>
            <button
                                    type="submit"
                                    className={"button"}
                                >
                                    {"Save"}
                                </button>
        </div>
        </div>
        </div>
    );
}

export default EditInsurance;