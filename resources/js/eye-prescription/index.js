import React, { useState } from 'react'
import { use } from 'ree-validate';
import EyePrescriptionSection from '../eye-prescription-section';
import './style.scss'


const EyePrescription = () => {

    const [crsphereFrom, setCrSphereFrom] = useState('')
    const [crsphereTo, setCrSphereTo] = useState('')

    const [pbsphereFrom, setPbSphereFrom] = useState('')
    const [pbsphereTo, setPbSphereTo] = useState('')

    const [tvsphereFrom, setTvSphereFrom] = useState('')
    const [tvsphereTo, setTvSphereTo] = useState('')

    const [hisphereFrom, setHiSphereFrom] = useState('')
    const [hisphereTo, setHiSphereTo] = useState('')

    const [hiasphereFrom, setHiaSphereFrom] = useState('')
    const [hiasphereTo, setHiaSphereTo] = useState('')

    const [hifsphereFrom, setHifSphereFrom] = useState('')
    const [hifsphereTo, setHifSphereTo] = useState('')


    return (
        <div className='eye-prescription'>
            <p className='eye-prescription_heading'>Eye Prescription Setting</p>
            <div className='sections-divider'>
                <EyePrescriptionSection name={'Show CR39 If'} setCrSphereFrom={setCrSphereFrom} setCrSphereTo={setCrSphereTo} />
                <EyePrescriptionSection name={'Show Plycarbonate If'} setPbSphereFrom={setPbSphereFrom} setPbSphereTo={setPbSphereTo} />
                <EyePrescriptionSection name={'Show Trivex If'} setTvSphereFrom={setTvSphereFrom} setTvSphereTo={setTvSphereTo} />
                <EyePrescriptionSection name={'Show Hi Index 1.67If'} setHiSphereFrom={setHiSphereFrom} setHiSphereTo={setHiSphereTo} />
                <EyePrescriptionSection name={'Show Hi Index 1.70 & Above If'} setHiaSphereFrom={setHiaSphereFrom} setHiaSphereTo={setHiaSphereTo} />
                <EyePrescriptionSection name={'Show Hi Index 1.60If'} setHifSphereFrom={setHifSphereFrom} setHifSphereTo={setHifSphereTo} />
            </div>
            <button className='eye-prescription_button'>Save</button>
        </div>
    )
}
export default EyePrescription;