import React, {useState} from 'react'
import './style.scss'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ReactTags from "react-tag-autocomplete";
import {EditorState} from "draft-js";
import {Editor} from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const EmailRemainder = () => {
    const [editorState, setEditorState] = useState()
    const [subject, setSubject] = useState('')
    const [emailType, setEmailType] = useState('')
    const [tags, setTags] = useState([{id: 1, name: "English"}])
    const [suggestions, setSuggestions] = useState([
        {id: 1, name: "English"},
        {id: 2, name: "Spain"},
        {id: 3, name: "Italy"}
    ])
    const [sentDate, setSentDate] = useState('')
    const [sentTime, setSentTime] = useState('')
    const [timeZone, setTimeZone] = useState('')



    const handleDelete = (i) => {
        const tags = tags.slice(0);
        tags.splice(i, 1);
        setTags({tags});
    }

    const handleAddition = (tag) => {
        const tags = [].concat(tags, tag);
        setTags({tags});
    }
    const options = [
        'one', 'two', 'three'
    ];
    const handleSubmit = (event) => {
        event.preventDefault();


    }

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className='email-remainder'>
                <p className='email-remainder_heading'>Add New</p>

                <div>
                    <div className='email-remainder_arrow-section'>
                        <img src={'/arrow-back.svg'} alt='arrow'/>
                        <p className='email-remainder_arrow-section_back'>Back</p>
                    </div>
                    <div className='email-remainder_input-sections'>
                        <div className='email-remainder_input-sections_input-section'>
                            <p>Email Type</p>
                            <Autocomplete
                                onChange={(event, value) => setEmailType(value)}
                                disablePortal
                                id="combo-box-demo"
                                options={options}
                                sx={{width: 300}}
                                renderInput={(params) => <TextField {...params} label="Reminder"/>}
                            />
                        </div>
                        <div className='email-remainder_input-sections_input-section'>
                            <p>Send to</p>
                            <ReactTags
                                tags={tags}
                                suggestions={suggestions}
                                handleDelete={handleDelete}
                                handleAddition={handleAddition}
                                allowNew
                                minQueryLength={1}
                            />
                        </div>
                        <div className='email-remainder_input-sections_input-section'>
                            <p>Subject</p>
                            <input className='email-remainder_input-sections_input-section_input' onChange={(e) => {
                                setSubject(e.target.value)
                            }} type={'text'} required/>
                        </div>

                        <Editor
                            editorState={editorState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={onEditorStateChange}
                        />
                        <p className='email-remainder_schedule'>Schedule</p>
                        <div className='email-remainder_input-sections_input-section'>
                            <p>Send date</p>
                            <Autocomplete
                                onChange={(event, value) => setSentDate(value)}
                                disablePortal
                                id="combo-box-demo"
                                options={options}
                                sx={{width: 300}}
                                renderInput={(params) => <TextField {...params} label="2 days after invoice sent"/>}
                            />
                        </div>
                        <div className='email-remainder_input-sections_input-section'>
                            <p>Send Time</p>
                            <Autocomplete
                                disablePorta
                                onChange={(event, value) => setSentTime(value)} l
                                id="combo-box-demo"
                                options={options}
                                sx={{width: 300}}
                                renderInput={(params) => <TextField {...params} label="9:00 AM"/>}
                            />
                        </div>
                        <div className='email-remainder_input-sections_input-section'>
                            <p>Time Zone</p>
                            <Autocomplete
                                onChange={(event, value) => setTimeZone(value)}
                                disablePortal
                                id="combo-box-demo"
                                options={options}
                                sx={{width: 300}}
                                renderInput={(params) => <TextField {...params} label="Washington, DC, USA (GMT-4)"/>}
                            />
                        </div>
                        <button className='email-remainder_save-button'>Save</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default EmailRemainder
