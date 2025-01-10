import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type NoteState = {
    data: Note[],
    filteredData: Note[],
    filter: string[]
    filterType: Filter
}
const initNote: NoteState = {
    data: [] as Note[],
    filteredData: [] as Note[],
    filter: [],
    filterType: "all"
}
const noteSlicer = createSlice({
    initialState: initNote,
    name: "note",
    reducers: {
        clear(state: NoteState) {
            state.filter = []
            state.filterType = "all"
        },
        addFilter(state: NoteState, action: PayloadAction<{ filter: string, type: Filter }>) {
            state.filterType = action.payload.type
            if (state.filter.includes(action.payload.filter)) return
            state.filter.push(action.payload.filter)
        },
        applyFilter(state: NoteState) {
            switch (state.filterType) {
                case "search":
                    state.filteredData = state.data.filter(
                        note => state.filter.some(filter => note.content.includes(filter)
                            || note.tags.includes(filter)
                            || note.title.includes(filter)))
                    break;
                case "status":
                    state.filteredData = state.data.filter(note => note.isArchived)
                    break
                case "tag":
                    state.filteredData = state.data.filter(note => note.tags.some(tag => state.filter.some(filter => tag == filter)))
                    break
                default: state.filteredData = state.data
                    break
            }
        },
    }
})

export const { clear, addFilter, applyFilter } = noteSlicer.actions
export default noteSlicer.reducer