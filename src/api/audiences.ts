import axios from 'axios'

import { createAsyncThunk } from '@reduxjs/toolkit'
import { IAudience } from '@/interfaces/audiences'
import { getStringFromAxiosError } from '@/utils/axios'
import { IApiEmptyResult, IApiResult } from '@/interfaces/api'

interface IGetAudiencesData {
    limit?: number
    offset?: number
}

export const getAudiences = createAsyncThunk(
    'audiences/get',
    async (data: IGetAudiencesData, thunkApi) => {
        try {
            const response = await axios.get<IApiResult<Array<IAudience>>>(
                'https://api.damid.micmaclaynd.ru/api/audiences/get',
                {
                    params: data,
                    withCredentials: true
                }
            )
            return thunkApi.fulfillWithValue(response.data)
        } catch (error) {
            return thunkApi.rejectWithValue(getStringFromAxiosError(error))
        }
    }
)

interface ISearchAudiencesData {
    name: string
}

export const searchAudiences = createAsyncThunk(
    'audiences/search',
    async (data: ISearchAudiencesData, thunkApi) => {
        try {
            const response = await axios.get<IApiResult<Array<IAudience>>>(
                'https://api.damid.micmaclaynd.ru/api/audiences/search',
                {
                    params: data,
                    withCredentials: true
                }
            )
            return thunkApi.fulfillWithValue(response.data)
        } catch (error) {
            return thunkApi.rejectWithValue(getStringFromAxiosError(error))
        }
    }
)

interface IAddAudienceData {
    name: string
}

export const addAudience = createAsyncThunk(
    'audiences/add',
    async (data: IAddAudienceData, thunkApi) => {
        try {
            const response = await axios.post<IApiEmptyResult>(
                'https://api.damid.micmaclaynd.ru/api/audiences/add',
                data,
                {
                    withCredentials: true
                }
            )
            return thunkApi.fulfillWithValue(response.data)
        } catch (error) {
            return thunkApi.rejectWithValue(getStringFromAxiosError(error))
        }
    }
)

interface IRemoveAudienceData {
    id: number
}

export const removeAudience = createAsyncThunk(
    'audiences/remove',
    async (data: IRemoveAudienceData, thunkApi) => {
        try {
            const response = await axios.post<IApiEmptyResult>(
                'https://api.damid.micmaclaynd.ru/api/audiences/remove',
                data,
                {
                    withCredentials: true
                }
            )
            return thunkApi.fulfillWithValue(response.data)
        } catch (error) {
            return thunkApi.rejectWithValue(getStringFromAxiosError(error))
        }
    }
)
