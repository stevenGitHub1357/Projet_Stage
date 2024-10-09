import React, { useEffect, useRef, useState } from "react";
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend, LineElement, PointElement,} from 'chart.js';
import { TitlePage } from "../templates/templates";
import { useDispatch, useSelector } from "react-redux";
import { Cookies, useCookies } from "react-cookie";
import MQRevueDirection from "./Component/MQ/MQRevueDirection";
// import "./homeStyle.scss"
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,BarElement,Title,Tooltip,Legend);

const RevueDirection =({MenuCollapse,theme,logo})=>{

    const dispatch = useDispatch();
    const [cookies, setCookie, removeCookie] = useCookies(['islogged_react','matricule_react','role_react','nom_complet_react',"id_user","id_processus"])

    
    return(
        <div  className={!MenuCollapse ? "content" : "contentCollapse"}>
            <TitlePage title="Revue de direction" process={true} theme={theme}/>
                {
                    cookies.id_processus === 2 || cookies.id_processus === "2"? (
                        <MQRevueDirection/>
                    ):<></>
                }
        </div>
    );
}
export default RevueDirection;