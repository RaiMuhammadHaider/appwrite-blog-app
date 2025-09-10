// import {configureStore} from '@reduxjs/toolkit';
// import authSlice from './authSlice.js';
//  const store = configureStore({
//     reducer: {
//         auth: authSlice.reducer,
//     },
// })
// export default store;

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default store;
