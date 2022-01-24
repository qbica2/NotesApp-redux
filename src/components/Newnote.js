import React,{useState,useEffect} from 'react';

import { Checkbox } from '@mui/material'
import { red } from "@mui/material/colors"
import { yellow } from "@mui/material/colors"
import { orange } from "@mui/material/colors"
import { blue } from "@mui/material/colors"
import { green } from "@mui/material/colors"


import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatBoldIcon from '@mui/icons-material/FormatBold';

import { useDispatch,useSelector } from 'react-redux';
import {changeColor} from "../redux/colors/ColorsSlice"
import {addNote,saveNote,deleteAllNotes} from '../redux/notes/NotesSlice'
import { nanoid } from '@reduxjs/toolkit';





function Newnote() {

  const [noteContent,setNoteContent]=useState("")
  const [bold,setBold] = useState(false)
  const [italic,setItalic] = useState(false)

  const color = useSelector(state=>state.color.value)
  const notes = useSelector(state=>state.notes.items)

  const dispatch=useDispatch()

  const handleChangeColor= (id) => {
    dispatch(changeColor(id))

  }

  useEffect(() => {
    notes.map((item)=>{
      if(item.selected===true){
        setNoteContent(item.content);
        dispatch(changeColor(item.color))
      }
    })
  },[notes])

  const handleAddNewNote = (id,content,renk) => {
    if(noteContent===""){
      alert("Please enter notes");
      return false;
    }
    if(color==="white"){
      alert("Please select color");
      return false ;
    }
    dispatch(addNote({id:nanoid(),content:noteContent,color: color,selected:false}))

    setNoteContent("")

    dispatch(changeColor("white"))

  }

  const handleSaveNote = (id,content,renk) => {
    if(noteContent===""){
      alert("nothing to save")
      return false;
    }
    notes.map((item) => {
      if(item.selected===true){
        dispatch(saveNote({id:item.id,content: noteContent, color: color ,selected:false}))
        setNoteContent("")

        dispatch(changeColor("white"))
      }
    })
  }

  const handleDeleteAllNotes = () =>{
    if(notes.length === 0){
      alert("there are no notes")
      return false
    }
    if(window.confirm("Are you sure?")){
      dispatch(deleteAllNotes())
    }
    
  }

  return (
    <div className="Newnote">
      <div className="header">
        <span>NotesApp</span>
      </div>
      <div className="note-container">
        
        <textarea 
        className={`note ${color} ${bold?"bold":""} ${italic?"italic":""}`} 
        placeholder="Enter your note here" 
        onChange={(e)=>setNoteContent(e.target.value)}
        value={noteContent}
        />
        
      </div>
      <div className="color">
        <div className="buttons-container">
           <div>Choose Color</div>
           <div>
          <Checkbox 
            id="red"
            checked={color==="red" ? true : false}
            onClick={(e) =>handleChangeColor(e.target.id)} 
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<CheckCircleIcon />} 
            sx={ { '& .MuiSvgIcon-root': { fontSize: 40, color: red[800]} }} 
            
            />

          <Checkbox 
            id="yellow"
            checked={color==="yellow" ? true : false}
            onClick={(e) =>handleChangeColor(e.target.id)}
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<CheckCircleIcon />} 
            sx={{ '& .MuiSvgIcon-root': { fontSize: 40, color: yellow[800] } }} 
            />
          <Checkbox 
            id="orange"
            checked={color==="orange" ? true : false}
            onClick={(e) =>handleChangeColor(e.target.id)}
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<CheckCircleIcon />} 
            sx={{ '& .MuiSvgIcon-root': { fontSize: 40, color: orange[800] } }} 
            />
          <Checkbox 
            id="blue"
            checked={color==="blue" ? true : false}
            onClick={(e) =>handleChangeColor(e.target.id)}
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<CheckCircleIcon />} 
            sx={{ '& .MuiSvgIcon-root': { fontSize: 40, color: blue[800] } }} 
            />
          <Checkbox 
            id="green"
            checked={color==="green" ? true : false}
            onClick={(e) =>handleChangeColor(e.target.id)}
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<CheckCircleIcon />} 
            sx={{ '& .MuiSvgIcon-root': { fontSize: 40, color: green[800] } }} 
            />
            </div>
        </div>
        <div className="font-type">
          <div>Choose font type</div>
          <div>
          <FormatBoldIcon sx={{ fontSize: 40 }} onClick={()=>setBold( bold ? false : true )}/>
          <FormatItalicIcon sx={{ fontSize: 40 }} onClick={()=>setItalic( italic ? false : true )}/>
          </div>

        </div>
      </div>
      <div className="Newnote-footer">
        <button onClick={handleAddNewNote}>
          Add note
        </button>
        <button onClick={handleSaveNote}>Save note</button>
        <button onClick={handleDeleteAllNotes}>Delete all notes</button>
      </div>
    </div>
  );
}

export default Newnote;
