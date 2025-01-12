import clsx from "clsx";
import React from "react";
import { SettingContext } from "../../Context/SettingContext";
import { useDispatch, useSelector } from "react-redux";
import { AppDisPatch, AppState } from "../../redux/store/store";
import { show } from "../../redux/slice/noteSlide";
import useFormattedDate from "../../hooks/useFormattedDate";
import { v4 } from "uuid";
import { NavigationContext } from "../../Context/NavigationContext";
export default function NoteItem({ note }: { note: Note }) {
    const { settingtState } = React.useContext(SettingContext)
    const { current } = useSelector((state: AppState) => state.note)
    const dispatch = useDispatch<AppDisPatch>()
    const { formattedDate, formattedTime } = useFormattedDate(note.lastEdited)
    const { goTo } = React.useContext(NavigationContext)
    const handleClick = () => {
        dispatch(show(note.id))
        if (window.innerWidth <= 1023)
            goTo("detail")
    }
    return (
        <div onClick={() => handleClick()} className={clsx("flex flex-col gap-3 p-4 border-b-[1px] border-solid border-[var(--neutral-300)] cursor-pointer round-8", {
            "text-[var(--neutral-950)]": settingtState.theme == "light",
            "text-white": settingtState.theme == "dark",
            "bg-[var(--neutral-100)]": settingtState.theme == "light" && current == note.id,
            "bg-[var(--neutral-800)]": settingtState.theme == "dark" && current == note.id

        })}>
            <h2 className="h3">{note.title}</h2>
            <div className="flex flex-wrap gap-2 gap-y-2">
                {
                    note.tags.map(tag => <span key={v4()} className={clsx("h6 px-2 py-1 round-4 ", {
                        "bg-[var(--neutral-400)]": settingtState.theme == "dark",
                        "bg-[var(--neutral-200)]": settingtState.theme == "light",
                    })}>{tag}</span>)
                }
            </div>
            <span className={clsx("h6", {
                "text-[var(--neutral-750)]": settingtState.theme == "light",
                "text-[var(--neutral-300)]": settingtState.theme == "dark"

            })}>{formattedDate} {formattedTime}</span>
        </div>
    )
}