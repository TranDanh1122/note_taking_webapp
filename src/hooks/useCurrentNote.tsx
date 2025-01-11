import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../redux/store/store";
const useCurrentNote = (initialNote: Note) => {
    const [note, setNote] = React.useState<Note>(initialNote);
    const { current, data } = useSelector((state: AppState) => state.note)
    React.useEffect(() => {
        const [currentView] = data.filter((note: Note) => note.id == current)
        setNote(currentView)
    }, [current, data])
    return { note, setNote }
}
export default useCurrentNote