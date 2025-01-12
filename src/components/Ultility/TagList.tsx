import React from "react";
import MenuItem from "./MenuItem";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/store/store";
import useScrollBar from "../../hooks/useScrollBar";
export default function TagList(): React.JSX.Element {
    const { data } = useSelector((state: AppState) => state.note)
    const [tags, setTags] = React.useState<string[]>([])
    const tagListEL = useScrollBar(data)
    React.useEffect(() => {
        const tag = [...new Set(data.flatMap((note: Note) => note.tags))]
        setTags(tag)
    }, [data])
    return (
        <div ref={tagListEL} className="flex flex-col gap-2 min-h-[75vh] max-h-[75vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-neutral-200
            mb:py-[10%] tb:py-[10%]
            ">
            <h2 className="h4 text-neutral-500">Tags</h2>
            {tags && tags.map(tag => <MenuItem text={tag} key={tag} icon="./assets/images/icon-tag.svg" type="tag" />)}
        </div>
    )
}