import React from "react"
import "./profil.scss"
import AddStaffMember from "../addStaffmember/AddStaff"
import HotSellingProduct from "../hotselling/HotsellingProduct"
import PhotoUpload from "./PhotoUpload.js"
const Profile=()=>{
    return(
        <div className='profile'>
            <div className='busniss-info'>
                <p className='busniess-label'>Business Information</p>
                <PhotoUpload/>
                <div>
                    <label>
                        Business Name
                    </label>
                    <br/>
                    <input type="text" placeholder="Enter business name" className="business-name"/>
                </div>

            </div>
            <div className='busniss-info'>
            <AddStaffMember/>
            </div>
            <div className='busniss-info'>
            <HotSellingProduct/>
            </div>

           
        </div>
    )
}

export default Profile
