import React from "react"
import clsx from "clsx"
import { NotifySystem } from "../../Context/NotificationContext"
import Button from "./Button"
import { v4 } from "uuid"
export default function Modal(): React.JSX.Element {
    const { noti, pushNoti } = React.useContext(NotifySystem)
    return (<>
        <div onClick={() => pushNoti({ action: "MODAL", payload: { type: "hide" } })} className={clsx("fixed w-full h-full top-0 left-0 bg-slate-950/50 z-10", {
            "block": noti.modal,
            "hidden": !noti.modal
        })}></div>
        <div className={clsx("fixed w-[25%] tb:w-[50%] round-8  mb:w-full h-fit bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-20", {
            "block": noti.modal,
            "hidden": !noti.modal
        })}>
            <div className="flex gap-4 items-center p-5">
                <span className="round-4 p-4 bg-slate-100">
                    <i className="block w-6 h6 bg-slate-600 p-4" style={{ mask: `url(${noti.data.icon}) center / cover no-repeat`, WebkitMask: `url(${noti.data.icon}) center / cover no-repeat` }} />
                </span>
                <div className="flex flex-col gap-2">
                    <h2 className="h3 text-[var(--neutral-950)]">{noti.data.title}</h2>
                    <p className="h5 text-[var(--neutral-700)]">{noti.data.content}</p>
                </div>
            </div>
            <div className="flex gap-4 items-center p-5 border-t-[1px] border-solid border-[var(--neutral-200)]">
                <Button key={v4()} text={"Cancel"} textColor={"var(--neutral-600)"} bgColor={"var(--neutral-100)"} clickEvent={noti.data.handleNo || (() => { })} />
                <Button key={v4()} text={noti.data.title} textColor={"var(--neutral)"} bgColor={noti.data.type != "warning" ? "var(--blue-500)" : "var(--red-500)"} clickEvent={noti.data.handleYes || (() => { })} />

            </div>
        </div>
    </>)
}