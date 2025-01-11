import React from "react"

const useScrollBar = (data: Note[]) => {
    const listRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        if (listRef.current) {
            if (listRef.current.scrollHeight <= listRef.current.clientHeight) {
                listRef.current.classList.add('scrollbar-none');
            } else {
                listRef.current.classList.remove('scrollbar-none');
            }
        }
    }, [data])
    return listRef
}
export default useScrollBar