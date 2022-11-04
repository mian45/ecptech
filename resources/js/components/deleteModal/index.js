import React from 'react';
import Classes from "./styles.module.scss"
import Alert from "../../assets/Alert.png"
import CustomCheckbox from '../customCheckbox';
function index(props) {
    return (
        <div className={Classes['container']} style={{height:window.innerHeight,width:window.innerWidth}}>
            <div className={Classes['popUp']}>
            <img src={Alert}style={{height:'58px',width:"58px"}}/>
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
            <div className={Classes['btn-container']}>
            <CustomCheckbox
                                            containerClass={
                                                Classes["checkbox-container"]
                                            }
                                            label={''}
                                            defaultChecked={
                                                // item?.status || false
                                            true}
                                            onValueChange={(value) =>
                                                // handleCheck(item, value)
                                                console.log(value)
                                            }
                                        />
                <p className={Classes['check-text']}>
                don't show this again
                </p>

            </div>
            </div>
        </div>
    );
}

export default index;