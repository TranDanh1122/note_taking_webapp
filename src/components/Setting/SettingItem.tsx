import React from "react";
import { SettingContext } from "../../Context/SettingContext";
import clsx from "clsx";
export default function SettingItem({ title, content, icon, type, value }: { title: string, content: string, icon: string, type: string, value: string }): React.JSX.Element {
    const { settingtState, setting } = React.useContext(SettingContext)
    const handleClick = () => {
        if (type == "pickedTheme") {
            setting({ type: "CHANGE_THEME", payload: value as Theme })
        } else {
            setting({ type: "CHANGE_FONT", payload: value as Font })
        }
    }
    return (<div onClick={() => handleClick()} className={clsx("flex items-center justify-start gap-4 px-5 py-3 rounded-lg", {
        "text-[var(--neutral-950)]": settingtState.theme == "light",
        "text-white": settingtState.theme == "dark",
        "bg-[var(--neutral-200)]":  settingtState.theme == "light" && settingtState[type] == value,
        "bg-[var(--neutral-500)]":  settingtState.theme == "dark" && settingtState[type] == value

    })}>
        <span className="p-4 bg-[var(--neutral-300)] block rounded-lg">
            <i className={clsx("w-6 h-6 block", {
                "bg-[var(--neutral-950)]": settingtState.theme == "light",
                "bg-white": settingtState.theme == "dark",
            })}
                style={{ mask: `url(${icon}) center / cover no-repeat`, WebkitMask: `url(${icon}) center /cover no-repeat` }}
            ></i>
        </span>
        <div className="flex flex-col gap-2">
            <h3 className="h4">{title}</h3>
            <p className="h6"> {content}</p>
        </div>
        <div className={clsx("rounded-full w-4 h-4 ml-auto border-solid border-4", {
            "bg-white ": settingtState.theme == "light",
            "bg-[var(--neutral-400)] ": settingtState.theme == "dark",
            "border-[var(--blue-500)]": settingtState[type] == value

        })}>

        </div>
    </div>)
}