export type IApiStatus = 'loading' | 'failed' | 'success'

export interface IApiResult<ResultType> {
    status: string
    result: ResultType
}

export interface IApiEmptyResult {
    status: string
}

export interface IApiError {
    status: string
    message: string
}