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
                console.log("delete")
                console.log(payload.id)
                state.objectif = state.objectif.filter( (objectif) =>        
                            objectif.id !== payload.id
                    )
                console.log(state.objectif)
            },
            updateObjectif:(state,{payload}) =>{
                console.log(payload)
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
                            support: payload.support
                        }
                    }else{
                        return Objectif
                    }
                })
            },
            updateObjectifData:(state,{payload}) =>{
                state.updateObjectif = payload
            },
        }
    }
)

const parametrageObjectifSlice = createSlice(
    {
        name:"parametrageObjectif",
        initialState:{
            parametrageObjectif:[],
            updateparametrageObjectif:{id:null,index:"", id_processus:"", objectifs:"",poids:"", cible:"",id_unite:"",recuperation:""},
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
                console.log(payload.index)
                state.parametrageObjectif = state.parametrageObjectif.filter( (parametrageObjectif) =>        
                            parametrageObjectif.index !== payload.index     
                    )
            },
            
            updateParametrageObjectif:(state,{payload}) =>{
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
            updateParametrageObjectifData:(state,{payload}) =>{
                state.updateparametrageObjectif = payload
            },

            
        }
    }
)

const uniteSlice = createSlice(
    {
        name:"Unite",
        initialState:{
            Unite:[],
            updateUnite:{id:null,type_unite:"",abbrv:""},
        },
        reducers:{

            setUniteData:(state,{payload})=>{
                state.Unite = payload
            },
            addUnite:(state,{payload})=>{
                console.log(payload)
                if(payload !== undefined){
                    state.Unite.push(payload)
                }
            },
            deleteUnite: (state,{payload})=>{
                console.log(payload.index)
                state.Unite = state.Unite.filter( (Unite) =>        
                            Unite.index !== payload.index     
                    )
            },
            
            updateUnite:(state,{payload}) =>{
                state.Unite = state.Unite.map((Unite) =>{
                    if(Unite.id === payload.id){
                        return{
                            ...Unite,
                            id: payload.id,
                            type_unite: payload.type_unite,
                            abbrv: payload.abbrv                           
                        }
                    }else{
                        return Unite
                    }
                })
            },
            updateUniteData:(state,{payload}) =>{
                state.updateUnite = payload
            },

            
        }
    }
)

const recuperationSlice = createSlice(
    {
        name:"Recuperation",
        initialState:{
            Recuperation:[],
            updateRecuperation:{id:null,type_recuperation:""},
        },
        reducers:{

            setRecuperationData:(state,{payload})=>{
                state.Recuperation = payload
            },
            addRecuperation:(state,{payload})=>{
                console.log(payload)
                if(payload !== undefined){
                    state.Recuperation.push(payload)
                }
            },
            deleteRecuperation: (state,{payload})=>{
                console.log(payload.index)
                state.Recuperation = state.Recuperation.filter( (Recuperation) =>        
                            Recuperation.index !== payload.index     
                    )
            },
            
            updateRecuperation:(state,{payload}) =>{
                state.Recuperation = state.Recuperation.map((Recuperation) =>{
                    if(Recuperation.id === payload.id){
                        return{
                            ...Recuperation,
                            id: payload.id,
                            type_recuperation: payload.type_recuperation,
                        }
                    }else{
                        return Recuperation
                    }
                })
            },
            updateRecuperationData:(state,{payload}) =>{
                state.updateRecuperation = payload
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
export const    {  
                    Unite,setUniteData,addUnite,deleteUnite,updateUniteData,updateUnite
                } 
            = uniteSlice.actions
export const    {  
                    Recuperation,setRecuperationData,addRecuperation,deleteRecuperation,updateRecuperationData,updateRecuperation
                } 
            = recuperationSlice.actions

export const parametrageObjectifReducer = parametrageObjectifSlice.reducer
export const objectifReducer = objectifSlice.reducer
export const recuperationReducer = recuperationSlice.reducer
export const uniteReducer = uniteSlice.reducer
        


