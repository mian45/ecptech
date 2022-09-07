import React, { useState } from "react";
// import btnIcon from "/Reactjs/ecptech/resources/images/btn-icon.png"
// import user from "/Reactjs/ecptech/resources/images/user-icon.png"
// import edit from "/Reactjs/ecptech/resources/images/edit.png"
// import cross from "/Reactjs/ecptech/resources/images/cross.png"

import "./style.scss"
const AddStaffMember = () => {

    const [value, setValue] = useState("")
    let [staff, setStaff] = useState([])
    const [editId,setEditId]=useState("")
    const handleChange = (e) => {
        setValue(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(editId){
            const selectedValue= [...staff].find(singleStaff=>editId===singleStaff.id);
            selectedValue.value=value;
            const editIndex= [...staff].indexOf(singleStaff=>editId===singleStaff.id);
           [...staff].splice(editIndex,1,selectedValue);
            setStaff([...staff])
            setEditId("")
            setValue("")

        }else{

            staff.push({id: Date.now().toString(36) + Math.random().toString(36),value:value})
            setValue("")
        }
     
      
    }

    const handleDelete=(id) => {
        console.log("in program", id)
        setStaff([...staff].filter((singleStaff) => {
            return singleStaff.id !== id
        }))
    }

    const handlUpdate=(value)=>{
        const selectedValue= [...staff].find(singleStaff=>value.id===singleStaff.id)
        setValue(selectedValue.value)
        setEditId(value.id)   
    }

    return (
        <div className="staff">
            <p className='staff-label'>Add Staff Members</p>
            <div className="add-staff">
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Enter staff member name" className="staff-name" value={value} onChange={handleChange} />
                    <button type="submit" className="add-btn"><img src={''} /></button>
                </form>
            </div>
            <ul>user
                {
                    staff?.map((data, index) => {

                        return (<li key={index}><div><img src={''} />{data.value}</div><div><img src={edit} onClick={() => handlUpdate(data)} /> <img src={cross} onClick={() => handleDelete(data.id)} /></div></li>)

                    })

                }

            </ul>
        </div>
    )
}

export default AddStaffMember