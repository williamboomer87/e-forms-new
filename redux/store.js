// store/index.js
import { configureStore } from '@reduxjs/toolkit';

// Define the initial state and reducer logic
const initialState = {
  updateAnswer: false,
  updateAnswerId: null,
  answer: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'updateAnswerFalse':
        return { ...state, updateAnswer: false };
    case 'updateAnswerTrue':
        return { ...state, updateAnswer: true };
    case 'updateUpdateAnswerId':
        return { ...state, updateAnswerId: action.payload };  
    case 'updateAnswer':
        return { ...state, answer: action.payload };  
    default:
        return state;
  }
};

// Create the Redux store using configureStore
const store = configureStore({
  reducer,
});

export default store;
