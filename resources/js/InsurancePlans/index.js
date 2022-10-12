import React from "react";
import { Switch } from "antd";
import "./style.scss";
import bellIcon from "../../images/edit.png";
import { useHistory } from "react-router";
import axios from "axios";


const InsurancePlans = () => {

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

const handleSwitch=(checked)=>{
    console.log({checked})
setIsChecked(checked)
}
    


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
                                    });
                                }}
                            />
                            <Switch {...label} defaultChecked={item?.status===0?false:true ||isChecked} onChange={handleSwitch} />
                        </div>
                    </div>
                    </div> 
                    </div>)
                            
                        }) 
                    }
                    
              
          
        </div>
    );
};
export default InsurancePlans;
