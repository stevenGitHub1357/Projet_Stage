
import { createSlice } from "@reduxjs/toolkit"
const revueSlice = createSlice({
    name:"revue",
    initialState:{
        revue:[],
        updaterevue:{},
    },
    reducers:{
        setRevueData:(state,{payload})=>{
            state.revue = payload
        },
        addRevue:(state,{payload})=>{
            console.log(payload)
            if(payload !== undefined){
                state.revue.push(payload)
            }
        },
        deleteRevue: (state,{payload})=>{
            state.revue = state.revue.filter( (revue) => revue.id_menu !== payload)
        },
        updateRevue:(state,{payload}) =>{
            state.updaterevue = payload
        },
        updateRevueData:(state,{payload}) =>{
            state.revue = state.revue.map((revue) =>{
                if(revue.id_menu === payload.id_menu){
                    return{
                        ...revue,
                        labelle_menu: payload.labelle_menu,
                        route:payload.route,
                        icon:payload.icon,
                        position:payload.position,
                        base:payload.base
                    }
                }else{
                    return revue
                }
            })
        },

        
    }
})

export const {setRevueData,addRevue,deleteRevue,updateRevueData,updateRevue} = revueSlice.actions
export default revueSlice.reducer