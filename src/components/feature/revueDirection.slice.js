import { createSlice } from "@reduxjs/toolkit"
const revueDirectionSlice = createSlice({
    name:"revueDirection",
    initialState:{
        revueDirection:[],
        revueDirectionEtape:[],
        updateRevueDirection:{},
    },
    reducers:{
        setRevueDirectionEtape:(state,{payload})=>{
            state.revueDirectionEtape = payload
        },
        setRevueDirectionData:(state,{payload})=>{
            state.revueDirection = payload
        },
        addRevueDirection:(state,{payload})=>{
            console.log(payload)
            if(payload !== undefined){
                state.revueDirection.push(payload)
            }
        },
        deleteRevueDirection: (state,{payload})=>{
            state.revueDirection = state.revueDirection.filter( (revueDirection) => revueDirection.id !== payload)
        },
        updateRevueDirection:(state,{payload}) =>{
            state.updateRevueDirection = payload
        },
        updateRevueDirectionData:(state,{payload}) =>{
            state.revueDirection = state.revueDirection.map((revueDirection) =>{
                if(revueDirection.id === payload.id){
                    return{
                        ...revueDirection,
                        libelle_processus: payload.libelle_processus,
                        num_processus: payload.num_processus,
                        abbrv: payload.abbrv
                    }
                }else{
                    return revueDirection
                }
            })
        },

        
    }
})


export const {setRevueDirectionData,addRevueDirection,deleteRevueDirection,updateRevueDirectionData, setRevueDirectionEtape} = revueDirectionSlice.actions
export default revueDirectionSlice.reducer