import { createSlice } from "@reduxjs/toolkit"
const menusSlice = createSlice({
    name:"menus",
    initialState:{
        menus:[{id_menu:null, labelle_menu:"", icon:"", route:"", range:"", sous_menus:[],role:[]}],
        updatemenus:{id_menu:null, labelle_menu:"", icon:"", route:"", range:null, sous_menus:[]},
        roles:[{id_role:null,type_role:""}]
    },
    reducers:{
        setRolesData:(state,{payload})=>{
            state.roles = payload
        },
        checkedRole:(state,{payload})=>{
            state.roles = payload
        },
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
        setUpdatemenus:(state,{payload}) =>{
            state.updatemenus = payload
        },
        UpdateMenu:(state,{payload}) =>{
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

        AddSousMenu:(state,{payload}) =>{
            console.log(payload)
            state.menus = state.menus.map((menu)=>{
                if(menu.id_menu == payload.id_menu){
                    menu.sous_menus.push(payload.sous_menu)
                }
                return menu
            })
        },

        DeletesousMenu:(state,{payload})=>{
            state.menus = state.menus.map((menu)=>{
                if(menu.id_menu == payload.id_menu){
                    menu.sous_menus = menu.sous_menus.filter((Smenu,index) => index !== payload.index_sous_menu)
                }
                return menu
            })
        },

        UpdateSousMenu:(state,{payload}) =>{
            state.menus = state.menus.map((menu)=>{
                if(menu.id_menu == payload.id_menu){
                    menu.sous_menus = menu.sous_menus.map((SMenu,index)=>{
                        if(index == payload.index){
                            return{
                                ...SMenu,
                                icon_sous_menu: payload.sous_menus.icon_sous_menu,
                                nom_sous_menu: payload.sous_menus.nom_sous_menu,
                                route_sous_menu:payload.sous_menus.route_sous_menu
                            }
                        }else{
                            return SMenu
                        }
                    })
                }
                return menu
            })
        }
    }
})

export const {setMenusData,addMenu,deleteMenu,setUpdatemenus,UpdateMenu,AddSousMenu,DeletesousMenu,UpdateSousMenu,setRolesData} = menusSlice.actions
export default menusSlice.reducer