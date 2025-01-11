import React from "react";
import MenuItem from "../Ultility/MenuItem";
import TagList from "../Ultility/TagList";
import clsx from "clsx";
import { SettingContext } from "../../Context/SettingContext";
export default function Sidebar(): React.JSX.Element {
    const { settingtState } = React.useContext(SettingContext)
    return (
        <div className={clsx("w-[20%] flex flex-col justify-start gap-5 p-4 border-solid border-r-[1px]", {
            "border-[var(--neutral-800)]": settingtState.theme == "dark",
            "border-[var(--neutral-200)]": settingtState.theme == "light"
        })}>
            <img src={`./assets/images/${settingtState.theme == "light" ? "logo" : "logo-dark"}.svg`} alt="logo" className="object-cover w-24 h-7" />
            <div className={clsx("flex flex-col border-b-[1px] border-solid py-4", {
                "border-[var(--neutral-800)]": settingtState.theme == "dark",
                "border-[var(--neutral-200)]": settingtState.theme == "light"
            })}>
                <MenuItem key={"allnote"} type="all" text="All Notes" icon="./assets/images/icon-home.svg" />
                <MenuItem key={"archivenote"} type="status" text="Archived Notes" icon="./assets/images/icon-archive.svg" />
            </div>
            <TagList />
        </div>

    )
}