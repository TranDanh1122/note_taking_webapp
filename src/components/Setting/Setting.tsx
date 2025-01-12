import React from "react";
import { SettingContext } from "../../Context/SettingContext";
import clsx from "clsx";
import SettingItem from "./SettingItem";
import { v4 } from "uuid";
export default function Setting(): React.JSX.Element {
    const { settingtState } = React.useContext(SettingContext)
    return (
        <div className="w-[50%] tb:w-full mb:w-full px-6 py-5 flex flex-col gap-5">
            <h2 className={clsx("h3", {
                "text-[var(--neutral-950)]": settingtState.theme == "light",
                "text-white": settingtState.theme == "dark"
            })}>{settingtState.current}</h2>
            <p className={clsx("h5", {
                "text-[var(--neutral-700)]": settingtState.theme == "light",
                "text-white": settingtState.theme == "dark"
            })}>Chose your {settingtState.current}</p>
            <div className="mt-6 flex flex-col gap-4 ">
                {
                    settingtState.current == "Color Theme" ?
                        <>
                            <SettingItem key={v4()} title="Light Mode" icon="./assets/images/icon-sun.svg" type="pickedTheme" value="light" content="Pick a clean and classic light theme" />
                            <SettingItem key={v4()} title="Dark Mode" icon="./assets/images/icon-moon.svg" type="pickedTheme" value="dark" content="Select a sleek and modern dark theme" />
                            <SettingItem key={v4()} title="System Theme" icon="./assets/images/icon-system-theme.svg" type="pickedTheme" value="system" content="Adapts to your device’s theme" />
                        </> :
                        <>
                            <SettingItem key={v4()} title="Sans serif" icon="./assets/images/icon-font-sans-serif.svg" type="font" value="sans-serif" content="Clean and modern, easy to read." />
                            <SettingItem key={v4()} title="Serif" icon="./assets/images/icon-font-serif.svg" type="font" value="serif" content="Classic and elegant for a timeless feel." />
                            <SettingItem key={v4()} title="MonoSpace" icon="./assets/images/icon-font-monospace.svg" type="font" value="monospace" content="Code-like, great for a technical vibe." />
                        </>
                }
            </div>
        </div>)
}