import React, { useEffect, useRef, useState } from "react";
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend, LineElement, PointElement,} from 'chart.js';
import { Bar, Line } from "react-chartjs-2";
import faker from "faker";
import { TitlePage } from "../../templates/templates";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, checkTodo, deleteTodo, setTodoData, updateTodo } from "../../feature/todo";
// import "./homeStyle.scss"
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,BarElement,Title,Tooltip,Legend);

const ConsultationFNC =({MenuCollapse,theme,logo})=>{

    const dispatch = useDispatch()
    const cible = '90%'
    const consultationListe = [
        {N:'N1', Titre:'Titre1', Objectif : 'Objectif1', cible:'cible1', realiser:'2', demande:'2024-10-01', cloture: '2024-10-10' ,status:'A'},
        {N:'N2', Titre:'Titre2', Objectif : 'Objectif2', cible:'cible2', realiser:'1', demande:'2024-10-01', cloture: '2024-10-10' ,status:'B'},
    ]




    const border = {
        border: !theme ? "": "black 1px solid"
    }
   
    return(
        <div>
            <div>
                <h1>
                    Consultation FNC
                </h1>
                <table className="table table-bordered text-center" style={border} id="table_user">
                    <thead className="text-success ">
                        <tr>
                            <th>N.</th>
                            <th>Titre</th>    
                            <th>Objctif</th>      
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
                                        <td>{consultation.N}</td>
                                        <td>{consultation.Titre}</td>
                                        <td>{consultation.Objectif}</td>
                                        <td>{consultation.cible}</td>
                                        <td>{consultation.realiser}</td>
                                        <td>{consultation.demande}</td>
                                        <td>{consultation.cloture}</td>
                                        <td>{consultation.status}</td>
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
export default ConsultationFNC;