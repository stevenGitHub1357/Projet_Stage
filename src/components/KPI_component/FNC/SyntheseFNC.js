import React, { useEffect, useRef, useState } from "react";
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend, LineElement, PointElement,} from 'chart.js';
import { Bar, Line } from "react-chartjs-2";
import faker from "faker";
import { TitlePage } from "../../templates/templates";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, checkTodo, deleteTodo, setTodoData, updateTodo } from "../../feature/todo";
// import "./homeStyle.scss"
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,BarElement,Title,Tooltip,Legend);

const SyntheseFNC =({MenuCollapse,theme,logo})=>{

    const dispatch = useDispatch()
    const cible = '90%'

    const syntheseListe = [
        {annee : '2024', Planifiees : '10', Realiser : '9', tauxEff : '90', cible : cible, commentaire : 'comment'},
        {annee : '2025', Planifiees : '11', Realiser : '10', tauxEff : '90', cible : cible, commentaire : 'comment2'}
    ]



    const border = {
        border: !theme ? "": "black 1px solid"
    }
   
    return(
        <div>
            <div>
                <h1>Synthese FNC</h1>
                <table className="table table-bordered text-center " style={border} id="table_user">
                    <thead className="text-success ">
                        <tr>
                            <th></th>
                            {
                                syntheseListe.map((synthese, index)=> (
                                    <th>{synthese.annee}</th>
                                ))
                            }          
                        </tr>
                    </thead>
                    <tbody className={!theme ? "text-dark" : "text-white"}>
                        <tr>
                            <th>FNC Plannifiées</th>
                            {
                                syntheseListe.map((synthese, index) => (
                                    <td>{synthese.Planifiees}</td>
                                ))
                            }
                        </tr>
                        <tr>
                            <th>FNC Réalisé</th>
                            {
                                syntheseListe.map((synthese, index) => (
                                    <td>{synthese.Realiser}</td>
                                ))
                            }
                        </tr>
                        <tr>
                            <th> Taux d'afficacité</th>
                            {
                                syntheseListe.map((synthese, index) => (
                                    <td>{synthese.tauxEff}</td>
                                ))
                            }
                        </tr>
                        <tr>
                            <th> Cible</th>
                            {
                                syntheseListe.map((synthese, index) => (
                                    <td>{synthese.cible}</td>
                                ))
                            }
                        </tr>
                        <tr>
                            <th> Commentaire</th>
                            {
                                syntheseListe.map((synthese, index) => (
                                    <td>{synthese.commentaire}</td>
                                ))
                            }
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        
    );
}
export default SyntheseFNC;