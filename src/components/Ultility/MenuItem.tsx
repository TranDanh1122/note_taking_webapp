import clsx from "clsx";
import React from "react";
import { SettingContext } from "../../Context/SettingContext";
import { useDispatch, useSelector } from "react-redux";
import { AppDisPatch, AppState } from "../../redux/store/store";
import { addFilter, applyFilter } from "../../redux/slice/noteSlide";
import { NavigationContext } from "../../Context/NavigationContext";
const MenuItem = ({ text, icon, type }: { text: string, icon: string, type: Filter | "none" | "setting" }): React.JSX.Element => {
    const { settingtState, setting } = React.useContext(SettingContext)
    const { filter } = useSelector((state: AppState) => state.note)
    const { page, goTo } = React.useContext(NavigationContext)
    const dispatch: AppDisPatch = useDispatch()
    const handleClick = () => {
        if (type == "none") return
        if (type == "setting" && window.innerWidth > 1023) {
            setting({ type: "CHANGE_SETTING_PAGE", payload: text })
            return
        }
        if (type == "setting") {            
            goTo("setting_detail")  
            setting({ type: "CHANGE_SETTING_PAGE", payload: text })
            return
        }
        
        dispatch(addFilter({ filter: text, type: type }))
        dispatch(applyFilter())
        if (type == "tag" && page == "tag") {
            goTo("list")
            return
        }

        if (page != "main") goTo("main")

        dispatch(addFilter({ filter: text, type: type }))
        dispatch(applyFilter())
    }
    const isFilter = React.useMemo(() => {
        if (type == "all") return type == "all" && filter.length <= 0
        return filter.includes(text)
    }, [filter, text])
    return (
        <div onClick={() => handleClick()} className={clsx("h4 flex items-center justify-start gap-2 cursor-pointer p-3 round-8", {
            "text-[var(--neutral-700)]": settingtState.theme == "light",
            "text-white": settingtState.theme == "dark",
            "bg-[var(--neutral-100)]": (isFilter || settingtState.current == text) && settingtState.theme == "light",
            "bg-[var(--neutral-400)]": (isFilter || settingtState.current == text) && settingtState.theme == "dark"

        })} >
            <i className={clsx("w-4 h-4  hover:bg-[var(--blue_500)]", {
                "bg-[var(--neutral-700)]": settingtState.theme == "light" && !isFilter,
                "bg-white": settingtState.theme == "dark" && !isFilter,
                "bg-[var(--blue-500)]": isFilter,
            })} style={{ mask: `url(${icon}) center / cover no-repeat`, WebkitMask: `url(${icon}) center / cover no-repeat` }} />
            {text}
            <i className={clsx("w-4 h-4 ml-auto", {
                "bg-[var(--neutral-700)]": settingtState.theme == "light",
                "bg-white": settingtState.theme == "dark",
                "block": isFilter || settingtState.current == text,
                "hidden": !isFilter && settingtState.current != text
            })} style={{ mask: `url(./assets/images/icon-chevron-right.svg) center / cover no-repeat`, WebkitMask: `url(./assets/images/icon-chevron-right.svg) center / cover no-repeat` }} />
        </div>
    )
}
export default MenuItem