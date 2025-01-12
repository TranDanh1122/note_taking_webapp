
import React from "react";
import { NotifySystem } from "../../Context/NotificationContext";
import { useDispatch, useSelector } from "react-redux";
import { AppDisPatch, AppState } from "../../redux/store/store";
import { applyFilter, del, edit, cancel, save } from "../../redux/slice/noteSlide"
import clsx from "clsx";
import { SettingContext } from "../../Context/SettingContext";
import { NavigationContext } from "../../Context/NavigationContext";
import useValidate from "../../hooks/useValidate";
export default function MobileAction({ note }: { note?: Note }) {
    const { pushNoti } = React.useContext(NotifySystem)
    const dispatch: AppDisPatch = useDispatch()
    const { settingtState } = React.useContext(SettingContext)
    const { page, goTo } = React.useContext(NavigationContext)
    const { filterType } = useSelector((state: AppState) => state.note)
    const handleDelete = () => {
        dispatch(del(note?.id as unknown as string));
        pushNoti({ action: "MODAL", payload: { type: "hide" } })
    }
    const handleArchive = () => {
        dispatch(edit({ ...note ?? {} as Note, isArchived: true }));
        pushNoti({ action: "MODAL", payload: { type: "hide" } })
    }
    const handleRestore = () => {
        dispatch(edit({ ...note ?? {} as Note, isArchived: false }));
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
    const handleCancel = () => {
        dispatch(cancel())
        goTo("detail")
    }
    const { isValid } = useValidate(note ?? {} as Note)

    const handleSave = (type: string) => {
        if (!isValid) return
        if (type == "new") {
            dispatch(save(note ?? {} as Note))
        } else {
            dispatch(edit(note ?? {} as Note))
        }
    }
    const handleBack = () => {
        if (page == "list") {
            goTo("tag")
            return
        }   
        if(page == "detail" && filterType == "search") {
            goTo("search")
            return
        }
        if (page == "detail") {
            goTo("list")
            return
        }

    }
    if (page != "detail" && filterType != "tag") return <></>
    return (

        <div className=" w-full flex justify-between gap-4 pb-2">
            <div onClick={handleBack} className={clsx("flex items-center justify-start gap-2", {
                "text-[var(--neutral-600)]": settingtState.theme == "light",
                "text-[var(--neutral-200)]": settingtState.theme == "dark",
            })}>
                <i className={clsx("w-5 h-5 block", {
                    "bg-[var(--neutral-600)]": settingtState.theme == "light",
                    "bg-[var(--neutral-200)]": settingtState.theme == "dark",
                })} style={{ mask: "url(./assets/images/icon-arrow-left.svg) center / cover no-repeat", WebkitMask: "url(./assets/images/icon-arrow-left.svg) center / cover no-repeat" }}></i>
                <span>Back</span>
            </div>
            {page == "detail" &&
                <div className="flex items-center justify-start gap-4">
                    <i onClick={() => action("delete")} className={clsx("w-5 h-5 block", {
                        "bg-[var(--neutral-600)]": settingtState.theme == "light",
                        "bg-[var(--neutral-200)]": settingtState.theme == "light",
                    })} style={{ mask: "url(./assets/images/icon-delete.svg) center / cover no-repeat", WebkitMask: "url(./assets/images/icon-delete.svg) center / cover no-repeat" }}></i>
                    <i onClick={() => action(note?.isArchived ? "restore" : "archive")} className={clsx("w-5 h-5 block", {
                        "bg-[var(--neutral-600)]": settingtState.theme == "light",
                        "bg-[var(--neutral-200)]": settingtState.theme == "light",
                    })} style={{ mask: `url(./assets/images/${note?.isArchived ? "icon-restore" : "icon-archive"}.svg) center / cover no-repeat`, WebkitMask: `url(./assets/images/${note?.isArchived ? "icon-restore" : "icon-archive"}.svg) center / cover no-repeat` }}></i>
                    <span onClick={handleCancel}>Cancel</span>
                    <span onClick={() => handleSave(note?.id ?? "new")} className="text-[var(--blue-500)]">Save Note</span>
                </div>
            }
        </div>

    )
}
