import {configureStore} from "@reduxjs/toolkit"
import AuthsliceReducer from "./slices/Authslice"
import SideBarReducer from "./slices/SideBarSlice"
import AllAdminsReducer from "./slices/Admins_Slice"
import NewsSliceReducer from "./slices/NewsSlice"
import BlogsSliceReducer from "./slices/BlogsSlice"
import BusinessDetailsReducer from "./slices/BusinessDetailsSlice"
import financialDetailsReducer from "./slices/FinancialDetailsSlice"
import UserSliceReducer from "./slices/UserSlice"
import MeetingSliceReducer from "./slices/MeetingsSlice"

export const store = configureStore({
    reducer:{
        auth:AuthsliceReducer,
        sidebar:SideBarReducer,
        admins:AllAdminsReducer,
        news:NewsSliceReducer,
        blogs:BlogsSliceReducer,
        businessDetails:BusinessDetailsReducer,
        financialDetails:financialDetailsReducer,
        meetings:MeetingSliceReducer,
        users:UserSliceReducer
    },
})
