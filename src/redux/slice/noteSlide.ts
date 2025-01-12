import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { firestoreApi, parseFirestoreData, parseDocumentId } from "../../api/firebase";
const token = localStorage.getItem("access_token")
const user = JSON.parse(localStorage.getItem("user") ?? "{}")
const initNote: NoteState = {
    data: [] as Note[],
    filteredData: [] as Note[],
    filter: [],
    filterType: "all",
    current: ""
}

export const getNotes = createAsyncThunk<{ document: { fields: Note, name: string }, readTime: "string" }[]>("note/getNotes", async () => {
    // const reponse = await fetch("./data.json")
    // if (!reponse.ok) throw new Error("get Notes error")
    // const data: { notes: Note[] } = await reponse.json()
    if (!token || !user) throw new Error()
    const response = await firestoreApi.getDocuments("notes", token, user.localId)
    return response
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
            state.filteredData = state.filteredData.map((note: Note) => {
                if (note.id == action.payload.id)
                    return action.payload
                return note
            })
            if (!token || !user) throw new Error()
            firestoreApi.updateDocument("notes", action.payload.id, action.payload, token, user.localId)

        },
        save(state: NoteState, action: PayloadAction<Note>) {
            if (!token || !user) throw new Error()
            firestoreApi.addDocument("notes", action.payload, token, user.localId)
            state.data.push(action.payload)
            state.filteredData.push(action.payload)
        },
        cancel(state: NoteState) {
            state.current = ""
        },
        del(state: NoteState, action: PayloadAction<string>) {
            if (!token || !user) throw new Error()
            firestoreApi.deleteDocument("notes", action.payload, token)
            state.data = state.data.filter((note: Note) => note.id != action.payload)
            state.filteredData = state.filteredData.filter((note: Note) => note.id != action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getNotes.pending, () => console.log("start get note"))
            .addCase(getNotes.fulfilled, (state: NoteState, action: PayloadAction<{ document: { fields: Note, name: string }, readTime: "string" }[]>) => {
                state.data = []
                state.filteredData = []
                action.payload.forEach(el => {
                    const document = el.document
                    const data = parseFirestoreData(document)
                    state.data.push({ ...data, id: parseDocumentId(document.name) })
                    state.filteredData.push({ ...data, id: parseDocumentId(document.name) })
                })
                state.filterType = "all"
            }).addCase(getNotes.rejected, () => console.log("Please Delete Your System32, it will work after you have done it!!!"))
    }
})

export const { clear, addFilter, applyFilter, show, edit, cancel, del, save } = noteSlicer.actions
export default noteSlicer.reducer