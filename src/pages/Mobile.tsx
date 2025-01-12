import React from "react";
import NoteList from "../components/Note/NoteList";
import Note from "../components/Note/Note";
import { NavigationContext } from "../Context/NavigationContext";
import TagList from "../components/Ultility/TagList";
import { v4 } from "uuid";
import SettingList from "../components/Setting/SettingList";
import Setting from "../components/Setting/Setting";

export default function Mobile(): React.JSX.Element {
    const { page } = React.useContext(NavigationContext)
    console.log(page);
    
    return (
        <div className="w-full min-h-[85vh] max-h-[85vh]">
            {page == "list" && <NoteList key={v4()} />}
            {page == "detail" && <Note />}
            {page == "tag" && <TagList />}
            {page == "search" && <NoteList key={v4()} />}
            {page == "setting" && <SettingList key={v4()} />}
            {page == "setting_detail" && <Setting key={v4()} />}

        </div>
    )
}