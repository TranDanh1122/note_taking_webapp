import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import SettingProvider from './Context/SettingContext.tsx'
import { store } from "./redux/store/store.ts"
import NotificationProvider from './Context/NotificationContext.tsx'
import NavigationProvider from './Context/NavigationContext.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <SettingProvider>
        <NotificationProvider>
          <NavigationProvider>
            <App />
          </NavigationProvider>
        </NotificationProvider>
      </SettingProvider>
    </Provider>
  </StrictMode>,
)
