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
export const SettingContext = React.createContext<{ settingtState: SettingInterface, setting: React.Dispatch<SettingAction> }>({ settingtState: {} as SettingInterface, setting: () => { } })
export default function SettingProvider({ children }: { children: React.ReactNode }) {
    const [settingtState, setting] = React.useReducer(settingReducer, settingInitData)
    return (
        <SettingContext.Provider value={{ settingtState, setting }}>
            {children}
        </SettingContext.Provider>
    )

}