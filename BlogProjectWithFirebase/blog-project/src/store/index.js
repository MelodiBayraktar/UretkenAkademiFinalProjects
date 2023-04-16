import {configureStore} from "@reduxjs/toolkit";
import auth from "./auth"
import blogs from "./blogs";
const store = configureStore({
    reducer:{
        auth,
        blogs
    }
})
export default store;