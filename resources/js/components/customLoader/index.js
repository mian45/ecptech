import React from 'react'
import ReactLoading from 'react-loading';
import "./style.scss";

const CustomLoader = ({ buttonBool }) => {
    return (
        buttonBool === true ?
            <div className='loader-button'>
                <ReactLoading type='spin' color='white' height={30} width={3} />
            </div>
            :
            <div className='loader'>
                <div className='loader-section'>
                    <ReactLoading type='spin' color='white' height={20} width={20} />
                    <p>Please Wait</p>
                </div>
            </div>

    )
}
export default CustomLoader