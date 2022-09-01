import { createSlice } from '@reduxjs/toolkit'

export const activeSlice = createSlice({
    name: 'active',
    initialState: {
        value: 1,
    },
    reducers: {
        homeState: (state) => {
            state.value = 1
        },
        invoiceState: (state) => {
            state.value = 2
        },
        paymentState: (state) => {
            state.value = 3
        },
        settingState: (state) => {
            state.value = 4
        },
    },
})

// Action creators are generated for each case reducer function
export const { homeState, invoiceState, paymentState, settingState } = activeSlice.actions

export default activeSlice.reducer
