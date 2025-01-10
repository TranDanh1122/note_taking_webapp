import React from "react";
import MenuItem from "./MenuItem";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/store/store";
export default function TagList(): React.JSX.Element {
    const { data } = useSelector((state: AppState) => state.note)
    const [tags, setTags] = React.useState<string[]>([])
    React.useEffect(() => {
        const tag = [...new Set(data.flatMap((note: Note) => note.tags))]
        setTags(tag)
    }, [data])
    return (
        <div className="flex flex-col gap-2">
            <h2 className="h4 text-neutral-500">Tags</h2>
            <MenuItem text={"test"} key={"test"} icon="./assets/images/icon-tag.svg" type="tag" />
            {tags && tags.map(tag => <MenuItem text={tag} key={tag} icon="./assets/images/icon-tag.svg" type="tag" />) }
        </div>
    )
}