import React from 'react'
import { Switch } from 'antd';

import './style.scss'

const label = { inputProps: { 'aria-label': 'Switch demo' } }

const OtherSetting = () => {
    return (
        <div className='other-setting'>
            <p className='other-setting_heading'>Other Settings</p>
            <div className='other-setting_section'>
                <div className='other-setting_section-first' >
                    <p className='other-setting_section-first_label'>Mandatory Options in Calculator</p>
                    <div className='other-setting_section-first_switches'>
                        <div className='other-setting_section-first_switches-switch'>
                            <p>Select Vision Plan</p>
                            <Switch {...label} />
                        </div>
                        <div className='other-setting_section-first_switches-switch'>
                            <p>Select Vision Plan</p>
                            <Switch {...label} />
                        </div>
                        <div className='other-setting_section-first_switches-switch'>
                            <p>Lens Benefit Available</p>
                            <Switch {...label} />
                        </div>
                        <div className='other-setting_section-first_switches-switch'>
                            <p>Material Copay</p>
                            <Switch {...label} />
                        </div>
                        <div className='other-setting_section-first_switches-switch'>
                            <p>Material Copay</p>
                            <Switch {...label} />
                        </div>
                        <div className='other-setting_section-first_switches-switch'>
                            <p>Lens Options with No Copay</p>
                            <Switch {...label} />
                        </div>
                        <div className='other-setting_section-first_switches-switch'>
                            <p>Lens Type</p>
                            <Switch {...label} />
                        </div>
                        <div className='other-setting_section-first_switches-switch'>
                            <p>Lens Material</p>
                            <Switch {...label} />
                        </div>
                        <div className='other-setting_section-first_switches-switch'>
                            <p>Photochromics</p>
                            <Switch {...label} />
                        </div>
                        <div className='other-setting_section-first_switches-switch'>
                            <p>Sunglass Lens</p>
                            <Switch {...label} />
                        </div>
                        <div className='other-setting_section-first_switches-switch'>
                            <p>Antireflective Properties</p>
                            <Switch {...label} />
                        </div>
                    </div>
                </div>
                <div className='other-setting_section-second' >
                    <div>
                        <p className='other-setting_section-second_label'>Mandatory Options in Calculator</p>
                    </div>
                    <div >
                        <div className='other-setting_section-second_switches-switch'>
                            <p>Glasses Protection Plan</p>
                            <Switch className='other-switches' {...label} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default OtherSetting