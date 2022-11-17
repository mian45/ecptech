import React from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import "./style.scss";

const CustomLoader = ({ buttonBool }) => {
    const antIcon = (
        <LoadingOutlined
          style={{
            color: 'white',
          }}
          spin
        />
      );
    return (
        buttonBool === true ?
            <div className='loader-button'>
                <Spin indicator={antIcon} />
            </div>
            :
            <div className='loader'>
                <div className='loader-section'>
                <Spin indicator={antIcon} />
                    <p>Please Wait</p>
                </div>
            </div>

    )
}
export default CustomLoader