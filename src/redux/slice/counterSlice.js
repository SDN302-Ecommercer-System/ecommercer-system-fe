import { createSlice } from "@reduxjs/toolkit";
import { COUNTER } from "../../helpers/constants/constant";

const counterSlice = createSlice({
    name: COUNTER,
    initialState: {
        value: 0,
        countClick: 0,
        history: [],
    },
    reducers: {
        increment: (state, action) => {
            state.value += +action.payload;
            state.countClick += 1;
            state.history.push({pushedValue: action.payload, type: action.type})
        },
        decrement: (state) => {
            state.value -= 1;
            state.countClick += 1;
        },
    }
})

export const {increment, decrement} = counterSlice.actions;
export default counterSlice.reducer;
