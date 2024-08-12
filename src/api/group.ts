import axios from 'axios'

import { IApiResult } from '@/interfaces/api'
import { IGroup } from '@/interfaces/group'
import { getStringFromAxiosError } from '@/utils/axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

interface IGetGroupsData {
    limit?: number
    offset?: number
}

export const getGroups = createAsyncThunk(
    'groups/get',
    async (data: IGetGroupsData, thunkApi) => {
        try {
            const response = await axios.get<IApiResult<Array<IGroup>>>(
                'https://api.damid.micmaclaynd.ru/api/groups/get',
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

interface ISearchGroupsData {
    name: string
    limit?: number
    offset?: number
}

export const searchGroups = createAsyncThunk(
    'groups/search',
    async (data: ISearchGroupsData, thunkApi) => {
        try {
            const response = await axios.get<IApiResult<Array<IGroup>>>(
                'https://api.damid.micmaclaynd.ru/api/groups/search',
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

interface IAddGroupData {
    name: string
}

export const addGroup = createAsyncThunk(
    'groups/add',
    async (data: IAddGroupData, thunkApi) => {
        try {
            const response = await axios.post<IApiResult<IGroup>>(
                'https://api.damid.micmaclaynd.ru/api/groups/add',
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

interface IRemoveGroupData {
    id: number
}

export const removeGroup = createAsyncThunk(
    'groups/remove',
    async (data: IRemoveGroupData, thunkApi) => {
        try {
            const response = await axios.post<IApiResult<IGroup>>(
                'https://api.damid.micmaclaynd.ru/api/groups/remove',
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
