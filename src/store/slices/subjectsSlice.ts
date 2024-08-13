import {
    addSubject,
    getSubjects,
    removeSubject,
    searchSubjects
} from '@/api/subjects'
import { IApiStatus } from '@/interfaces/api'
import { ISubject } from '@/interfaces/subjects'
import { createSlice } from '@reduxjs/toolkit'

interface IInitialState {
    get: {
        status: IApiStatus | null
        error: string | null
        result: Array<ISubject> | null
    }
    search: {
        status: IApiStatus | null
        error: string | null
        result: Array<ISubject> | null
    }
    add: {
        status: IApiStatus | null
        error: string | null
        result: ISubject | null
    }
    remove: {
        status: IApiStatus | null
        error: string | null
        result: ISubject | null
    }
}

const initialState: IInitialState = {
    get: {
        status: null,
        error: null,
        result: null
    },
    search: {
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
    name: 'subjects',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSubjects.pending, (state, action) => {
                state.get.status = 'loading'
            })
            .addCase(getSubjects.rejected, (state, action) => {
                state.get.status = 'failed'
                state.get.error = action.payload as string
            })
            .addCase(getSubjects.fulfilled, (state, action) => {
                state.get.status = 'success'
                state.get.result = action.payload.result
            })

        builder
            .addCase(searchSubjects.pending, (state, action) => {
                state.search.status = 'loading'
            })
            .addCase(searchSubjects.rejected, (state, action) => {
                state.search.status = 'failed'
                state.search.error = action.payload as string
            })
            .addCase(searchSubjects.fulfilled, (state, action) => {
                state.search.status = 'success'
                state.search.result = action.payload.result
            })

        builder
            .addCase(addSubject.pending, (state, action) => {
                state.add.status = 'loading'
            })
            .addCase(addSubject.rejected, (state, action) => {
                state.add.status = 'failed'
                state.add.error = action.payload as string
            })
            .addCase(addSubject.fulfilled, (state, action) => {
                state.add.status = 'success'
                state.add.result = action.payload.result
            })

        builder
            .addCase(removeSubject.pending, (state, action) => {
                state.remove.status = 'loading'
            })
            .addCase(removeSubject.rejected, (state, action) => {
                state.remove.status = 'failed'
                state.remove.error = action.payload as string
            })
            .addCase(removeSubject.fulfilled, (state, action) => {
                state.remove.status = 'success'
                state.remove.result = action.payload.result
            })
    }
})

export default audiencesSlice.reducer
