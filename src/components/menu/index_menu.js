import React, { useEffect, useState } from "react";
import Gestion_menu from "./gestion_menu";
import { useDispatch } from "react-redux/es/exports";
import axios from "axios";
import { setMenusData } from "../feature/menus.slice";
import Global_url from "../../global_url";
import { TitlePage } from "../templates/templates";
var Url = Global_url

const Index_menu =({MenuCollapse,theme,logo})=>{
    const dispatch = useDispatch()
    
    
    return(
        <div className={!MenuCollapse ? "content" : "contentCollapse"}>
            <TitlePage title="Menu" theme={theme}/>
            <div className="px-2 content_scroll">
                <div className={!theme ? "row  rounded-1 bg-white " : "row bg-dark rounded-1 text-white"} >
                    <div className="col-sm-12 px-5">
                        <div className="mt-3 display-6 text-center">Gestion Menus</div>
                        <hr></hr>
                        <Gestion_menu theme={theme}/>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default Index_menu;