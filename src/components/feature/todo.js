import { createSlice } from "@reduxjs/toolkit"

const todoSlice = createSlice({
    name:"todos",
    initialState:{
        todos:[{tache:"",statut:""}],
    },
    reducers:{
        setTodoData:(state,{payload})=>{
            state.todos = payload
        },
        addTodo:(state,{payload})=>{
            console.log(payload)
            if(payload != undefined){
                state.todos.push(payload)
            }
        },
        deleteTodo: (state,{payload})=>{
            state.todos = state.todos.filter((todo,index) => index !== payload)
        },
        updateTodo:(state,{payload}) =>{
            state.todos = state.todos.map((todo,index) =>{
                if(index == payload.index){
                    return{
                        ...todo,
                        tache:payload.tache,
                        statut:payload.statut
                    }
                }else{
                    return todo
                }
            })
        },
        checkTodo:(state,{payload})=>{
            state.todos = state.todos.map((todo,index)=>{
                if(index == payload.index){
                    return{
                        ...todo,
                        statut: payload.statut
                    }
                }else{
                    return todo
                }
            })
        }
    }
})

export const {setTodoData,addTodo,deleteTodo,updateTodo,checkTodo} = todoSlice.actions
export default todoSlice.reducer