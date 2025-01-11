import React from "react";
import Sidebar from "../components/Layout/Sidebar";
import Header from "../components/Layout/Header";
import Modal from "../components/Ultility/Modal";
import clsx from "clsx";
import { SettingContext } from "../Context/SettingContext";
export default function Layout({ children }: { children: React.ReactNode }): React.JSX.Element {
    const { settingtState } = React.useContext(SettingContext)
    return (
        <div className={clsx("flex container mb:max-w-none shadow shadow-neutral-200 h-full min-h-[100vh]", {
            "bg-white": settingtState.theme == "light",
            "bg-[var(--neutral-950)]": settingtState.theme == "dark"

        })}>
            <Sidebar />
            <main className="w-full">
                <Header />
                {children}
            </main>
            <Modal />

        </div>)
}