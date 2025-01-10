import React from "react";
import Sidebar from "../components/Layout/Sidebar";
import Header from "../components/Layout/Header";
import '../App.css'

export default function Layout({ children }: { children: React.ReactNode }): React.JSX.Element {
    return (<div className="flex container mb:max-w-none shadow shadow-neutral-200 h-full min-h-[100vh]">
        <Sidebar />
        <main className="w-full">
            <Header />
            {children}
        </main>
      

    </div>)
}