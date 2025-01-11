import React from "react";

const settingInitData: SettingInterface = {
    theme: "light",
    font: "sans-serif",
    current: "Color Theme",
    pickedTheme: "light"
}
type SettingAction = { type: "CHANGE_THEME", payload: Theme | "system" } | { type: "CHANGE_FONT", payload: Font } | { type: "CHANGE_SETTING_PAGE", payload: string }
const settingReducer = (state: SettingInterface, action: SettingAction): SettingInterface => {
    switch (action.type) {
        case "CHANGE_THEME":
            if (action.payload == "system") {
                const theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
                return { ...state, theme: theme, pickedTheme: action.payload }
            } else {
                return { ...state, theme: action.payload, pickedTheme: action.payload }
            }
        case "CHANGE_FONT": return { ...state, font: action.payload }
        case "CHANGE_SETTING_PAGE": return { ...state, current: action.payload }
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