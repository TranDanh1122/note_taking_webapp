import React from "react";
import MenuItem from "../Ultility/MenuItem";
import clsx from "clsx";
import { SettingContext } from "../../Context/SettingContext";
import useFormattedDate from "../../hooks/useFormattedDate";
import useNoteEditor from "../../hooks/useNoteEditor";
import { v4 } from "uuid";
import Button from "../Ultility/Button";
import useCurrentNote from "../../hooks/useCurrentNote";
import { useDispatch } from "react-redux";
import { cancel, edit, save } from "../../redux/slice/noteSlide";
import useValidate from "../../hooks/useValidate";

export default function Note(): React.JSX.Element {
    const { settingtState } = React.useContext(SettingContext)
    const { note, setNote } = useCurrentNote({} as Note)
    const { handleChange } = useNoteEditor(note, setNote)
    const { isValid, inputState } = useValidate(note)
    const dispatch = useDispatch()
    const { formattedDate, formattedTime } = useFormattedDate(note?.lastEdited ?? "")
    const handleSave = (type: string) => {
        if (!isValid) return
        if (type == "new") {
            dispatch(save(note))
        } else {
            dispatch(edit(note))
        }
    }
    const handleCancel = () => {
        dispatch(cancel())
    }
    // if (!note) return <div>loading</div>
    return (<div className="w-[50%] px-6 py-5 flex flex-col gap-5">
        <input onChange={(e) => handleChange(e, "title")} type="text" value={note?.title ?? ""}
            placeholder="Enter a title…"
            className={clsx("h1 outline-none w-full focus:border-b-[1px] focus:border-solid ", {
                "placeholder-[var(--neutral-950)] text-[var(--neutral-950)] focus:border-[var(--neutral-950)]": settingtState.theme == "light" && inputState.title != "error",
                "placeholder-white text-white focus:border-[var(--neutral-250)]": settingtState.theme == "dark" && inputState.title != "error",
                "border-b-[1px] border-solid border-[var(--red-500)]": inputState.title == "error",
                "border-none": inputState.title != "error",
                "bg-slate-950":settingtState.theme == "dark"
            })} />
        <div className={clsx("w-full flex flex-col gap-2 py-2 border-solid border-b-[1px]", {
            "text-[var(--neutral-950)] border-[var(--neutral-200)]": settingtState.theme == "light",
            "text-white focus:border-[var(--neutral-250)]": settingtState.theme == "dark"
        })}>
            <div className="flex items-center gap">
                <div className="w-[25%]">
                    <MenuItem key={v4()} text="Tags" icon="./assets/images/icon-tag.svg" type="none" />
                </div>
                <input onChange={(e) => handleChange(e, "tags")} type="text" value={note?.tags?.join(",") ?? ""}
                    placeholder="Add tags separated by commas (e.g. Work, Planning)"
                    className={clsx("h5 outline-none w-[70%] focus:border-b-[1px] focus:border-solid", {
                        "focus:border-[var(--neutral-950)]": settingtState.theme == "light" && inputState.tags != "error",
                        "focus:border-[var(--neutral-250)]": settingtState.theme == "dark" && inputState.tags != "error",
                        "border-b-[1px] border-solid border-[var(--red-500)]": inputState.tags == "error",
                        "border-none": inputState.tags != "error",
                        "bg-slate-950":settingtState.theme == "dark"
                    })} />
            </div>
            <div className="flex items-center gap">
                <div className="w-[25%]">
                    <MenuItem key={v4()} text="Last edited" icon="./assets/images/icon-tag.svg" type="none" />
                </div>
                <span className="h5 border-none outline-none  w-[70%]">{note?.id ? `${formattedDate} ${formattedTime}` : "Not yet saved"}</span >
            </div>
        </div>

        <textarea onChange={(e) => handleChange(e, "content")} value={note?.content ?? ""}
            placeholder="Start typing your note here…"
            className={clsx("h5 h-full outline-none text-wrap whitespace-pre-line pb-2  ", {
                "text-[var(--neutral-800)] border-[var(--neutral-200)]": settingtState.theme == "light" && inputState.content != "error",
                "text-white border-[var(--neutral-200)]": settingtState.theme == "dark" && inputState.content != "error",
                "border-b-[1px] border-solid border-[var(--red-500)]": inputState.content == "error",
                "border-solid border-b-[1px]": inputState.title != "error",
                "bg-slate-950":settingtState.theme == "dark"
            })}>
        </textarea>
        <div className="flex items-center gap-4">
            <Button key={v4()} text={"Save Note"} textColor={"var(--neutral)"} bgColor={"var(--blue-500)"} clickEvent={() => handleSave(note?.id ?? "new")} />
            <Button key={v4()} text={"Cancel"} textColor={"var(--neutral-600)"} bgColor={"var(--neutral-100)"} clickEvent={handleCancel} />
        </div>
    </div>)
}