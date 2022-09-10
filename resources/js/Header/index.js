import React,{useState}from 'react'
import './style.scss'
import Profile from "../components/profile/Profile.js"
const Header = () => {
    const [profile, setProfile]=useState(true)
    const showProfile=()=>{
        setProfile(!profile)
    }
    return(
        <div className='header'>
            {
                profile===false? null:<Profile/>
            }
            <div className='logo'>
                <img src='logo.png' alt='logo'/>
            </div>

            <div className='right-side'>
                <div className='bell-icon'>
                    <img src='notification.svg' alt='notification'/>
                </div>
                <div className='login' onClick={showProfile}>
                    <img src='Profile.svg' alt='Profile'/>
                </div>
            </div>
        </div>
    )
}
export default Header
