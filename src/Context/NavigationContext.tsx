import React from "react";
export const NavigationContext = React.createContext<{ page: string, goTo: React.Dispatch<React.SetStateAction<string>> }>({ page: "main", goTo: () => { } })
export default function NavigationProvider({ children }: { children: React.ReactNode }) {
    const [page, goTo] = React.useState<string>("main")
    return <NavigationContext.Provider value={{ page, goTo }}>{children}</NavigationContext.Provider>
}