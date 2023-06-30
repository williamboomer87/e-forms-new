import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import thunk from 'redux-thunk';
import { setLocalStorage } from '../hooks/setLocalStorage'

const initialState = {
    inputValue: '',
    result: null,
    loading: false,
    error: null,
};

const inputSlice = createSlice({
    name: 'input',
    initialState,
    reducers: {
        setInputValue: (state, action) => {
            state.inputValue = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchResult.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchResult.fulfilled, (state, action) => {
                state.loading = false;
                state.result = action.payload;
            })
            .addCase(fetchResult.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

const fetchResult = createAsyncThunk('input/fetchResult', async (inputValue) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'api/generate/input', {
            method: 'POST',
            body: JSON.stringify({
                "prompt": inputValue
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        
        return data;
    } catch (error) {
        throw new Error('Failed to fetch result');
    }
});

const { setInputValue } = inputSlice.actions;

const store = configureStore({
    reducer: {
        input: inputSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export { setInputValue, fetchResult };

export default store;
