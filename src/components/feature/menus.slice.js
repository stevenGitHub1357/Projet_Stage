import { createSlice } from "@reduxjs/toolkit"
const menusSlice = createSlice({
    name:"menus",
    initialState:{
        menus:[{id_menu:null, labelle_menu:"", icon:"", route:"", range:"", sous_menus:[],role:[]}],
        updatemenus:{id_menu:null, labelle_menu:"", icon:"", route:"", range:null, sous_menus:[]},
        roles:[{id_role:null,type_role:""}]
    },
    reducers:{
        setMenusData:(state,{payload})=>{
            state.menus = payload
        },
        addMenu:(state,{payload})=>{
            console.log(payload)
            if(payload != undefined){
                state.menus.push(payload)
            }
        },
        deleteMenu: (state,{payload})=>{
            state.menus = state.menus.filter( (menu) => menu.id_menu !== payload)
        },
        updateMenu:(state,{payload}) =>{
            state.updatemenus = payload
        },
        updateMenuData:(state,{payload}) =>{
            state.menus = state.menus.map((menu) =>{
                if(menu.id_menu == payload.id_menu){
                    return{
                        ...menu,
                        labelle_menu: payload.labelle_menu,
                        route:payload.route,
                        icon:payload.icon,
                        role:payload.role
                    }
                }else{
                    return menu
                }
            })
        },

        
    }
})

export const {setMenusData,addMenu,deleteMenu,updateMenuData,updateMenu} = menusSlice.actions
export default menusSlice.reducer