import { configureStore } from "@reduxjs/toolkit"; // install package @reduxjs/toolkit
import rootReducer from './reducers/rootReducer';

const store = configureStore({
    reducer: {root: rootReducer },
});

export default store;
