import React, { useEffect, useRef, useState } from "react";
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend, LineElement, PointElement,} from 'chart.js';
import { TitlePage } from "../../templates/templates";
import { useDispatch, useSelector } from "react-redux";
import { Cookies, useCookies } from "react-cookie";
import MQRevueDirection from "./MQ/MQRevueDirection";
import { setRevueDirectionData } from "../../feature/revueDirection.slice";
import axios from "axios";
import Global_url from "../../../global_url";
const Url = Global_url
// import "./homeStyle.scss"
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,BarElement,Title,Tooltip,Legend);

const RevueDirection =({MenuCollapse,theme,logo})=>{

    const dispatch = useDispatch();
    const [cookies, setCookie, removeCookie] = useCookies(['islogged_react','matricule_react','role_react','nom_complet_react',"id_user","id_processus"])

    useEffect(()=>{  
        console.log("effect")
        initialise();
    },[])

    async function initialise(){
        console.log("initialise")
        
        const obj = await axios.get(Url+"/getRevueDirection")
        dispatch(setRevueDirectionData(obj.data))
        console.log(obj.data)
            
            
        return obj.data
    }

    
    return(
        <div  className={!MenuCollapse ? "content" : "contentCollapse"}>
            <TitlePage title="Revue de direction" process={true} theme={theme}/>
                {
                    cookies.id_processus === 2 || cookies.id_processus === "2"? (
                        <MQRevueDirection/>
                    ):<MQRevueDirection/>
                }
        </div>
    );
}
export default RevueDirection;