import { login } from '@/api/auth'
import { IApiEmptyResult, IApiError, IApiStatus } from '@/interfaces/api'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IInitialState {
    isAuth: boolean
    login: {
        status: IApiStatus | null
        error: string | null
        result: IApiEmptyResult | null
    }
}

const initialState: IInitialState = {
    isAuth: localStorage.getItem('isAuth') === 'true' ? true : false,
    login: {
        status: null,
        error: null,
        result: null
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state, action) => {
                state.login.status = 'loading'
            })
            .addCase(login.rejected, (state, action) => {
                state.login.status = 'failed'
                state.login.error = action.payload as string
            })
            .addCase(login.fulfilled, (state, action) => {
                localStorage.setItem('isAuth', 'true')
                state.isAuth = true
                state.login.status = 'success'
                state.login.result = action.payload as IApiEmptyResult
            })
    }
})

export default authSlice.reducer
