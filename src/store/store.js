import { createStore } from 'redux';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import userReducer from './reducer/userReducer';

// Root reducer
const rootReducer = combineReducers({
  user: userReducer,
});

// Configuration for redux-persist
const persistConfig = {
  key: 'root',  
  storage,      
  whitelist: ['user'] 
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with the persisted reducer
const store = createStore(persistedReducer);

// Create the persistor
const persistor = persistStore(store);

export { store, persistor };
