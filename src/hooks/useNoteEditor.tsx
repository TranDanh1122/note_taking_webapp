import React from "react";
import { AppDisPatch, AppState } from "../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { edit } from "../redux/slice/noteSlide";

const useNoteEditor = (initialNote: Note) => {
    const [note, setNote] = React.useState<Note>(initialNote);
    const dispatch: AppDisPatch = useDispatch();
    const { current, data } = useSelector((state: AppState) => state.note)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Note) => {
        const value = field === 'tags' ? e.target.value.split(',') : e.target.value;
        const updatedNote = { ...note, [field]: value };
        setNote(updatedNote);
        dispatch(edit(updatedNote));
    };
    React.useEffect(() => {
        const [currentView] = data.filter((note: Note) => note.id == current)
        setNote(currentView)
    }, [current, data])
    return { note, handleChange };
};
export default useNoteEditor