import { createSlice } from "@reduxjs/toolkit"
import { useEffect } from "react"
import { GetUsers } from "../service/service-tools"
const usersSlice = createSlice({
    name:"users",
    initialState:{
        users:[{id_user:"",nom:"",prenom:"",matricule:"",mot_de_passe:"",id_role:""}],
        updateUsers:{id_user:"",nom:"",prenom:"",matricule:"",mot_de_passe:"",id_role:""}
    },
    reducers:{
        setUsersData:(state,{payload})=>{
            state.users = payload
        },
        addUser:(state,{payload})=>{
            state.users.push(payload)
        },
        deleteUser: (state,{payload})=>{
            state.users = state.users.filter( (user) => user.id_user !== payload)
        },
        setUpdateUsers:(state,{payload}) =>{
            state.updateUsers = payload
        },
        UpdateUser:(state,{payload}) =>{
            console.log("payload",payload)
            state.users = state.users.map((user) =>{
                if(user.id_user == payload.id_user){
                    return{
                        ...user,
                        nom: payload.nom,
                        prenom:payload.prenom,
                        matricule:payload.matricule,
                        mot_de_passe:payload.mot_de_passe,
                        id_role:payload.id_role
                    }
                }else{
                    return user
                }
            })
        }
    }
})

export const {setUsersData,addUser,deleteUser,setUpdateUsers,UpdateUser} = usersSlice.actions
export default usersSlice.reducer