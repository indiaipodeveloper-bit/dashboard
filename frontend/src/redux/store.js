import {configureStore} from "@reduxjs/toolkit"
import AuthsliceReducer from "./slices/Authslice"

export const store = configureStore({
    reducer:{
        auth:AuthsliceReducer
    },
})
