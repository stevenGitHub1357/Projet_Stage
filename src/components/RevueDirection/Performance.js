import React, { useEffect, useRef, useState } from "react";
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend, LineElement, PointElement,} from 'chart.js';
import { Bar, Line } from "react-chartjs-2";
import faker from "faker";
import { useDispatch, useSelector } from "react-redux";
import Global_url from "../../global_url";
import { TitlePage } from "../templates/templates";
import axios from "axios";
var Url = Global_url
// import "./homeStyle.scss"
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,BarElement,Title,Tooltip,Legend);

const Performance = ({MenuCollapse,theme,logo,cible})=>{

    const dispatch = useDispatch()
    let [listData,setListeData] = useState([])
    let [annee,setAnnee] = useState(2023)

    const colonneTable = [
        {id:1, nom:"Objectifs prévue"},
        {id:2, nom:"Poids"},
        {id:3, nom:"Cible"},
        {id:4, nom:"Année"},
        {id:5, nom:"Taux d'atteinte"},
        {id:6, nom:"Commentaires"},
    ]

    const data = [
        {id:1, objectif:"objectif1", poids:"poids1", cible:"cible1", annne:"-",taux:"90%", commentaire:"comment"},
        {id:2, objectif:"objectif1", poids:"poids1", cible:"cible1", annne:"-",taux:"90%", commentaire:"comment"},  
        {id:3, objectif:"objectif1", poids:"poids1", cible:"cible1", annne:"-",taux:"90%", commentaire:"comment"},  
        {id:4, objectif:"objectif1", poids:"poids1", cible:"cible1", annne:"-",taux:"90%", commentaire:"comment"},
        {id:5, objectif:"objectif1", poids:"poids1", cible:"cible1", annne:"-",taux:"90%", commentaire:"comment"},
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
            <TitlePage title="Revue de la performance du processus" process={true} listProcess={false} theme={theme}/>
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
                                        <td>{data.objectif}</td>
                                        <td>{data.poids}</td>
                                        <td>{data.cible}</td>
                                        <td>{annee}</td>
                                        <td>{data.taux}</td>
                                        <td>{data.commentaire}</td>
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
export default Performance;