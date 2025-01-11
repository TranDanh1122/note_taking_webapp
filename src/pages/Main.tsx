import React from "react";
import NoteList from "../components/Note/NoteList";
import Note from "../components/Note/Note";
import Action from "../components/Ultility/Action";

export default function Main(): React.JSX.Element {

    return (
        <div className="flex flex-none min-h-[85vh] max-h-[85vh]">
            <NoteList />
            <Note />
            <Action />
        </div>
    )
}