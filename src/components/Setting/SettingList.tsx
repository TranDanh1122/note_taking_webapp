import React from "react";
import MenuItem from "../Ultility/MenuItem";
import { v4 } from "uuid";
import { SettingContext } from "../../Context/SettingContext";
import { AppDisPatch } from "../../redux/store/store";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slice/authSlide";
import { NavigationContext } from "../../Context/NavigationContext";
export default function SettingList(): React.JSX.Element {
    const { settingtState } = React.useContext(SettingContext)
    const { goTo } = React.useContext(NavigationContext)
    const dispatch: AppDisPatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
    }
    const hanldeChangePass = () => {
        goTo("auth")
    }
    return (
        <div className="flex flex-col w-[25%] tb:w-full mb:w-full px-4 py-5 tb:py-[15%] mb:py-[15%]">
            <div>
                <MenuItem key={v4()} type="setting" text="Color Theme" icon={settingtState.theme == "light" ? "./assets/images/icon-sun.svg" : "./assets/images/icon-moon.svg"} />
            </div>
            <div>
                <MenuItem key={v4()} type="setting" text="Font Theme" icon="./assets/images/icon-font.svg" />
            </div>

            <div onClick={hanldeChangePass}>
                <MenuItem key={v4()} type="setting" text="Change Password" icon="./assets/images/icon-lock.svg" />
            </div>
            <div onClick={handleLogout}>
                <MenuItem key={v4()} type="setting" text="Logout" icon="./assets/images/icon-logout.svg" />
            </div>
        </div>
    )
}