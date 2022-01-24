import { configureStore } from "@reduxjs/toolkit";

import notesSlice from './notes/NotesSlice'
import colorsSlice from './colors/ColorsSlice'

export const store = configureStore({
    reducer:{
        notes: notesSlice,
        color: colorsSlice,
    }
})