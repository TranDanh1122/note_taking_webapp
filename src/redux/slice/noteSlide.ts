import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initNote: NoteState = {
    data: [] as Note[],
    filteredData: [] as Note[],
    filter: [],
    filterType: "all",
    current: ""
}
export const getNotes = createAsyncThunk<Note[]>("note/getNotes", async () => {
    const reponse = await fetch("./data.json")
    if (!reponse.ok) throw new Error("get Notes error")
    const data: { notes: Note[] } = await reponse.json()
    return data.notes
})
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
            if (state.filterType == "all") {
                state.filter = [];
                return
            }
            if (state.filter.includes(action.payload.filter)) return
            state.filter = [action.payload.filter]
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
        show(state: NoteState, action: PayloadAction<string>) {
            state.current = action.payload
        },
        edit(state: NoteState, action: PayloadAction<Note>) {
            state.data = state.data.map((note: Note) => {
                if (note.id == action.payload.id)
                    return action.payload
                return note
            })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getNotes.pending, () => console.log("start get note"))
            .addCase(getNotes.fulfilled, (state: NoteState, action: PayloadAction<Note[]>) => {
                state.data = action.payload
                state.filteredData = action.payload
                state.filterType = "all"
            }).addCase(getNotes.rejected, () => console.log("Please Delete Your System32, it will work after you have done it!!!"))
    }
})

export const { clear, addFilter, applyFilter, show, edit } = noteSlicer.actions
export default noteSlicer.reducer