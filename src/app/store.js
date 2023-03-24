import { configureStore } from '@reduxjs/toolkit'
import storage from "redux-persist/lib/storage";
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from "redux-persist";
import thunk from 'redux-thunk';

//  Reducers
import wishlistSlice from '../features/wishlist/wishlistSlice';

const persistConfig = {
  key: "wishlist",
  storage,
  whitelist: ["wishlist"]
}

const rootReducer = combineReducers({
  wishlist: wishlistSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default configureStore({
  reducer: persistedReducer,
  middleware: [thunk]

})