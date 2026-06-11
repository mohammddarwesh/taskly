import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "./root-reducer"



export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
        devTools: process.env.NODE_ENV !== 'production'
    })
}



export type appStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<appStore['getState']>
export type appDispatch = appStore['dispatch']