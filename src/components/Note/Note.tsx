import React from "react";
import MenuItem from "../Ultility/MenuItem";
import clsx from "clsx";
import { SettingContext } from "../../Context/SettingContext";
import useFormattedDate from "../../hooks/useFormattedDate";
import useNoteEditor from "../../hooks/useNoteEditor";

export default function Note(): React.JSX.Element {
    const { settingtState } = React.useContext(SettingContext)
    const { note, handleChange } = useNoteEditor({} as Note)
    const { formattedDate, formattedTime } = useFormattedDate(note?.lastEdited ?? "")
    if (!note) return <>loading</>
    return (<div className="w-[50%] px-6 py-5 flex flex-col gap-5">
        <input onChange={(e) => handleChange(e, "title")} type="text" value={note.title} className={clsx("h1 border-none outline-none w-full focus:border-b-[1px] focus:border-solid ", {
            "text-[var(--neutral-950)] focus:border-[var(--neutral-950)]": settingtState.theme == "light",
            "text-white focus:border-[var(--neutral-250)]": settingtState.theme == "dark"
        })} />
        <div className={clsx("w-full flex flex-col gap-2 py-2 border-solid border-b-[1px]", {
            "text-[var(--neutral-950)] border-[var(--neutral-200)]": settingtState.theme == "light",
            "text-white focus:border-[var(--neutral-250)]": settingtState.theme == "dark"
        })}>
            <div className="flex items-center gap">
                <div className="w-[25%]">
                    <MenuItem key={`${note.id}_tag`} text="Tags" icon="./assets/images/icon-tag.svg" type="none" />
                </div>
                <input onChange={(e) => handleChange(e, "tags")} type="text" value={note.tags?.join(",")} className={clsx("h5 border-none outline-none w-[70%] focus:border-b-[1px] focus:border-solid", {
                    "focus:border-[var(--neutral-950)]": settingtState.theme == "light",
                    "focus:border-[var(--neutral-250)]": settingtState.theme == "dark"
                })} />
            </div>
            <div className="flex items-center gap">
                <div className="w-[25%]">
                    <MenuItem key={`${note.id}_lastedit`} text="Last edited" icon="./assets/images/icon-tag.svg" type="none" />
                </div>
                <span className="h5 border-none outline-none  w-[70%]">{formattedDate} {formattedTime}</span >
            </div>
        </div>

        <textarea onChange={(e) => handleChange(e, "content")} value={note.content} className={clsx("h5 h-full outline-none text-wrap whitespace-pre-line pb-2 border-solid border-b-[1px] ", {
            "text-[var(--neutral-800)] border-[var(--neutral-200)]": settingtState.theme == "light",
            "text-white border-[var(--neutral-200)]": settingtState.theme == "dark"
        })}>
        </textarea>
        
    </div>)
}