import { createSlice } from "@reduxjs/toolkit"
const processusSlice = createSlice({
    name:"processus",
    initialState:{
        processus:[{id:null, libelle_processus:"", num_processus:"",abbrv:"",date_create:""}],
        updateProcessus:{id:null, libelle_processus:"", num_processus:"",abbrv:"",date_create:null},
    },
    reducers:{
        setProcessusData:(state,{payload})=>{
            state.processus = payload
        },
        addProcessus:(state,{payload})=>{
            console.log(payload)
            if(payload != undefined){
                state.processus.push(payload)
            }
        },
        deleteProcessus: (state,{payload})=>{
            state.processus = state.processus.filter( (processus) => processus.id !== payload)
        },
        updateProcessus:(state,{payload}) =>{
            state.updateprocessus = payload
        },
        updateProcessusData:(state,{payload}) =>{
            state.processus = state.processus.map((processus) =>{
                if(processus.id == payload.id){
                    return{
                        ...processus,
                        libelle_processus: payload.libelle_processus,
                        num_processus: payload.num_processus,
                        abbrv: payload.abbrv
                    }
                }else{
                    return processus
                }
            })
        },

        
    }
})

export const {setProcessusData,addProcessus,deleteProcessus,updateProcessusData,updateProcessus} = processusSlice.actions
export default processusSlice.reducer