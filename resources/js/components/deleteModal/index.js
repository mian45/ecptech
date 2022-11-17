import React from 'react';
import Classes from "./styles.module.scss"
import Alert from "../../assets/Alert.png"
import { Col, Modal, Row } from 'antd';
function index(props) {
    const open=()=>{
        console.log("open",props.open)
    }    
    return (
        <Modal
        title=""
        open={props.open}
        closable={false}
        centered={true}
        bodyStyle={{justifyContent:"center",alignItems:"center",display:"flex"}}
        zIndex="99999"
        footer={null}
      >
            <Row justify='center'>
            <Col sm={5}>
            <img src={Alert}style={{height:'58px',width:"58px"}}/>
            </Col>
            <Col sm={24}>
            <p className={Classes['confirmation-text']}>Are You Sure Delete This File ?</p>
            <p className={Classes['confirmation-subtext']}>Do you really want to delete all the data?</p>
            <div className={`${Classes['btn-container']} ${Classes['margin-container']}`}>
            <div className={Classes['btn-wrapper']}>
            <div className={Classes["email-setting_button-section"]}>
                                <button
                                    className={`${Classes['email-setting_button-section_save-button']} ${Classes['deactive']}`}
                                onClick={()=>{props.cancel()}}
                                >
                                    Cancel
                                </button>
             </div>
             </div>
            <div className={Classes['btn-wrapper']}>
                            <div className={Classes["email-setting_button-section"]}>
                                <button
                                    className={Classes["email-setting_button-section_save-button"]}
                                    onClick={()=>{props.accept()}}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
            </div>
            </Col>
            </Row>
            </Modal>
    );
}

export default index;