import React,{useEffect, useState} from 'react';

import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditSharpIcon from '@mui/icons-material/EditSharp';

import { useDispatch,useSelector } from 'react-redux';

import {removeNote,selectNote,filterNotes} from '../redux/notes/NotesSlice'



function Notelist() {

  const notes = useSelector(state=>state.notes.items)
  const filteredNotes= useSelector(state=>state.notes.filtered)

  const dispatch=useDispatch()

  const [searchInput,setSearchInput]=useState("")

  useEffect(()=>{
   const filtered= notes.filter((item) =>item.content.toLowerCase().includes(searchInput.toLowerCase()))
    dispatch(filterNotes(filtered))
  },[searchInput,notes])


  return (
    <div className="Notelist">
      <div className="search-container">
          <input
           className="search"
            type="search"
            value={searchInput} 
            placeholder="Search your notes..."
            onChange={(e)=>setSearchInput(e.target.value)}
            />
      </div>
      <div className="list-container">
        {
          filteredNotes.map((item)=>(
            <div key={item.id} className={`listednote ${item.color}`}>
            <textarea className={`listednotetext ${item.color}`}  value={item.content} disabled /> 
            <div className="icons">
            <EditSharpIcon 
            className="edit-icon"
            onClick={()=>dispatch(selectNote(item.id))}
            />
            <DeleteForeverOutlinedIcon  
            className="remove-ıcon" 
            onClick={()=>dispatch(removeNote(item.id))}/>
            
            </div>
            </div>

          ))
        }
      </div>
    </div>
  );
}

export default Notelist;
