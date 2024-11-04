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


const planActionSlice = createSlice({
    name:"planAction",
    initialState:{
        planAction:[{}],
    },
    reducers:{
        setPlanActionData:(state,{payload})=>{
            console.log("plan action data",payload)
            state.planAction = payload
        },
        addPlanAction:(state,{payload})=>{
            console.log(payload)
            if(payload !== undefined){
                state.planAction.push(payload)
            }
        },
        deletePlanAction: (state,{payload})=>{
            console.log(payload)
            state.planAction = state.planAction.filter((todo,index) => index !== payload)
            console.log(state.planAction)
        },
        updateRevueDirection:(state,{payload}) =>{
            state.revueDirection = state.revueDirection.map((revueDirection) =>{
                if(revueDirection.id === payload.id){
                    return{
                        ...revueDirection,
                        ticket: payload.ticket,
                        sujet: payload.sujet,
                        action: payload.action,
                        pdca: payload.pdca,
                        commentaire: payload.commentaire,
                    }
                }else{
                    return revueDirection
                }
            })
        },
        
    }
})


const planActionRevueSlice = createSlice({
    name:"planActionRevue",
    initialState:{
        planActionRevue:[{}],
    },
    reducers:{
        setPlanActionRevueData:(state,{payload})=>{
            console.log("ici")
            console.log(payload)
            state.planActionRevue = payload
        },
        addPlanActionRevue:(state,{payload})=>{
            console.log(payload)
            if(payload !== undefined){
                state.planActionRevue.push(payload)
            }
        },
        deletePlanActionRevue: (state,{payload})=>{
            console.log(payload)
            state.planActionRevue = state.planActionRevue.filter((todo,index) => index !== payload)
            console.log(state.planActionRevue)
        },
        updateRevueDirection:(state,{payload}) =>{
            state.revueDirection = state.revueDirection.map((revueDirection) =>{
                if(revueDirection.id === payload.id){
                    return{
                        ...revueDirection,
                        ticket: payload.ticket,
                        sujet: payload.sujet,
                        action: payload.action,
                        pdca: payload.pdca,
                        commentaire: payload.commentaire,
                    }
                }else{
                    return revueDirection
                }
            })
        },
        
    }
})

export const {setPlanActionRevueData,addPlanActionRevue,deletePlanActionRevue} = planActionRevueSlice.actions
export const planActionRevueReducer = planActionRevueSlice.reducer


export const {setPlanActionData,addPlanAction,deletePlanAction} = planActionSlice.actions
export const planActionReducer = planActionSlice.reducer


export const {setRevueDirectionData,addRevueDirection,deleteRevueDirection,updateRevueDirectionData, setRevueDirectionEtape} = revueDirectionSlice.actions
export const revueDirectionReducer = revueDirectionSlice.reducer