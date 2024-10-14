import React, { useEffect, useRef, useState } from "react";
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend, LineElement, PointElement,} from 'chart.js';
import { Bar, Line } from "react-chartjs-2";
import faker from "faker";
import { useDispatch, useSelector } from "react-redux";

import Global_url from "../../global_url";
import axios from "axios";
import { TitlePage } from "../templates/templates";
var Url = Global_url
// import "./homeStyle.scss"
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,BarElement,Title,Tooltip,Legend);

const Revue = ({MenuCollapse,theme,logo})=>{

    const dispatch = useDispatch()
    let [listData,setListeData] = useState([])

    const colonneTable = [
        {id:1, nom:"Sujet"},
        {id:2, nom:"Action"},
        {id:3, nom:"Commentaire"},
        {id:4, nom:"PDCA"},
    ]

    const data = [
        {id:1, sujet:"sujet1", action:"action1", commentaire:"commentaire1",pdca:"A"},
        {id:2, sujet:"sujet1", action:"action1", commentaire:"commentaire1",pdca:"A"},
        {id:3, sujet:"sujet1", action:"action1", commentaire:"commentaire1",pdca:"A"},
    ]

    

    useEffect(()=>{
        getData()
    },[])

    async function getData(){
        // await axios.get(Url+"/getFNCConsultation").then(res=>{
        //     if(res.data.length){
        //         setConsultation(res.data)
        //         console.log(res.data)
        //     }
        // })  
    }

    const border = {
        border: !theme ? "": "black 1px solid"
    }
   
    return(
        <div  className={!MenuCollapse ? "content" : "contentCollapse"}>
                <TitlePage title="Revue du plan d'action" process={true} listProcess={false} theme={theme}/>
                <table className="table table-bordered text-center" style={border} id="table_user">
                    <thead className="text-success ">
                        <tr>
                            {
                                colonneTable.map((col, index) => (
                                    <th>
                                        {col.nom}
                                    </th>
                                ))       
                            } 
                        </tr>
                    </thead>
                    {
                        data.length>0 ?
                        <tbody className={!theme ? "text-dark" : "text-white"}>
                            { 
                                data.map((data,index)=>(
                                    <tr>
                                        <td>{data.sujet}</td>
                                        <td>{data.action}</td>
                                        <td>{data.commentaire}</td>
                                        <td>{data.pdca}</td>
                                    </tr>
                                ))

                            
                            }
                        </tbody>
                        :<></>
                    }
                </table>
            
        </div>

        
    );
}
export default Revue;