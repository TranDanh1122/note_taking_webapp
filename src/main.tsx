import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import SettingProvider from './Context/SettingContext.tsx'
import { store } from "./redux/store/store.ts"
import NotificationProvider from './Context/NotificationContext.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <SettingProvider>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </SettingProvider>
    </Provider>
  </StrictMode>,
)
