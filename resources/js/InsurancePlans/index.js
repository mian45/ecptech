import React from "react";
import { Switch } from "antd";
import "./style.scss";
import bellIcon from "../../images/edit.png";
import { useHistory } from "react-router";
import axios from "axios";
import { connect } from "react-redux";


const InsurancePlans = ({userId}) => {

const [getData,setGetData]=React.useState([])
const [isChecked,setIsChecked]=React.useState(false)


    const label = { inputProps: { "aria-label": "Switch demo" } };
    const history = useHistory();

// to fetch data from api

React.useEffect(()=>{

axios.get(process.env.MIX_REACT_APP_URL+"/api/get-client-vision-plans").then((res)=>{
    setGetData(res.data?.data)

}).catch((error)=>console.log({error}))

},[])
    

//for toggle switch

const handleSwitch=async(value, toggleSwitch)=>{
    const toggleState = {
        userId: userId,
        visionPlanId: value?.id,
        status: toggleSwitch
    }
    const response  = await axios.post(process.env.MIX_REACT_APP_URL+"/api/update-user-vision-plan-permission", toggleState)
    console.log(response,'response');
}
    
console.log('getData',getData);

    return (
        <div className="other-setting">
            <p className="other-setting_heading">Insurance Plans</p>
           
                {/* component to be used in map */}
                    {
                        getData?.length >0 && getData?.map((item)=>{

                            return(
                                <div className="other-setting_section">
                                <div className="other-setting_section-first">
                                <div className="other-setting_section-first_switches-switch"
                                key={item?.id}
                                >
                        <p>{item?.title}</p>
                        <div>
                            <img
                                style={{
                                    width: "16px",
                                    height: "18px",
                                    marginRight: "16.6px",
                                    cursor: "pointer",
                                }}
                                src={bellIcon}
                                onClick={() => {
                                    history.push({
                                        pathname: `/edit-insurance/${item?.id}`,
                                        state : item?.title,
                                    });
                                }}
                            />
                            <Switch {...label} defaultChecked={item?.status===0?false:true ||isChecked} onChange={(toggleSwitch) => handleSwitch(item, toggleSwitch)} />
                        </div>
                    </div>
                    </div> 
                    </div>)
                            
                        }) 
                    }
                    
              
          
        </div>
    );
};
const mapStateToProps = (state) => ({
    userId: state.Auth?.user?.id,
});
export default connect(mapStateToProps) (InsurancePlans);
