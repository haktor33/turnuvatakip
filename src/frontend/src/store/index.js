import { applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk';
import { baseReducer } from './reducer/base.reducer';
import { authReducer } from './reducer/auth.reducer';
import { alertReducer } from './reducer/alert.reducer';

const middlewares = [];
//if (process.env.NODE_ENV === `development`) {
//    const loggerMiddleware = createLogger();
//    middlewares.push(loggerMiddleware);
//}

export const store = configureStore({
    reducer: {
        base: baseReducer,
        auth: authReducer,
        alert: alertReducer
    }
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(
        thunkMiddleware,
        ...middlewares
    )
);