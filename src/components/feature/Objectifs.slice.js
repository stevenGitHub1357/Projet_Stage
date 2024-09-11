import { createSlice } from "@reduxjs/toolkit"
const objectifSlice = createSlice(
    {
        name:"objectif",
        initialState:{
            objectif:[],
            updateObjectif:{id:null, id_processus:"", objectifs:"",poids:"", cible:"",id_unite:"",recuperation:""},
        },
        reducers:{
            setObjectifData:(state,{payload})=>{
                state.objectif = payload
            },
            addObjectif:(state,{payload})=>{
                console.log(payload)
                if(payload !== undefined){
                    state.objectif.push(payload)
                }
            },
            deleteObjectif: (state,{payload})=>{
                console.log(payload.id)
                state.objectif = state.objectif.filter( (Objectif) =>        
                            Objectif.id !== payload.id     
                    )
            },
            updateObjectif:(state,{payload}) =>{
                state.updateObjectif = payload
            },
            updateObjectifData:(state,{payload}) =>{
                state.objectif = state.objectif.map((Objectif) =>{
                    if(Objectif.id === payload.id){
                        return{
                            ...Objectif,
                            id_processus: payload.id_processus,
                            objectifs: payload.objectifs,
                            poids: payload.poids,
                            cible: payload.cible,
                            id_unite: payload.id_unite,
                            recuperation: payload.recuperation,
                        }
                    }else{
                        return Objectif
                    }
                })
            },
        }
    }
)

const parametrageObjectifSlice = createSlice(
    {
        name:"parametrageObjectif",
        initialState:{
            parametrageObjectif:[],
            updateparametrageObjectif:{id:null,id_default:"", id_processus:"", objectifs:"",poids:"", cible:"",id_unite:"",recuperation:""},
        },
        reducers:{

            setParametrageObjectifData:(state,{payload})=>{
                state.parametrageObjectif = payload
            },
            addParametrageObjectif:(state,{payload})=>{
                console.log(payload)
                if(payload !== undefined){
                    state.parametrageObjectif.push(payload)
                }
            },
            deleteParametrageObjectif: (state,{payload})=>{
                console.log(payload.id_default)
                state.parametrageObjectif = state.parametrageObjectif.filter( (parametrageObjectif) =>        
                            parametrageObjectif.id_default !== payload.id_default     
                    )
            },
            updateParametrageObjectif:(state,{payload}) =>{
                state.updateparametrageObjectif = payload
            },
            updateParametrageObjectifData:(state,{payload}) =>{
                state.parametrageObjectif = state.parametrageObjectif.map((parametrageObjectif) =>{
                    if(parametrageObjectif.id === payload.id){
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
    }
)

export const    {  
                    setObjectifData,addObjectif,deleteObjectif,updateObjectifData,updateObjectif,
                } 
            = objectifSlice.actions
export const    {  
                    parametrageObjectif,setParametrageObjectifData,addParametrageObjectif,deleteParametrageObjectif,updateParametrageObjectifData,updateParametrageObjectif
                } 
            = parametrageObjectifSlice.actions
export const objectifReducer = objectifSlice.reducer
export const parametrageObjectifReducer = parametrageObjectifSlice.reducer
        


