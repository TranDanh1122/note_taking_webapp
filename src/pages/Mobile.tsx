import React from "react";
import NoteList from "../components/Note/NoteList";
import Note from "../components/Note/Note";
import Action from "../components/Ultility/Action";
import { NavigationContext } from "../Context/NavigationContext";
import TagList from "../components/Ultility/TagList";
import { v4 } from "uuid";

export default function Mobile(): React.JSX.Element {
    const { page } = React.useContext(NavigationContext)    
    return (
        <div className="w-full min-h-[85vh] max-h-[85vh]">
            {page == "list" && <NoteList key={v4()} />}
            {page == "detail" && <Note />}
            {page == "tag" && <TagList />}
            {page == "search" && <NoteList  key={v4()}/>}
            {page == "setting" && <NoteList  key={v4()}/>}

        </div>
    )
}