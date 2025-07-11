import {configureStore, combineReducers} from  "@reduxjs/toolkit"

import {

 
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'
import authSlice from "../feature/auth/authSlice"
import adminSlice from "../feature/adminAuth/adminSlice"
//import docSlice from "../feature/docAuth/docSlice"




const persistConfig = {
    key:'root',
    version:1,
    storage,
    whitelist:['auth']
}


  const rootReducer = combineReducers({
    auth:authSlice,
    admin:adminSlice,
   // doc:docSlice

  });
 
 
  const persistedReducer = persistReducer(
    persistConfig,
    rootReducer, 
   
  )

  const store = configureStore({
    reducer:persistedReducer,
    

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
        devTools: import.meta.env.VITE_NODE_ENV !== "production",
  })

  export default store


