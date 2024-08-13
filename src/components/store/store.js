import { configureStore } from "@reduxjs/toolkit"
import usersReducer from "../feature/users.slice"
import menusReducer from "../feature/menus.slice"
import ticketsReducer from "../feature/demande_ticketSlice"
import todosReducer  from "../feature/todo"
export default configureStore({
    reducer:{
        users: usersReducer,
        menus: menusReducer,
        tickets: ticketsReducer,
        todos: todosReducer
    }
})