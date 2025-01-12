import React from "react";
import Sidebar from "../components/Layout/Sidebar";
import Header from "../components/Layout/Header";
import Modal from "../components/Ultility/Modal";
import clsx from "clsx";
import Footer from "../components/Layout/Footer";
import { SettingContext } from "../Context/SettingContext";
import { NavigationContext } from "../Context/NavigationContext";
import Auth from "../pages/Auth/Auth";
export default function Layout({ children }: { children: React.ReactNode }): React.JSX.Element {
    const { settingtState } = React.useContext(SettingContext)
    // const { page } = React.useContext(NavigationContext)
    return <Auth />
    return (
        <div className={clsx("flex container tb:max-w-none mb:max-w-none shadow shadow-neutral-200 h-full min-h-[100vh]", {
            "bg-white": settingtState.theme == "light",
            "bg-[var(--neutral-950)]": settingtState.theme == "dark"

        })}>
            <Sidebar />
            <main className="w-full">
                <Header />
                {children}
                <Footer />
            </main>
            <Modal />

        </div>)
}