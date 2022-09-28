import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { Select } from 'antd';
const { Option } = Select;
import Axios from "../../js/Http";
import './style.scss'


const EyePrescription = (props) => {

    const [crsphereFrom, setCrSphereFrom] = useState('')
    const [crsphereTo, setCrSphereTo] = useState('')
    const [crCylinderFrom, setCrCylinderFrom] = useState('')
    const [crCylinderTo, setCrCylinderTo] = useState('')

    const [pbsphereFrom, setPbSphereFrom] = useState('')
    const [pbsphereTo, setPbSphereTo] = useState('')
    const [pbCylinderFrom, setPbCylinderFrom] = useState('')
    const [pbCylinderTo, setPbCylinderTo] = useState('')

    const [tvsphereFrom, setTvSphereFrom] = useState('')
    const [tvsphereTo, setTvSphereTo] = useState('')
    const [tvCylinderFrom, setTvCylinderFrom] = useState('')
    const [tvCylinderTo, setTvCylinderTo] = useState('')

    const [hisphereFrom, setHiSphereFrom] = useState('')
    const [hisphereTo, setHiSphereTo] = useState('')
    const [hiCylinderFrom, setHiCylinderFrom] = useState('')
    const [hiCylinderTo, setHiCylinderTo] = useState('')

    const [hiasphereFrom, setHiaSphereFrom] = useState('')
    const [hiasphereTo, setHiaSphereTo] = useState('')
    const [hiaCylinderFrom, setHiaCylinderFrom] = useState('')
    const [hiaCylinderTo, setHiaCylinderTo] = useState('')

    const [hifsphereFrom, setHifSphereFrom] = useState('')
    const [hifsphereTo, setHifSphereTo] = useState('')
    const [hifCylinderFrom, setHifCylinderFrom] = useState('')
    const [hifCylinderTo, setHifCylinderTo] = useState('')

    var quarterHours = ["00", "75", "50", "25"];
    var sphere = [];
    for (var i = -16; i <= 10; i++) {
        for (var j = 0; j < 4; j++) {
            sphere.push(`${i + "." + quarterHours[j]}`);
        }
    }


    var quarterHours = ["00", "75", "50", "25"];
    var cylinder = [];
    for (var i = -7; i <= 0; i++) {
        for (var j = 0; j < 4; j++) {
            cylinder.push(`${i + "." + quarterHours[j]}`);
        }
    }

    const handleSubmit = () => {
        addEyePrescriptions();
    }

    const addEyePrescriptions = async () => {
        try {
            var data = {
                "eye_prescriptions": [
                    {
                        "name": "CR39",
                        "sphere_from": crsphereFrom,
                        "sphere_to": crsphereTo,
                        "cylinder_from": crCylinderFrom,
                        "cylinder_to": crCylinderTo
                    },
                    {
                        "name": "Polycarbonate",
                        "sphere_from": pbsphereFrom,
                        "sphere_to": pbsphereTo,
                        "cylinder_from": pbCylinderFrom,
                        "cylinder_to": pbCylinderTo
                    },
                    {
                        "name": "Trivex",
                        "sphere_from": tvsphereFrom,
                        "sphere_to": tvsphereTo,
                        "cylinder_from": tvCylinderFrom,
                        "cylinder_to": tvCylinderTo
                    },
                    {
                        
                        "name": "Hi Index 1.67",
                        "sphere_from": hisphereFrom,
                        "sphere_to": hisphereTo,
                        "cylinder_from": hiCylinderFrom,
                        "cylinder_to": hiCylinderTo
                    },
                    {
                        "name":" Hi Index 1.70",
                        "sphere_from": hiasphereFrom,
                        "sphere_to": hiasphereTo,
                        "cylinder_from": hiaCylinderFrom,
                        "cylinder_to": hiaCylinderTo
                    },
                    {
                        "name":" Hi Index 1.60",
                        "sphere_from": hifsphereFrom,
                        "sphere_to": hifsphereTo,
                        "cylinder_from": hifCylinderFrom,
                        "cylinder_to": hifCylinderTo
                    }
                ],
                "user_id": props.userID
            };
            const res = await Axios.post(
                process.env.MIX_REACT_APP_URL + "/api/eye-prescriptions",
                data
            );
            console.log(res.config.data);
        } catch (err) {
        }
    };
    const getEyePrescriptions=async()=>{
        try {
            const res = await Axios.get(
                process.env.MIX_REACT_APP_URL + `/api/prescriptions?user_id=${props.userID} `,
            );
                if(res.data.data.length>0){
                    res.data.data.map((item,index)=>{
                        switch (item.name) {
                            case "CR39":
                                {   setCrSphereFrom(item.sphere_from)
                                    setCrSphereTo(item.sphere_to)
                                    setCrCylinderTo(item.cylinder_to)
                                    setCrCylinderFrom(item.cylinder_from)
                                }
                            case "Polycarbonate":
                                {
                                    setPbSphereFrom(item.sphere_from)
                                    setPbSphereTo(item.sphere_to)
                                    setPbCylinderTo(item.cylinder_to)
                                    setPbCylinderFrom(item.cylinder_from)
                                }
                            case  "Trivex":
                                {
                                    setTvSphereFrom(item.sphere_from)
                                    setTvSphereTo(item.sphere_to)
                                    setTvCylinderTo(item.cylinder_to)
                                    setTvCylinderFrom(item.cylinder_from)
                                }
                            case "Hi Index 1.67":
                                {
                                    setHiSphereFrom(item.sphere_from)
                                    setHiSphereTo(item.sphere_to)
                                    setHiCylinderTo(item.cylinder_to)
                                    setHiCylinderFrom(item.cylinder_from)
                                }
                            case " Hi Index 1.70":
                                {
                                    setHiaSphereFrom(item.sphere_from)
                                    setHiaSphereTo(item.sphere_to)
                                    setHiaCylinderTo(item.cylinder_to)
                                    setHiaCylinderFrom(item.cylinder_from)
                                }
                            case " Hi Index 1.60":
                                {
                                    setHifSphereFrom(item.sphere_from)
                                    setHifSphereTo(item.sphere_to)
                                    setHifCylinderTo(item.cylinder_to)
                                    setHifCylinderFrom(item.cylinder_from)
                                }
                        
                            default:
                                break;
                        }
                    })
                }

        } catch (err) {
        }
    }
useEffect(()=>{getEyePrescriptions()},[])
    return (
        <div className='eye-prescription'>
            <p className='eye-prescription_heading'>Eye Prescription Setting</p>
            <div className='sections-divider'>
                <div className='eye-prescription_section' style={{ marginBottom: '10px' }}>
                    <div className='eye-prescription_section-bar'>
                        <div className='eye-prescription_section-bar-first'><p>{'Show CR39 If'}</p></div>
                        <div className='eye-prescription_section-bar-second'>
                            <div>
                                <p>Sphere (SPH)</p>
                                <div className='columns'>
                                    <div>
                                        <Select className='eye-prescription_section-bar-second_dropdown'
                                            // defaultValue="From"
                                            style={{
                                                width: 120,
                                            }}
                                            value={crsphereFrom || 'From'}
                                            onChange={(e) => {
                                                console.log('respond', e);
                                                setCrSphereFrom(e)
                                            }}
                                        >
                                            {
                                                sphere && sphere.map((obj, i) => {
                                                    return <Option value={obj}>{obj}</Option>

                                                })
                                            }
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
                                            value={crsphereTo || 'Select'}
                                            onChange={(e) => { setCrSphereTo(e) }}
                                        >
                                            {
                                                sphere && sphere.map((obj, i) => {
                                                    return <Option value={obj}>{obj}</Option>

                                                })
                                            }
                                        </Select>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p>Cylinder (CYL)</p>
                                <div className='columns'>
                                    <div>
                                        <Select className='eye-prescription_section-bar-second_dropdown'
                                            defaultValue="From"
                                            style={{
                                                width: 120,
                                            }}
                                            value={crCylinderFrom || 'From'}
                                            onChange={(e) => { setCrCylinderFrom(e) }}
                                        >
                                            {
                                                cylinder && cylinder.map((obj, i) => {
                                                    return <Option value={obj}>{obj}</Option>

                                                })
                                            }
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
                                            value={crCylinderTo || 'Select'}
                                            onChange={(e) => { setCrCylinderTo(e) }}
                                        >
                                            {
                                                cylinder && cylinder.map((obj, i) => {
                                                    return <Option value={obj}>{obj}</Option>

                                                })
                                            }
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='eye-prescription_section' style={{ marginBottom: '10px' }}>
                <div className='eye-prescription_section-bar'>
                    <div className='eye-prescription_section-bar-first'><p>{'Show Plycarbonate If'}</p></div>
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
                                        value={pbsphereFrom || 'From'}
                                        onChange={(e) => { setPbSphereFrom(e) }}
                                    >
                                        {
                                            sphere && sphere.map((obj, i) => {
                                                return <Option value={obj}>{obj}</Option>

                                            })
                                        }
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
                                        value={pbsphereTo || 'Select'}
                                        onChange={(e) => { setPbSphereTo(e) }}
                                    >
                                        {
                                            sphere && sphere.map((obj, i) => {
                                                return <Option value={obj}>{obj}</Option>

                                            })
                                        }
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p>Cylinder (CYL)</p>
                            <div className='columns'>
                                <div>
                                    <Select className='eye-prescription_section-bar-second_dropdown'
                                        defaultValue="From"
                                        style={{
                                            width: 120,
                                        }}
                                        value={pbCylinderFrom || 'From'}
                                        onChange={(e) => { setPbCylinderFrom(e) }}
                                    >
                                        {
                                            cylinder && cylinder.map((obj, i) => {
                                                return <Option value={obj}>{obj}</Option>

                                            })
                                        }
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
                                        value={pbCylinderTo || 'Select'}
                                        onChange={(e) => { setPbCylinderTo(e) }}
                                    >
                                        {
                                            cylinder && cylinder.map((obj, i) => {
                                                return <Option value={obj}>{obj}</Option>

                                            })
                                        }
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='eye-prescription_section' style={{ marginBottom: '10px' }}>
                <div className='eye-prescription_section-bar'>
                    <div className='eye-prescription_section-bar-first'><p>{'Show Trivex If'}</p></div>
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
                                        value={tvsphereFrom || 'From'}
                                        onChange={(e) => { setTvSphereFrom(e) }}
                                    >
                                        {
                                            sphere && sphere.map((obj, i) => {
                                                return <Option value={obj}>{obj}</Option>

                                            })
                                        }
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
                                        value={tvsphereTo || 'Select'}
                                        onChange={(e) => { setTvSphereTo(e) }}
                                    >
                                        {
                                            sphere && sphere.map((obj, i) => {
                                                return <Option value={obj}>{obj}</Option>

                                            })
                                        }
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p>Cylinder (CYL)</p>
                            <div className='columns'>
                                <div>
                                    <Select className='eye-prescription_section-bar-second_dropdown'
                                        defaultValue="From"
                                        style={{
                                            width: 120,
                                        }}
                                        value={tvCylinderFrom || 'From'}
                                        onChange={(e) => { setTvCylinderFrom(e) }}
                                    >
                                        {
                                            cylinder && cylinder.map((obj, i) => {
                                                return <Option value={obj}>{obj}</Option>

                                            })
                                        }
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
                                        value={tvCylinderTo || 'Select'}
                                        onChange={(e) => { setTvCylinderTo(e) }}
                                    >
                                        {
                                            cylinder && cylinder.map((obj, i) => {
                                                return <Option value={obj}>{obj}</Option>

                                            })
                                        }
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='eye-prescription_section' style={{ marginBottom: '10px' }}>
                <div className='eye-prescription_section-bar'>
                    <div className='eye-prescription_section-bar-first'><p>{'Show Hi Index 1.67If'}</p></div>
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
                                        value={hisphereFrom || 'From'}
                                        onChange={(e) => { setHiSphereFrom(e) }}
                                    >
                                        {
                                            sphere && sphere.map((obj, i) => {
                                                return <Option value={obj}>{obj}</Option>

                                            })
                                        }
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
                                        value={hisphereTo || 'Select'}
                                        onChange={(e) => { setHiSphereTo(e) }}
                                    >
                                        {
                                            sphere && sphere.map((obj, i) => {
                                                return <Option value={obj}>{obj}</Option>

                                            })
                                        }
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p>Cylinder (CYL)</p>
                            <div className='columns'>
                                <div>
                                    <Select className='eye-prescription_section-bar-second_dropdown'
                                        defaultValue="From"
                                        style={{
                                            width: 120,
                                        }}
                                        value={hiCylinderFrom || 'From'}
                                        onChange={(e) => { setHiCylinderFrom(e) }}
                                    >
                                        {
                                            cylinder && cylinder.map((obj, i) => {
                                                return <Option value={obj}>{obj}</Option>

                                            })
                                        }
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
                                        value={hiCylinderTo || 'Select'}
                                        onChange={(e) => { setHiCylinderTo(e) }}
                                    >
                                        {
                                            cylinder && cylinder.map((obj, i) => {
                                                return <Option value={obj}>{obj}</Option>

                                            })
                                        }
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='eye-prescription_section' style={{ marginBottom: '10px' }}>
                <div className='eye-prescription_section-bar'>
                    <div className='eye-prescription_section-bar-first'><p>{'Show Hi Index 1.70 & Above If'}</p></div>
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
                                        value={hiasphereFrom || 'From'}
                                        onChange={(e) => { setHiaSphereFrom(e) }}
                                    >
                                        {
                                            sphere && sphere.map((obj, i) => {
                                                return <Option value={obj}>{obj}</Option>

                                            })
                                        }
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
                                        value={hiasphereTo || 'Select'}
                                        onChange={(e) => { setHiaSphereTo(e) }}
                                    >
                                        {
                                            sphere && sphere.map((obj, i) => {
                                                return <Option value={obj}>{obj}</Option>

                                            })
                                        }
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p>Cylinder (CYL)</p>
                            <div className='columns'>
                                <div>
                                    <Select className='eye-prescription_section-bar-second_dropdown'
                                        defaultValue="From"
                                        style={{
                                            width: 120,
                                        }}
                                        value={hiaCylinderFrom || 'From'}
                                        onChange={(e) => { setHiaCylinderFrom(e) }}
                                    >
                                        {
                                            cylinder && cylinder.map((obj, i) => {
                                                return <Option value={obj}>{obj}</Option>

                                            })
                                        }
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
                                        value={hiaCylinderTo || 'Select'}
                                        onChange={(e) => { setHiaCylinderTo(e) }}
                                    >
                                        {
                                            cylinder && cylinder.map((obj, i) => {
                                                return <Option value={obj}>{obj}</Option>

                                            })
                                        }
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='eye-prescription_section' style={{ marginBottom: '10px' }}>
                <div className='eye-prescription_section-bar'>
                    <div className='eye-prescription_section-bar-first'><p>{'Show Hi Index 1.60If'}</p></div>
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
                                        value={hifsphereFrom || 'From'}
                                        onChange={(e) => { setHifSphereFrom(e) }}
                                    >
                                        {
                                            sphere && sphere.map((obj, i) => {
                                                return <Option value={obj}>{obj}</Option>

                                            })
                                        }
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
                                        value={hifsphereTo || 'Select'}
                                        onChange={(e) => { setHifSphereTo(e) }}
                                    >
                                        {
                                            sphere && sphere.map((obj, i) => {
                                                return <Option value={obj}>{obj}</Option>

                                            })
                                        }
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p>Cylinder (CYL)</p>
                            <div className='columns'>
                                <div>
                                    <Select className='eye-prescription_section-bar-second_dropdown'
                                        defaultValue="From"
                                        style={{
                                            width: 120,
                                        }}
                                        value={hifCylinderFrom || 'From'}
                                        onChange={(e) => { setHifCylinderFrom(e) }}
                                    >
                                        {
                                            cylinder && cylinder.map((obj, i) => {
                                                return <Option value={obj}>{obj}</Option>

                                            })
                                        }
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
                                        value={hifCylinderTo || 'Select'}
                                        onChange={(e) => { setHifCylinderTo(e) }}
                                    >
                                        {
                                            cylinder && cylinder.map((obj, i) => {
                                                return <Option value={obj}>{obj}</Option>

                                            })
                                        }
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={handleSubmit} className='eye-prescription_button'>Save</button>
        </div>
    )
}


const mapStateToProps = (state) => ({

    userID: state.Auth.user?.id,
});
export default connect(mapStateToProps)(EyePrescription);