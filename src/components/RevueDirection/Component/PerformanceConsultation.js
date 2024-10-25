import React, { useEffect, useRef, useState } from "react";
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend, LineElement, PointElement,} from 'chart.js';
import { Bar, Line } from "react-chartjs-2";
import faker from "faker";
import { useDispatch, useSelector } from "react-redux";
import { Cookies,useCookies } from "react-cookie";
import Global_url from "../../../global_url";
import axios from "axios";
var Url = Global_url
// import "./homeStyle.scss"
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,BarElement,Title,Tooltip,Legend);

const PerformanceConsultation = ({MenuCollapse,theme,logo,cible, isOpen, current})=>{

    const dispatch = useDispatch()
    let [consultationListe,setConsultation] = useState([])
    const [cookies,setCookie,removeCookie] = useCookies(['id_user','id_processus','id_revue_direction', 'type_demande'])



    useEffect(()=>{
        if(isOpen){
            getData()
        }
    },[isOpen])

    async function getData(){
        const item = {}
        console.log(current)
        item.type_demande = current.type_demande;
        item.date_cloture = current.date_cloture_revue_processus
        item.date_create = current.date_create_revue_processus
        console.log(item)
        await axios.post(Url+"/getPerformanceByDemandeRevue",{item}).then(res=>{
            if(res.data.length){
                setConsultation(res.data)
                console.log(res.data)
            }else{
                setConsultation([])
            }
        })  
    }

    const border = {
        border: !theme ? "": "black 1px solid"
    }
   
    return(
        <div>
            <div>
                <h1>
                    Consultation {current.type_demande}
                </h1>
                <table className="table table-bordered text-center" style={border} id="table_user">
                    <thead className="text-success ">
                        <tr>
                            {/* <th>id.</th> */}
                            <th>Titre</th>    
                            <th>Objectif</th>      
                            <th>Cible</th> 
                            <th>Réalisé</th>
                            <th>Date de demande</th>
                            <th>Date de cloture</th> 
                            <th>Status</th>            
                        </tr>
                    </thead>
                    {
                        consultationListe.length>0 ?
                        <tbody className={!theme ? "text-dark" : "text-white"}>
                            { 
                                consultationListe.map((consultation,index)=>(
                                    <tr>
                                        {/* <td>{consultation.id}</td> */}
                                        <td>{consultation.titre}</td>
                                        <td>{consultation.objectif}</td>
                                        <td>{current.cible+""+current.abbrv}</td>
                                        <td>{consultation.realise}</td>
                                        <td>{consultation.date_demande}</td>
                                        <td>{consultation.date_cloture}</td>
                                        {
                                            consultation.statut === "En cours" ? (
                                                <td>B</td>
                                            ):
                                            consultation.statut === "Clôturé" ? (
                                                <td>A</td>
                                            ):
                                                <td>{consultation.statut}</td>
                                        }
                                        
                                    </tr>
                                ))

                            
                            }
                        </tbody>
                        :<></>
                    }
                </table>
            </div>
        </div>

        
    );
}
export default PerformanceConsultation;