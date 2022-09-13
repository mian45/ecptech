import React from 'react'

import { Select } from 'antd';
const { Option } = Select;


const EyePrescriptionSection = ({name , setCylindeuFrom, setCylindeuTo, setSphereFrom, setSphereTo }) => {
    return (
        <div className='eye-prescription_section' style={{ marginBottom: '10px' }}>
            <div className='eye-prescription_section-bar'>
                <div className='eye-prescription_section-bar-first'><p>{name}</p></div>
                <div className='eye-prescription_section-bar-second'>
                    <div>
                        <p>Sphere (SPH)</p>
                        <div className='columns'>
                            <div>
                                <Select className='eye-prescription_section-bar-second_dropdown'
                                    defaultValue="From"
                                    style={{
                                        width: 120,
                                    }}
                                    onChange={(e) => { setCylindeuFrom(e.target.value) }}
                                >
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="disabled">Disabled</Option>
                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>
                            </div>
                            <p>
                                to
                            </p>
                            <div>
                                <Select className='eye-prescription_section-bar-second_dropdown'
                                    defaultValue="Select"
                                    style={{
                                        width: 120,
                                    }}
                                    onChange={(e) => { setCylindeuTo(e.target.value) }}
                                >
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="disabled">Disabled</Option>
                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>Sphere (SPH)</p>
                        <div className='columns'>
                            <div>
                                <Select className='eye-prescription_section-bar-second_dropdown'
                                    defaultValue="From"
                                    style={{
                                        width: 120,
                                    }}
                                    onChange={(e) => { setSphereFrom(e.target.value) }}
                                >
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="disabled">Disabled</Option>
                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>
                            </div>
                            <p>
                                to
                            </p>
                            <div>
                                <Select className='eye-prescription_section-bar-second_dropdown'
                                    defaultValue="Select"
                                    style={{
                                        width: 120,
                                    }}
                                    onChange={(e) => { setSphereTo(e.target.value) }}
                                >
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="disabled">Disabled</Option>
                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EyePrescriptionSection;