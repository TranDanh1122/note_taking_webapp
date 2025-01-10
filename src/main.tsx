import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import SettingProvider from './Context/SettingContex.tsx'
import { store } from "./redux/store/store.ts"
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <SettingProvider>
        <App />
      </SettingProvider>

    </Provider>
  </StrictMode>,
)
