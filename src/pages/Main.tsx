import React from "react";
import NoteList from "../components/Note/NoteList";
import Note from "../components/Note/Note";
import Action from "../components/Ultility/Action";
export default function Main(): React.JSX.Element {
    return (
            <div>
                <div>
                    <NoteList />
                </div>
                <div>
                    <Note />
                </div>
                <div>
                    <Action />
                </div>
            </div>
    )
}