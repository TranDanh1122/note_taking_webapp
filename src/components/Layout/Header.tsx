import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/store/store";
import clsx from "clsx";
import { SettingContext } from "../../Context/SettingContext";

export default function Header(): React.JSX.Element {
    const { filter, filterType } = useSelector((state: AppState) => state.note)
    const { settingtState } = React.useContext(SettingContext)
    return (<div className={clsx("flex items-center px-8  py-6 justify-start gap-8 border-solid border-b-[1px]", {
        "border-[var(--neutral-200)]": settingtState.theme == "light",
        "border-[var(--neutral-800)]": settingtState.theme == "dark"
    })}>
        <h1 className={clsx("h1 ", {
            "text-neutral-950": settingtState.theme == "light",
            "text-white": settingtState.theme == "dark"
        })}>
            {
                filterType == "all" ? "All Notes" :
                    filterType == "status" ? "Archived Notes" :
                        <span className={clsx("", {
                            "text-neutral-600": settingtState.theme == "light",
                            "text-neutral-300": settingtState.theme == "dark"

                        })}> {filterType == "tag" ? "Notes Tagged: " : "Showing results for: "}{filter.toString()}</span>
            }
        </h1>
        <div className={clsx("relative border-solid border-[1px] flex items-center justify-start ml-auto min-w-[300px] round-8", {
            "border-[var(--neutral-600)] text-[var(--neutral-400)]": settingtState.theme == "dark",
            "border-[var(--neutral-300)] text-[var(--neutral-500)]": settingtState.theme == "light"
        })}>
            <span className="px-4">
                <i className="w-5 h-5 block bg-[var(--neutral-400)]" style={{ mask: "url(./assets/images/icon-search.svg) center / cover no-repeat", WebkitMask: "url(./assets/images/icon-search.svg) center / cover no-repeat" }}></i>
            </span>
            <input type="text" className="outline-none border-none py-3 pr-4 w-full" placeholder="Search by title, content, or tags…" />
        </div>
        <i className="w-6 h-6 block bg-[var(--neutral-400)]" style={{ mask: "url(./assets/images/icon-settings.svg) center / cover no-repeat", WebkitMask: "url(./assets/images/icon-settings.svg) center / cover no-repeat" }}></i>
    </div>)
}