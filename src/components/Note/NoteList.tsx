import React from "react";
import NoteItem from "../Ultility/NoteItem";
import Button from "../Ultility/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/store/store";
import clsx from "clsx";
import { SettingContext } from "../../Context/SettingContext";
import useScrollBar from "../../hooks/useScrollBar";
import { v4 as uuidv4 } from "uuid"
import { cancel } from "../../redux/slice/noteSlide";
import MobileAction from "../Ultility/MobileAction";
import { NavigationContext } from "../../Context/NavigationContext";
export default function NoteList(): React.JSX.Element {
    const { filteredData, filterType } = useSelector((state: AppState) => state.note)
    const { settingtState } = React.useContext(SettingContext)
    const listElement = useScrollBar(filteredData)
    const { goTo } = React.useContext(NavigationContext)
    const dispatch = useDispatch()
    const createNewNote = () => {
        dispatch(cancel())
        goTo("detail")
    }
    let emptyData = ""
    switch (filterType) {
        case "all":
            emptyData = "You don’t have any notes yet. Start a new note to capture your thoughts and ideas. "
            break;
        case "status":
            emptyData = "No notes have been archived yet. Move notes here for safekeeping, or create a new note."
            break;
        case "search":
            emptyData = "No notes match your search. Try a different keyword or create a new note."
            break;
    }

    if (filteredData.length <= 0) return (
        <div className="flex flex-col w-[25%] tb:w-full mb:w-full px-4 py-5 tb:py-[20%] mb:py-[20%]">
            <div className="w-full tb:hidden mb:hidden">
                <Button key={uuidv4()} bgColor={"var(--blue-500)"} textColor={"var(--neutral)"} clickEvent={createNewNote} text={"+ Create New Note"} />
            </div>
            <p className={clsx("h5 p-2 round-8", {
                "text-[var(--neutral-950)] bg-[var(--neutral-100)]": settingtState.theme == "light",
                "text-white bg-[var(--neutral-800)]": settingtState.theme == "dark"

            })}>{emptyData}</p>
            <div onClick={createNewNote} className="hidden tb:flex mb:flex items-center justify-center fixed bottom-[20%] right-9 w-16 h-16 rounded-full text-white bg-[var(--blue-500)] ">
                +
            </div>
        </div >
    )
    return (
        <>
            <div ref={listElement} className="flex flex-col w-[25%] tb:w-full mb:w-full tb:py-[15%] mb:py-[15%] px-4 py-5 gap-2 min-h-[85vh] max-h-[85vh] tb:max-h-[100vh] mb:max-h-[100vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-neutral-200">
                <MobileAction key={uuidv4()} />

                <div className="w-full tb:hidden mb:hidden">
                    <Button key={uuidv4()} bgColor={"var(--blue-500)"} textColor={"var(--neutral)"} clickEvent={createNewNote} text={"+ Create New Note"} />
                </div>
                {filterType == "status" && <p className={clsx("h5 ", {
                    "text-[var(--neutral-700)]": settingtState.theme == "light",
                    "text-[var(--neutral-200)]": settingtState.theme == "dark"

                })}>
                    All your archived notes are stored here. You can restore or delete them anytime.
                </p>}
                {
                    filteredData.map((note: Note) => <NoteItem key={note.id} note={note} />)
                }
                <div onClick={createNewNote} className="hidden tb:flex mb:flex items-center justify-center fixed bottom-[20%] right-9 w-16 h-16 rounded-full text-white bg-[var(--blue-500)] ">
                    +
                </div>
            </div>
        </>

    )
}