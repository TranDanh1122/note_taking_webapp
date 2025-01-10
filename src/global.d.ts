declare global {
    type Theme = "light" | "dark"
    type Font = "sans-serif" | "serif" | "monospace"
    interface SettingInterface {
        theme: Theme,
        font: Font
    }
    type Filter = "search" | "status" | "tag" | "all"
    interface Note {
        id: string,
        title: string,
        tags: string[],
        content: string,
        lastEdited: string,
        isArchived: boolean
    }
}
export { }