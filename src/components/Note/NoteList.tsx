import React from "react";
import NoteItem from "../Ultility/NoteItem";
import Button from "../Ultility/Button";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/store/store";
import clsx from "clsx";
import { SettingContext } from "../../Context/SettingContext";
export default function NoteList(): React.JSX.Element {
    const { filteredData, filterType } = useSelector((state: AppState) => state.note)
    const { settingtState } = React.useContext(SettingContext)
    const listElement = React.useRef<HTMLDivElement>(null)
    const createNewNote = () => {

    }
    React.useEffect(() => {
        if (listElement.current) {
            if (listElement.current.scrollHeight <= listElement.current.clientHeight) {
                listElement.current.classList.add('scrollbar-none');
            } else {
                listElement.current.classList.remove('scrollbar-none');
            }
        }

    }, [filteredData])

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
        <div className="flex flex-col w-[25%] px-4 py-5">
            <Button clickEvent={createNewNote} text={"+ Create New Note"} />
            <p className={clsx("h5 p-2 round-8", {
                "text-[var(--neutral-950)] bg-[var(--neutral-100)]": settingtState.theme == "light",
                "text-white bg-[var(--neutral-800)]": settingtState.theme == "dark"

            })}>{emptyData}</p>
        </div>
    )
    return (<div ref={listElement} className="flex flex-col w-[25%] px-4 py-5 gap-2 min-h-[85vh] max-h-[85vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-neutral-200">
        <Button clickEvent={createNewNote} text={"+ Create New Note"} />
        {filterType == "status" && <p className={clsx("h5 ", {
            "text-[var(--neutral-700)]": settingtState.theme == "light",
            "text-[var(--neutral-200)]": settingtState.theme == "dark"

        })}>
            All your archived notes are stored here. You can restore or delete them anytime.
        </p>}
        {
            filteredData.map((note: Note) => <NoteItem key={note.id} note={note} />)
        }

    </div>)
}