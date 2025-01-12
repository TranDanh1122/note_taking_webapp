import clsx from "clsx";
import React from "react";
import { SettingContext } from "../../Context/SettingContext";
import { useDispatch, useSelector } from "react-redux";
import { AppDisPatch, AppState } from "../../redux/store/store";
import { addFilter, applyFilter, clear } from "../../redux/slice/noteSlide";
import { NavigationContext } from "../../Context/NavigationContext";
export default function FooterItem({ text, icon, type }: { text: string, icon: string, type: "none" | "setting" | Filter }): React.JSX.Element {
    const { settingtState } = React.useContext(SettingContext)
    const { page, goTo } = React.useContext(NavigationContext)
    const dispatch: AppDisPatch = useDispatch()
    const { filterType } = useSelector((state: AppState) => state.note)
    const handleClick = () => {
        if (type == "setting") {
            dispatch(clear())
            goTo("setting")
        }
        if (type == "all") {
            dispatch(addFilter({ filter: "", type: "all" }))
            dispatch(applyFilter())
            goTo("list")
        }
        if (type == "status") {
            dispatch(addFilter({ filter: "", type: "status" }))
            dispatch(applyFilter())
            goTo("list")

        }
        if (type == "search") {
            dispatch(addFilter({ filter: "\t\n", type: "search" }))
            dispatch(applyFilter())
            goTo("search")

        }
        if (type == "tag") {
            dispatch(addFilter({ filter: "", type: "tag" }))
            dispatch(applyFilter())
            goTo("tag")

        }
    }
    console.log(filterType, type, page);
    const isSetting = page == "setting" || page == "setting_detail"
    const isSelected = (filterType == type && !isSetting) || (isSetting && (type == "setting"))

    return (<div onClick={handleClick} className={clsx("flex flex-col items-center justify-center gap-2 px-8 mb:px-2 py-3 capitalize", {
        "bg-[var(--blue-50)]": settingtState.theme == "light" && isSelected,
        "bg-[var(--neutral-300)]": settingtState.theme == "dark" && isSelected,
    })}>
        <span className="px-6 mb:px-3 py-2 mb:py-1 round-4">
            <i style={{ mask: `url(${icon}) center / cover no-repeat`, WebkitMask: `url(${icon}) center / cover no-repeat` }} className={clsx("w-6 mb:w-4 h-6 mb:h-4 block", {
                "bg-[var(--neutral-600)]": !isSelected,
                "bg-[var(--blue-500)]": isSelected,
            })}></i>

        </span>
        <span className="mb:hidden">{text}</span>
    </div>)
}