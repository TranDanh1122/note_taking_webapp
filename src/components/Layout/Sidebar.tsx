import React from "react";
import MenuItem from "../Ultility/MenuItem";
import TagList from "../Ultility/TagList";
export default function Sidebar(): React.JSX.Element {
    return (
        <div>
            <img src="./assets/images/logo.svg" alt="logo" />
            <div>
                <MenuItem key={"allnote"} />
                <MenuItem key={"archivenote"} />
            </div>

            <TagList />
        </div>

    )
}