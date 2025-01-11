import MenuItem from "./MenuItem";
import { v4 } from "uuid";
import useCurrentNote from "../../hooks/useCurrentNote";
import React from "react";
import { NotifySystem } from "../../Context/NotificationContext";
import { useDispatch } from "react-redux";
import { AppDisPatch } from "../../redux/store/store";
import { applyFilter, del, edit } from "../../redux/slice/noteSlide"
export default function Action() {
    const { note } = useCurrentNote({} as Note)
    const { pushNoti } = React.useContext(NotifySystem)
    const dispatch: AppDisPatch = useDispatch()
    if (!note) return <div className="pl-4 pr-8 py-5 w-[25%] "></div>
    const handleDelete = () => {
        dispatch(del(note.id as unknown as string));
        pushNoti({ action: "MODAL", payload: { type: "hide" } })
    }
    const handleArchive = () => {
        dispatch(edit({ ...note, isArchived: true }));
        pushNoti({ action: "MODAL", payload: { type: "hide" } })
    }
    const handleRestore = () => {
        dispatch(edit({ ...note, isArchived: false }));
        pushNoti({ action: "MODAL", payload: { type: "hide" } })
        dispatch(applyFilter())
    }
    const action = (type: "restore" | "archive" | "delete") => {
        if (type == "delete") {
            pushNoti({
                action: "MODAL",
                payload: {
                    type: "warning",
                    icon: "./assets/images/icon-delete.svg",
                    title: "Delete Note",
                    content: "Are you sure you want to permanently delete this note? This action cannot be undone.",
                    handleNo: () => { pushNoti({ action: "MODAL", payload: { type: "hide" } }) },
                    handleYes: handleDelete
                }
            })
        }
        if (type == "archive") {
            pushNoti({
                action: "MODAL",
                payload: {
                    type: "confirm",
                    icon: "./assets/images/icon-archive.svg",
                    title: "Archive Note",
                    content: "Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime.",
                    handleNo: () => { pushNoti({ action: "MODAL", payload: { type: "hide" } }) },
                    handleYes: handleArchive
                }
            })
        }
        if (type == "restore") {
            pushNoti({
                action: "MODAL",
                payload: {
                    type: "confirm",
                    icon: "./assets/images/icon-restore.svg",
                    title: "Restore Note",
                    content: "Are you sure you want to restore this note? You can find it in the All Notes section and Archived it anytime.",
                    handleNo: () => { pushNoti({ action: "MODAL", payload: { type: "hide" } }) },
                    handleYes: handleRestore
                }
            })
        }
    }
    return (
        <>
            <div className="pl-4 pr-8 py-5 w-[25%] flex flex-col gap-4">
                <div onClick={() => action(note.isArchived ? "restore" : "archive")} className="border-solid border-[1px] border-[var(--neutral-300)] py-3 px-4 w-full">
                    <MenuItem key={v4()} text={note.isArchived ? "Restore" : "Archive"} icon={!note.isArchived ? "./assets/images/icon-archive.svg" : "./assets/images/icon-restore.svg"} type="none" />
                </div>
                <div onClick={() => action("delete")} className="border-solid border-[1px] border-[var(--neutral-300)] py-3 px-4 w-full">
                    <MenuItem key={v4()} text="Delete Note" icon="./assets/images/icon-delete.svg" type="none" />
                </div>
            </div>
        </>

    )
}
