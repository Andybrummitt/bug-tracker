import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        username: '',
        team: '',
        ticketsCreated: [],
        archivedTicketsCreated: []
    },
    reducers: {
        setUser: (state, action) => {
            state.username = action.payload;
        },
        setUserTeam: (state, action) => {
            state.team = action.payload
        },
        addCreatedTicket: (state, action) => {
            state.ticketsCreated = [...state.ticketsCreated, action.payload]
        },
        archiveCreatedTicket: (state, action) => {
            state.archivedTicketsCreated = state.archivedTicketsCreated.filter(ticket => ticket.id !== action.payload.id)
        }
    }
});

export const { setUser, setUserTeam, addCreatedTicket, archiveCreatedTicket } = userSlice.actions;

export default userSlice.reducer;