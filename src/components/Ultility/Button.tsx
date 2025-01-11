import React from "react";
export default function Button({ text, bgColor, textColor, clickEvent }: { text: React.ReactNode, bgColor: string, textColor: string, clickEvent: () => void }): React.JSX.Element {
    return (
        <button onClick={clickEvent} className={`h4 py-3 px-14 w-full bg-[${bgColor}] round-8`} style={{color: `${textColor}`}}>{text}</button>
    )
}