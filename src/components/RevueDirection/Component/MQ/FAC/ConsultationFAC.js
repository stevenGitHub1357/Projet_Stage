import React, { useEffect, useRef, useState } from "react";
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend, LineElement, PointElement,} from 'chart.js';
import { Bar, Line } from "react-chartjs-2";
import faker from "faker";
import { useDispatch, useSelector } from "react-redux";
import Global_url from "../../../../../global_url";
import axios from "axios";
var Url = Global_url
// import "./homeStyle.scss"
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,BarElement,Title,Tooltip,Legend);

const ConsultationFAC = ({MenuCollapse,theme,logo,cible})=>{

    const dispatch = useDispatch()
    let [consultationListe,setConsultation] = useState([])

    

    useEffect(()=>{
        getData()
    },[])

    async function getData(){
        await axios.get(Url+"/getFACConsultation").then(res=>{
            if(res.data.length){
                setConsultation(res.data)
                console.log(res.data)
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
                    Consultation FAC
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
                                        <td>{cible}%</td>
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
export default ConsultationFAC;