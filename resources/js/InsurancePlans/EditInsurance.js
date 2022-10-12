import React from 'react';
import { Switch } from 'antd';
import './style.scss'
import { Checkbox } from 'antd';
import { useHistory,useParams } from 'react-router';
import axios from 'axios';
function EditInsurance(props) {

  const [selectedRow,setSelectedRow]=React.useState([])
  const [isChecked,setIsChecked]=React.useState(false)
  const [isCheckBox,setIsCheckBox]=React.useState(false)
  const history=useHistory()
const params=useParams();

//for editing 
React.useEffect(()=>{

  axios.get(process.env.MIX_REACT_APP_URL+`/api/get-client-plan-questions?visionPlanId=${params?.id}`).then((res)=>{
    
    setSelectedRow(res.data?.data)
  }).catch((error)=>console.log({error}))
  
  },[])



//for toggle switch

const handleSwitch=(checked)=>{
  console.log({checked})
setIsChecked(checked)
}

//for toggle checkbox

const handleCheckbox=(e)=>{
  console.log(e.target.checked)
  setIsCheckBox(e.target.checked)
}

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
            {
                selectedRow?.length>0 && selectedRow.map((item)=>{
                    return(
                      <div className='other-setting_section-first_switches-switch-edit' key={item?.id}>
                          <Checkbox >{item?.title}</Checkbox>
                            
                            <Switch {...label}  defaultChecked={item?.optional===0?false:true ||isChecked} onChange={handleSwitch}/>
                            </div>
                        )
  }) 
}
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