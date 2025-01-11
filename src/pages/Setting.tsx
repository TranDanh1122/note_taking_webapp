import React from "react";
import SettingDetail from "../components/Setting/Setting";
import SettingList from "../components/Setting/SettingList";
export default function Setting(): React.JSX.Element {
    return (
        <div className="flex flex-none min-h-[85vh] max-h-[85vh]">
            <SettingList />
            <SettingDetail />
        </div>
    )
}