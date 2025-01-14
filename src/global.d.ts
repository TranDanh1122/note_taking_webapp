declare global {
    type Theme = "light" | "dark"
    type Font = "sans-serif" | "serif" | "monospace"
    interface SettingInterface {
        theme: Theme,
        font: Font,
        current: string,
        pickedTheme: Theme | "system",
        [key: string]: string
    }
    type StatusType = "typing" | "default" | "error"
    type Filter = "search" | "status" | "tag" | "all"
    interface Note {
        id: string,
        title: string,
        tags: string[],
        content: string,
        lastEdited: string,
        isArchived: boolean,
        [key: string]: any
    }
    type NoteState = {
        data: Note[],
        filteredData: Note[],
        filter: string[]
        filterType: Filter,
        current: string
    }
    interface UserData {
        user: unknown,
        token: string | null
    }
}
export { }