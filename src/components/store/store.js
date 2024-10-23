import { configureStore } from "@reduxjs/toolkit"
import usersReducer from "../feature/users.slice"
import menusReducer from "../feature/menus.slice"
import roleReducer from "../feature/roles.slice"
import processusReducer from "../feature/processus.slice"
import todosReducer  from "../feature/todo"
import { objectifReducer, parametrageObjectifReducer, recuperationReducer, uniteReducer} from "../feature/objectifs.slice"
import { importReducer,exportReducer} from "../feature/importExport.slice"
import {revueDirectionReducer, planActionReducer} from "../feature/revueDirection.slice"

export default configureStore({
    reducer:{
        users: usersReducer,
        menus: menusReducer,
        todos: todosReducer,
        role: roleReducer,
        processus: processusReducer,
        objectif: objectifReducer,
        parametrageObjectif: parametrageObjectifReducer,
        import: importReducer,
        export: exportReducer,
        unite: uniteReducer,
        recuperation: recuperationReducer,
        revueDirection: revueDirectionReducer,
        planAction: planActionReducer,
    }
})