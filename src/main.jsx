
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import AppContextProvider from './components/context/AppContext.jsx'
import persistStore from 'redux-persist/es/persistStore'
import { PersistGate } from 'redux-persist/integration/react'
import store from './redux/store.js'
import {Provider} from 'react-redux'


let persistor = persistStore(store)

createRoot(document.getElementById('root')).render(

  <Provider  store={store}  >  
  <BrowserRouter>
  <AppContextProvider  >
    <PersistGate loading={null} persistor={persistor} >
       <App />
       </PersistGate>
  </AppContextProvider>
    
  </BrowserRouter>
  </Provider>
)
