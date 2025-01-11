import React from "react";
import MenuItem from "../Ultility/MenuItem";
import { v4 } from "uuid";
import { SettingContext } from "../../Context/SettingContext";
export default function SettingList(): React.JSX.Element {
    const { settingtState } = React.useContext(SettingContext)
    return (
        <div className="flex flex-col w-[25%] px-4 py-5">
            <div>
                <MenuItem key={v4()} type="setting" text="Color Theme" icon={settingtState.theme == "light" ? "./assets/images/icon-sun.svg" : "./assets/images/icon-moon.svg"} />
            </div>
            <div>
                <MenuItem key={v4()} type="setting" text="Font Theme" icon="./assets/images/icon-font.svg" />
            </div>
            <div>
                <MenuItem key={v4()} type="setting" text="Change Password" icon="./assets/images/icon-lock.svg" />
            </div>
        </div>
    )
}