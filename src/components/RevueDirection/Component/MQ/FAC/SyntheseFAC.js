import React, { useEffect, useRef, useState } from "react";
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend, LineElement, PointElement,} from 'chart.js';
import { Bar, Line } from "react-chartjs-2";
import faker from "faker";
import { TitlePage } from "../../../../templates/templates";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, checkTodo, deleteTodo, setTodoData, updateTodo } from "../../../../feature/todo";
import Global_url from "../../../../../global_url";
import axios from "axios";
var Url = Global_url
// import "./homeStyle.scss"
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,BarElement,Title,Tooltip,Legend);

const SyntheseFAC =({MenuCollapse,theme,logo,cible})=>{

    const dispatch = useDispatch()
    let [syntheseListe,setSynthese] = useState([])

    useEffect(()=>{
        getData()
    },[])

    async function getData(){
        await axios.get(Url+"/getFACSynthese").then(res=>{
            if(res.data.length){
                setSynthese(res.data)
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
                <h1>Synthese FAC</h1>
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
                            <th>FAC Plannifiées</th>
                            {
                                syntheseListe.map((synthese, index) => (
                                    <td>{synthese.declarer}</td>
                                ))
                            }
                        </tr>
                        <tr>
                            <th>FAC Réalisé</th>
                            {
                                syntheseListe.map((synthese, index) => (
                                    <td>{synthese.realise_cloture}</td>
                                ))
                            }
                        </tr>
                        <tr>
                            <th> Taux d'afficacité</th>
                            {
                                syntheseListe.map((synthese, index) => (
                                    <td>{synthese.taux}%</td>
                                ))
                            }
                        </tr>
                        <tr>
                            <th> Cible</th>
                            {
                                cible
                            }%
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
export default SyntheseFAC;