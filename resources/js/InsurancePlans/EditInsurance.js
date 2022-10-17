import React, { useState } from 'react';
import { Switch } from 'antd';
import './style.scss'
import { Checkbox } from 'antd';
import { useHistory, useParams } from 'react-router';
// import axios from 'axios';
import Axios from "../Http"
import { connect } from "react-redux";
function EditInsurance({ userId }) {

  const [selectedRow, setSelectedRow] = React.useState([])
  const [updateInsurancePlan , setUpdateInsurancePlan] = useState([])
  const [visionID , setVisionId] = useState('')
  const history = useHistory()
  const params = useParams();

  //for editing 
  React.useEffect(() => {
    setVisionId(params?.id)

    Axios.get(process.env.MIX_REACT_APP_URL + `/api/get-client-plan-questions?visionPlanId=${params?.id}`).then((res) => {

      setSelectedRow(res.data?.data)
      console.log(res.data?.data);
    }).catch((error) => console.log({ error }))

  }, [])

  //for toggle switch

  const handleSwitch = (value, toggleSwitch) => {
    setUpdateInsurancePlan((oldState)=> {
      let oldStateCopy = [...oldState]
    let current = oldStateCopy.find(insurance => insurance.id == value.id)
    if(current) {
       oldStateCopy.find(insurance => insurance.id == value.id).optional = toggleSwitch
    } 
    else {
      oldStateCopy = [...oldStateCopy,{
        id: value?.id,
        question_id: value?.id,
        optional: toggleSwitch,
        status: value?.status,
      }]
    }
    return oldStateCopy;
    }
    )

  }

  //for checkbox switch

  const handleCheck = (value , toggleCheck) => {
    setUpdateInsurancePlan((oldState)=> {
      let oldStateCopy = [...oldState]
    let current = oldStateCopy.find(insurance => insurance.id == value.id)
    if(current) {
       oldStateCopy.find(insurance => insurance.id == value.id).status = toggleCheck.target.checked
    } 
    else {
      oldStateCopy = [...oldStateCopy,{
      id: value?.id,
      question_id: value?.id,
      optional: value?.optional,
      status: toggleCheck.target.checked,
      }]
    }
    return oldStateCopy;
    }
    )
  } 

  const handleSubmit= async() => {
    if(updateInsurancePlan.length == 0){
      return
    }
    const toggle = {
      user_id: userId,
      vision_plan_id:visionID,
      data: updateInsurancePlan
    }
    await Axios.post(process.env.MIX_REACT_APP_URL+`/api/update-user-plan-question-permission`,toggle).then(() => {
      setUpdateInsurancePlan([])
    })
  }

  const label = { inputProps: { 'aria-label': 'Switch demo' } }
  return (
    <div className="root-container">
      <div className="setting-dashboard_container">
        <div className='other-setting'>
          <p className='other-setting_sub_heading'>Edit VSP Signature</p>
          <div className='back-btn' onClick={() => { history.goBack() }}>
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
              {
                selectedRow?.length > 0 && selectedRow.map((item) => {
                  return (
                    <div className='other-setting_section-first_switches-switch-edit' key={item?.id}>
                      <Checkbox defaultChecked={item?.status} onChange={(e) => {handleCheck(item,e)}}>{item?.title}</Checkbox>

                      <Switch {...label} defaultChecked={item?.optional == 0 ? false : true} onChange={(e) => handleSwitch(item, e)} />
                    </div>
                  )
                })
              }
            </div>

          </div>
          <button
          onClick={handleSubmit}
            type="submit"
            className={"button"}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  userId: state.Auth?.user?.id,
});
export default connect(mapStateToProps)(EditInsurance);