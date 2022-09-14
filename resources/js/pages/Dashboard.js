import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { addDays } from 'date-fns';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faCaretDown } from "@fortawesome/free-solid-svg-icons";
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween'
import axios from "axios"
import DashboardPage from "../dashboard-page"
const Dashboard =(props)=> {
  const [data,setData] =useState([]);
  const [date,setDate]=useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);
  const [showDatePicker,setShowDatePicker]=useState(false);
  const [startDate,setStartDate]=useState(new Date());
  const [endDate,setEndDate]=useState(new Date());
  const [label,setLabel]=useState("");
  const [invoicesSummary,setInvoicesSummary]=useState([])
  const [invoicesStats,setInvoicesStats]=useState([])
  useEffect(()=>{
    console.log("the date is here",date)
    const date1=dayjs(dayjs(startDate).format("YYYY-MM-DD"))
    const date2=dayjs(dayjs(endDate).format("YYYY-MM-DD"))
    dayjs.extend(isBetween)
    console.log("the difference is here",date2.diff(date1, 'day', true))
    if(date2.diff(date1, 'day', true)==0){
      //today/yesterday
      console.log("the first condition is true")
      if(dayjs(date1).isSame(dayjs(new Date()).format("YYYY-MM-DD"))){
        setLabel("Today")
      }else {
        setLabel("Yesterday")
      }
    }else if(date2.diff(date1, 'day', true)==6){
      //this week/ last week
      
      if(dayjs(dayjs(new Date()).format("YYYY-MM-DD")).isBetween(date1,date2)){
        setLabel("This Week")
      }else {
        setLabel("Last Week")
      }
    }else if(date2.diff(date1, 'day', true)==29) {
   
        setLabel("This Month")
     
    }else if(date2.diff(date1, 'day', true)==30) {
   
      setLabel("Last Month")
     
    }else {
      // custom
      setLabel("Custom")
    }
    getInvoicesSummary(date1,date2)
    getInvoicesStats(date1,date2)
  },[date,startDate,endDate])

  const getInvoicesSummary=(date1,date2)=>{
    var data = new FormData();
data.append('start_date', date1);
data.append('end_date', date2);

var config = {
  method: 'post',
  url: `${process.env.MIX_REACT_APP_URL}/api/invoice-summmary`,
  headers: { 
    'Authorization': `Bearer ${localStorage.getItem("access_token")}`, 
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data.data));
  setInvoicesSummary(response.data.data)
})
.catch(function (error) {
  console.log(error);
});

  }
  const getInvoicesStats=(date1,date2)=>{
    var data = new FormData();
    data.append('start_date', date1);
    data.append('end_date', date2);
    
    var config = {
      method: 'post',
      url: `${process.env.MIX_REACT_APP_URL}/api/invoice-stats`,
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem("access_token")}`, 
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      setInvoicesStats(response.data.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }
    return (
      <div className="container">
        <div onClickCapture={()=>{setShowDatePicker(!showDatePicker)}} 
        style={{backgroundColor:"#fff",width:"107px",height:"27px",cursor:"pointer",display:"flex",flexDirection:"row",marginTop: "10px",justifyContent:"space-evenly",}}>
          <div style={{fontSize:17}}>{label}</div>
          <FontAwesomeIcon icon={faCaretDown} size={17} color="#ccc" style={{alignSelf:"center"}} />
        </div>
        {showDatePicker?
        <div style={{ boxShadow: "5px 10px 11px 5px #ccc",width:"882px"}}>
          <DateRangePicker
          onChange={item => {setDate([item.selection]);setShowDatePicker(false);setStartDate(item.selection.startDate);setEndDate(item.selection.endDate)}}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={2}
          ranges={date}
          direction="horizontal"
        />
        </div>
        :null}
        <DashboardPage />
     </div>
    );
  }


const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
});

export default connect(mapStateToProps)(Dashboard);
