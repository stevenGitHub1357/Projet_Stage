import { createSlice } from "@reduxjs/toolkit"

const usersSlice = createSlice({
    name:"users",
    initialState:{
        users:[{id_user:"",nom:"",prenom:"",matricule:"",mot_de_passe:""}],
        updateUsers:{id_user:"",nom:"",prenom:"",matricule:"",mot_de_passe:""}
    },
    reducers:{
        setUsersData:(state,{payload})=>{
            state.users = payload;
        },
        addUser:(state,{payload})=>{
            state.users.push(payload)
        },
        deleteUser: (state,{payload})=>{
            state.users = state.users.filter( (user) => user.id_user !== payload)
        },
        updateUser:(state,{payload}) =>{
            state.updateUsers = payload
        },
        updateUserData:(state,{payload}) =>{
            console.log("payload",payload)
            state.users = state.users.map((user) =>{
                if(user.id_user == payload.id_user){
                    return{
                        ...user,
                        nom: payload.nom,
                        prenom:payload.prenom,
                        matricule:payload.matricule,
                        mot_de_passe:payload.mot_de_passe
                    }
                }else{
                    return user
                }
            })
        }
    }
})

export const {setUsersData,addUser,deleteUser,updateUserData,UpdateUser} = usersSlice.actions
export default usersSlice.reducer