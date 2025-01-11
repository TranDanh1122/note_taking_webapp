import React from "react";
interface NotifyPayload {
    type: "warning" | "confirm" | "hide",
    handleYes?: (...args: any[]) => void,
    handleNo?: () => void,
    title?: string,
    content?: string,
    icon?: string
}
interface Notify {
    modal: boolean,
    toast: boolean,
    data: NotifyPayload
}
type NotifyAction = { action: "MODAL", payload: NotifyPayload } | { action: "TOAST", payload: NotifyPayload }
const notifyReducer = (state: Notify, action: NotifyAction) => {
    switch (action.action) {
        case "MODAL":
            if (action.payload.type == "hide") return { ...state, modal: false, data: action.payload }
            return { ...state, modal: true, data: action.payload }
        case "TOAST":
            if (action.payload.type == "hide") return { ...state, modal: false, data: action.payload }
            return { ...state, toast: true, data: action.payload }
    }
}
export const NotifySystem = React.createContext<{ noti: Notify, pushNoti: React.Dispatch<NotifyAction> }>({
    noti: { modal: false, toast: false, data: {} as NotifyPayload },
    pushNoti: () => { }
});
export default function NotificationProvider({ children }: { children: React.ReactNode }) {
    const [noti, pushNoti] = React.useReducer(notifyReducer, { modal: false, toast: false, data: {} as NotifyPayload })
    return (<NotifySystem.Provider value={{ noti, pushNoti }}>{children}</NotifySystem.Provider>)
}