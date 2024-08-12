import axios from 'axios'

import { IApiEmptyResult } from '@/interfaces/api'
import { getStringFromAxiosError } from '@/utils/axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { setIsAuth } from '@/store/slices/authSlice'

interface ILoginData {
    login: string
    password: string
}

export const login = createAsyncThunk(
    'auth/login',
    async (data: ILoginData, thunkApi) => {
        try {
            const response = await axios.post<IApiEmptyResult>(
                'https://api.damid.micmaclaynd.ru/api/auth/login',
                data,
                {
                    withCredentials: true
                }
            )
            thunkApi.dispatch(setIsAuth(true))
            return thunkApi.fulfillWithValue(response.data)
        } catch (error) {
            thunkApi.dispatch(setIsAuth(false))
            return thunkApi.rejectWithValue(getStringFromAxiosError(error))
        }
    }
)
