import {createSlice} from "@reduxjs/toolkit";

const responsiveSlice = createSlice({
   name:"responsive",
   initialState:{
      responsive:false,
   },
   reducers:{
      setResponsive:(state,action)=>{
         state.responsive = action.payload;
      }
   }
});

export const {setResponsive} = responsiveSlice.actions;
export default responsiveSlice.reducer;