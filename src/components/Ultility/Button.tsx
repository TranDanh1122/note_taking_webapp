import React from "react";
export default function Button({ text }: { text: React.ReactNode }): React.JSX.Element {
    return (
        <button>{text}</button>

    )
}