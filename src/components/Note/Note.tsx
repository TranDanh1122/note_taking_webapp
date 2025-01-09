import React from "react";
import MenuItem from "../Ultility/MenuItem";
export default function Note(): React.JSX.Element {
    return (<>
        <input type="text" />
        <div>
            <MenuItem />
            <input type="text" />
        </div>
        <div>
            <MenuItem />
            <input type="text" />
        </div>
        <textarea>

        </textarea>
    </>)
}