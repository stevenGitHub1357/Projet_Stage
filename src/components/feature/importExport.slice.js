import { createSlice } from "@reduxjs/toolkit"

const importSlice = createSlice({
    name:"import",
    initialState:{
        import:[],
    },
    reducers:{
        setImportData:(state,{payload})=>{
            console.log(payload)
            state.import = payload
        },
        
    }
})

const exportSlice = createSlice({
    name:"export",
    initialState:{
        export:[],
        headings:[],
    },
    reducers:{
        setExportData:(state,{payload})=>{
            console.log(payload)
            state.export = payload
        },
        setHeadingData:(state,{payload})=>{
            console.log(payload)
            state.headings = payload
        },
        
    }
})



export const {setImportData} = importSlice.actions
export const importReducer = importSlice.reducer

export const {setExportData, setHeadingData} = exportSlice.actions
export const exportReducer = exportSlice.reducer