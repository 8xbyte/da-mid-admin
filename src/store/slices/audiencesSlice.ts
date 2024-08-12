import { addAudience, getAudiences, removeAudience } from '@/api/audiences'
import { IApiEmptyResult, IApiResult, IApiStatus } from '@/interfaces/api'
import { IAudience } from '@/interfaces/audiences'
import { createSlice } from '@reduxjs/toolkit'

interface IInitialState {
    get: {
        status: IApiStatus | null
        error: string | null
        result: Array<IAudience> | null
    }
    add: {
        status: IApiStatus | null
        error: string | null
        result: string | null
    }
    remove: {
        status: IApiStatus | null
        error: string | null
        result: string | null
    }
}

const initialState: IInitialState = {
    get: {
        status: null,
        error: null,
        result: null
    },
    add: {
        status: null,
        error: null,
        result: null
    },
    remove: {
        status: null,
        error: null,
        result: null
    }
}

const audiencesSlice = createSlice({
    name: 'audiences',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAudiences.pending, (state, action) => {
                state.get.status = 'loading'
            })
            .addCase(getAudiences.rejected, (state, action) => {
                state.get.status = 'failed'
                state.get.error = action.payload as string
            })
            .addCase(getAudiences.fulfilled, (state, action) => {
                state.get.status = 'success'
                state.get.result = action.payload.result
            })

        builder
            .addCase(addAudience.pending, (state, action) => {
                state.add.status = 'loading'
            })
            .addCase(addAudience.rejected, (state, action) => {
                state.add.status = 'failed'
                state.add.error = action.payload as string
            })
            .addCase(addAudience.fulfilled, (state, action) => {
                state.add.status = 'success'
                state.add.result = action.payload.status
            })

        builder
            .addCase(removeAudience.pending, (state, action) => {
                state.add.status = 'loading'
            })
            .addCase(removeAudience.rejected, (state, action) => {
                state.add.status = 'failed'
                state.add.error = action.payload as string
            })
            .addCase(removeAudience.fulfilled, (state, action) => {
                state.add.status = 'success'
                state.add.result = action.payload.status
            })
    }
})

export default audiencesSlice.reducer
