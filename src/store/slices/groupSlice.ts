import { addGroup, getGroups, removeGroup, searchGroups } from '@/api/group'
import { IApiStatus } from '@/interfaces/api'
import { IGroup } from '@/interfaces/group'
import { createSlice } from '@reduxjs/toolkit'

interface IInitialState {
    get: {
        status: IApiStatus | null
        error: string | null
        result: Array<IGroup> | null
    }
    search: {
        status: IApiStatus | null
        error: string | null
        result: Array<IGroup> | null
    }
    add: {
        status: IApiStatus | null
        error: string | null
        result: IGroup | null
    }
    remove: {
        status: IApiStatus | null
        error: string | null
        result: IGroup | null
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
    name: 'groups',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getGroups.pending, (state, action) => {
                state.get.status = 'loading'
            })
            .addCase(getGroups.rejected, (state, action) => {
                state.get.status = 'failed'
                state.get.error = action.payload as string
            })
            .addCase(getGroups.fulfilled, (state, action) => {
                state.get.status = 'success'
                state.get.result = action.payload.result
            })

        builder
            .addCase(searchGroups.pending, (state, action) => {
                state.search.status = 'loading'
            })
            .addCase(searchGroups.rejected, (state, action) => {
                state.search.status = 'failed'
                state.search.error = action.payload as string
            })
            .addCase(searchGroups.fulfilled, (state, action) => {
                state.search.status = 'success'
                state.search.result = action.payload.result
            })

        builder
            .addCase(addGroup.pending, (state, action) => {
                state.add.status = 'loading'
            })
            .addCase(addGroup.rejected, (state, action) => {
                state.add.status = 'failed'
                state.add.error = action.payload as string
            })
            .addCase(addGroup.fulfilled, (state, action) => {
                state.add.status = 'success'
                state.add.result = action.payload.result
            })

        builder
            .addCase(removeGroup.pending, (state, action) => {
                state.remove.status = 'loading'
            })
            .addCase(removeGroup.rejected, (state, action) => {
                state.remove.status = 'failed'
                state.remove.error = action.payload as string
            })
            .addCase(removeGroup.fulfilled, (state, action) => {
                state.remove.status = 'success'
                state.remove.result = action.payload.result
            })
    }
})

export default audiencesSlice.reducer
