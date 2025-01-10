import React from "react";
import NoteList from "../components/Note/NoteList";
import Note from "../components/Note/Note";
import Action from "../components/Ultility/Action";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { getNotes } from "../redux/slice/noteSlide";
export default function Main(): React.JSX.Element {
    const dispatch = useDispatch<AppDispatch>()
    React.useEffect(() => {
        dispatch(getNotes())
    }, [])
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