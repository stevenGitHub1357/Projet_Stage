import { createSlice } from "@reduxjs/toolkit"
const parametrageObjectifSlice = createSlice({
    name:"parametrageObjectif",
    initialState:{
        parametrageObjectif:[{id:0, id_processus:"", objectifs:"",poids:"", cible:"",id_unite:"",recuperation:""}],
        updateparametrageObjectif:{id:null, id_processus:"", objectifs:"",poids:"", cible:"",id_unite:"",recuperation:""},
    },
    reducers:{
        setParametrageObjectifData:(state,{payload})=>{
            state.parametrageObjectif = payload
        },
        addParametrageObjectif:(state,{payload})=>{
            console.log(payload)
            if(payload != undefined){
                state.parametrageObjectif.push(payload)
            }
        },
        deleteParametrageObjectif: (state,{payload})=>{
            state.parametrageObjectif = state.parametrageObjectif.filter( (parametrageObjectif) => parametrageObjectif.id !== payload)
        },
        updateParametrageObjectif:(state,{payload}) =>{
            state.updateparametrageObjectif = payload
        },
        updateParametrageObjectifData:(state,{payload}) =>{
            state.parametrageObjectif = state.parametrageObjectif.map((parametrageObjectif) =>{
                if(parametrageObjectif.id == payload.id){
                    return{
                        ...parametrageObjectif,
                        id_processus: payload.id_processus,
                        objectifs: payload.objectifs,
                        poids: payload.poids,
                        cible: payload.cible,
                        id_unite: payload.id_unite,
                        recuperation: payload.recuperation,
                    }
                }else{
                    return parametrageObjectif
                }
            })
        },

        
    }
})

export const {setParametrageObjectifData,addParametrageObjectif,deleteParametrageObjectif,updateParametrageObjectifData,updateParametrageObjectif} = parametrageObjectifSlice.actions
export default parametrageObjectifSlice.reducer


