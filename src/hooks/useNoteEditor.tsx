import React from "react";

const useNoteEditor = (note: Note, setNote: React.Dispatch<React.SetStateAction<Note>>) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Note) => {
        const value = field === 'tags' ? e.target.value.split(',') : e.target.value;
        const updatedNote = { ...note, [field]: value };

        setNote(updatedNote);
    };

    return { handleChange };
};
export default useNoteEditor