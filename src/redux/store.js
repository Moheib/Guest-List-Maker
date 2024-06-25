import { configureStore } from '@reduxjs/toolkit'
import itemsReducer from './slice'

export const store = configureStore({
    reducer: {
        items: itemsReducer,
    },
})