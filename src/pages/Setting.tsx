import React from "react";
import SettingDetail from "../components/Setting/Setting";
import SettingList from "../components/Setting/SettingList";
export default function Setting(): React.JSX.Element {
    return (
        <div>
            <div>
                <SettingList />
            </div>
            <div>
                <SettingDetail />
            </div>
        </div>
    )
}