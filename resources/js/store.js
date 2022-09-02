import { configureStore } from '@reduxjs/toolkit'
import activeReducer from './activeState'

export default configureStore({
    reducer: {
        active : activeReducer
    },
})
