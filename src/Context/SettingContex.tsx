import React from "react";

const settingInitData: SettingInterface = {
    theme: "light",
    font: "sans-serif"
}
type SettingAction = { type: "CHANGE_THEME", payload: Theme } | { type: "CHANGE_FONT", payload: Font }
const settingReducer = (state: SettingInterface, action: SettingAction): SettingInterface => {
    switch (action.type) {
        case "CHANGE_THEME": return { ...state, theme: action.payload }
        case "CHANGE_FONT": return { ...state, font: action.payload }
        default: return state
    }
}
export const SettingContext = React.createContext<{ state: SettingInterface, setting: React.Dispatch<SettingAction> }>({ state: {} as SettingInterface, setting: () => { } })
export default function SettingProvider({ children }: { children: React.ReactNode }) {
    const [state, setting] = React.useReducer(settingReducer, settingInitData)
    return (
        <SettingContext.Provider value={{ state, setting }}>
            {children}
        </SettingContext.Provider>
    )

}