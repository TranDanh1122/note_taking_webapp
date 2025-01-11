
import Main from './pages/Main'
import Layout from './patials/Layout'
import './App.css'
import { NavigationContext } from './Context/NavigationContext'
import React from 'react'
import Setting from './pages/Setting'
import { SettingContext } from './Context/SettingContext'
import { v4 } from 'uuid'
import { useDispatch } from "react-redux";
import { AppDisPatch } from './redux/store/store'
import { getNotes } from './redux/slice/noteSlide'

function App() {
  const { page } = React.useContext(NavigationContext)
  const { settingtState } = React.useContext(SettingContext)
  React.useEffect(() => {
    document.documentElement.setAttribute("data-font", settingtState.font);
  }, [settingtState.font])
  const dispatch = useDispatch<AppDisPatch>()
  React.useEffect(() => {
    dispatch(getNotes())
  }, [])
  return (
    <Layout >
      {page == "main" && <Main key={v4()} />}
      {page == "setting" && <Setting />}
    </Layout>


  )
}

export default App
