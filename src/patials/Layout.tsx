import React from "react";
import Sidebar from "../components/Layout/Sidebar";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
export default function Layout({ children }: { children: React.ReactNode }): React.JSX.Element {
    return (<>
        <Sidebar />
        <main>
            <Header />
            {children}
        </main>
        <Footer />

    </>)
}