import audiencesSlice from './slices/audiencesSlice'
import authSlice from './slices/authSlice'
import groupSlice from './slices/groupsSlice'
import subjectsSlice from './slices/subjectsSlice'

import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const store = configureStore({
    reducer: {
        auth: authSlice,
        audiences: audiencesSlice,
        groups: groupSlice,
        subjects: subjectsSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
