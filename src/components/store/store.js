import { configureStore } from "@reduxjs/toolkit"
import usersReducer from "../feature/users.slice"
import menusReducer from "../feature/menus.slice"
import roleReducer from "../feature/roles.slice"
import processusReducer from "../feature/processus.slice"
import todosReducer  from "../feature/todo"
import parametrageObjectifReducer from "../feature/parametrageObjectif.slice"

export default configureStore({
    reducer:{
        users: usersReducer,
        menus: menusReducer,
        todos: todosReducer,
        role: roleReducer,
        processus: processusReducer,
        parametrageObjectif: parametrageObjectifReducer,
    }
})