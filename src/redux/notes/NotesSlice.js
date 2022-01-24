import { createSlice } from "@reduxjs/toolkit"

export const notesSlice = createSlice({
    name:"notes",
    initialState: {
        items: [],
        filtered:[]
    },
    reducers:{
        addNote: (state,action) => {
            state.items.forEach(item =>item.selected=false)
            state.items.push(action.payload)
        },
        removeNote: (state,action) => {
            const id = action.payload
           const filtered= state.items.filter((item) => item.id !== id)
           state.items=filtered
        },
        selectNote: (state,action) => {
            const id = action.payload
            state.items.map((item)=>item.selected=false)
            const selected = state.items.filter((item) => item.id === id)
            selected.map((item) =>item.selected=true)
        },
        saveNote: (state,action) => {

            const {id}= action.payload
            const index= state.items.findIndex((item) => item.id===id)
            state.items[index]=action.payload
        },
        deleteAllNotes: (state) => {
            state.items=[]
        },
        filterNotes: (state,action) => {
            state.filtered=action.payload
        }
    }
})

export const {addNote,addColor,editNote,removeNote,selectNote,saveNote,deleteAllNotes,filterNotes} = notesSlice.actions
export default notesSlice.reducer;