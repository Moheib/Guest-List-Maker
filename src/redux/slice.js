import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    list: [],
    refresh: false,
}

const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.list.push(action.payload)
        },
        toggleRefresh: (state) => {
            state.refresh = !state.refresh
        },
    },
})

export const { addItem, toggleRefresh } = itemsSlice.actions
export default itemsSlice.reducer
