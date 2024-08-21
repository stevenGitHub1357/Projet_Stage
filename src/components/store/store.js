import { configureStore } from "@reduxjs/toolkit"
import usersReducer from "../feature/users.slice"
import menusReducer from "../feature/menus.slice"
import todosReducer  from "../feature/todo"
export default configureStore({
    reducer:{
        users: usersReducer,
        menus: menusReducer,
        todos: todosReducer
    }
})