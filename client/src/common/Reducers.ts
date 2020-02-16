import { TableHeader } from '../components/FunctionalTable';

export interface SearchState {
    isLoading: boolean,
    query: string,
    tableData: {
        header: TableHeader[],
        body: []
    },
    error: string,
    searchKey: string
}

export interface ReducerAction {
    type: string,
    payload: any
}

export const searchReducer = (state: SearchState, action: ReducerAction): SearchState => {
    const { type, payload } = action;

    switch (type) {
        case 'typing':
            return {
                ...state,
                searchKey: payload.searchKey
            };

        case 'startSearch':
            return (payload.query === '') ? state : {
                ...state,
                tableData: {
                    ...state.tableData,
                    body: []
                },
                query: payload.query,
                isLoading: true
            };

        case 'completeSearch':
            return {
                ...state,
                query: '',
                tableData: {
                    ...state.tableData,
                    body: payload.body
                },
                isLoading: false
            };

        case 'error':
            return {
                ...state,
                isLoading: false,
                error: payload.error
            };

        default:
            return state;
    }
}