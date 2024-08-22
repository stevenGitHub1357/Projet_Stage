import { createSlice } from "@reduxjs/toolkit"
const roleSlice = createSlice({
    name:"role",
    initialState:{
        role:[{id_role:null, type_role:"", date_create:""}],
        updateRole:{id_role:null, type_role:"", date_create:null},
    },
    reducers:{
        setRolesData:(state,{payload})=>{
            state.role = payload
        },
        addRole:(state,{payload})=>{
            console.log(payload)
            if(payload != undefined){
                state.role.push(payload)
            }
        },
        deleteRole: (state,{payload})=>{
            state.role = state.role.filter( (roles) => roles.id_role !== payload)
        },
        updateRole:(state,{payload}) =>{
            state.updateRole = payload
        },
        updateRoleData:(state,{payload}) =>{
            state.role = state.role.map((roles) =>{
                if(roles.id_role == payload.id_role){
                    return{
                        ...roles,
                        type_role: payload.type_role,
                    }
                }else{
                    return roles
                }
            })
        },

        
    }
})

export const {setRolesData,addRole,deleteRole,updateRoleData,updateRole} = roleSlice.actions
export default roleSlice.reducer