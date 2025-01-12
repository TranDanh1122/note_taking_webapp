import React from "react"
type StatusType = "typing" | "default" | "error"
interface InputStatus {
    title: StatusType,
    tags: StatusType,
    content: StatusType
    [key: string]: StatusType
}
const useValidate = (note?: Note) => {
    const [inputState, setInputState] = React.useState<InputStatus>({
        title: "default",
        tags: "default",
        content: "default"
    })
    React.useEffect(() => {
        const newState = inputState
        for (const key in note) {
            if (Object.prototype.hasOwnProperty.call(inputState, key)) {
                const fieldData = Array.isArray(note[key]) ? note[key].join(",") : note[key];
                newState[key] = "typing"
                if (!fieldData) {
                    newState[key] = "error"
                }
            }
        }
        setInputState({ ...newState })

    }, [note])
    if (!note) return { isValid: false, inputState: inputState }

    return { isValid: Object.values(inputState).every(el => el != "error"), inputState: inputState }
}
export default useValidate