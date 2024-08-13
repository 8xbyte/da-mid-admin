import axios from 'axios'

import { IApiResult } from '@/interfaces/api'
import { ISubject } from '@/interfaces/subjects'
import { getStringFromAxiosError } from '@/utils/axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

interface IGetSubjectsData {
    limit?: number
    offset?: number
}

export const getSubjects = createAsyncThunk(
    'subjects/get',
    async (data: IGetSubjectsData, thunkApi) => {
        try {
            const response = await axios.get<IApiResult<Array<ISubject>>>(
                'https://api.damid.micmaclaynd.ru/api/subjects/get',
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

interface ISearchSubjectsData {
    name: string
    limit?: number
    offset?: number
}

export const searchSubjects = createAsyncThunk(
    'subjects/search',
    async (data: ISearchSubjectsData, thunkApi) => {
        try {
            const response = await axios.get<IApiResult<Array<ISubject>>>(
                'https://api.damid.micmaclaynd.ru/api/subjects/search',
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

interface IAddSubjectData {
    name: string
}

export const addSubject = createAsyncThunk(
    'subjects/add',
    async (data: IAddSubjectData, thunkApi) => {
        try {
            const response = await axios.post<IApiResult<ISubject>>(
                'https://api.damid.micmaclaynd.ru/api/subjects/add',
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

interface IRemoveSubjectData {
    id: number
}

export const removeSubject = createAsyncThunk(
    'subjects/remove',
    async (data: IRemoveSubjectData, thunkApi) => {
        try {
            const response = await axios.post<IApiResult<ISubject>>(
                'https://api.damid.micmaclaynd.ru/api/subjects/remove',
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
