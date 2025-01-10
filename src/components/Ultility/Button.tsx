import React from "react";
export default function Button({ text, clickEvent }: { text: React.ReactNode, clickEvent: () => void }): React.JSX.Element {
    return (
        <button onClick={clickEvent} className="h4 py-3 px-14 w-full bg-[var(--blue-500)] text-white round-8">{text}</button>
    )
}