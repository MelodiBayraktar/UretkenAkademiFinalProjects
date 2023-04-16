import {createSlice} from "@reduxjs/toolkit";

const initialState = {
   blogs: []
}
const blogs = createSlice({
    name:"blogs",
    initialState,
    reducers:{
        setBlogs:(state,action) => {
            state.blogs = action.payload
        },
        appendBlog:(state, action)  => {
            state.blogs = [...state.blogs, action.payload]
        }
    }
})
export const {setBlogs, appendBlog} = blogs.actions;
export default blogs.reducer;