import { useDispatch, useSelector, useStore } from "react-redux"
import { appDispatch, appStore, RootState } from "."



export const useAppDispatch = useDispatch.withTypes<appDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<appStore>()