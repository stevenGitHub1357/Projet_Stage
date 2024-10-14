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

const Efficacite = ({MenuCollapse,theme,logo,cible})=>{

    const dispatch = useDispatch()
    let [listData,setListeData] = useState([])
    const titre = [
        {id:1, nom:"RISQUE"},
        {id:2, nom:"ENJEUX"}, 
        {id:3, nom:"OPPORTUNITES"}
    ]

    const colonneTable = [
        {id:2, nom:"Action"},
        {id:3, nom:"Commentaire"},
        {id:4, nom:"PDCA"},
    ]

    const data = [
        {id:1, sujet:"sujet1", action:"action1", commentaire:"commentaire1",pdca:"A", type:1},
        {id:2, sujet:"sujet1", action:"action1", commentaire:"commentaire1",pdca:"A", type:1},
        {id:3, sujet:"sujet1", action:"action1", commentaire:"commentaire1",pdca:"A", type:1},

        {id:4, sujet:"sujet1", action:"action1", commentaire:"commentaire1",pdca:"A", type:2},
        {id:5, sujet:"sujet1", action:"action1", commentaire:"commentaire1",pdca:"A", type:2},

        {id:6, sujet:"sujet1", action:"action1", commentaire:"commentaire1",pdca:"A", type:3},
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
            <TitlePage title="Efficacité des actions face aux risques, enjeux et opportunités" process={true} listProcess={false}  theme={theme}/>
                {
                titre.map((titre, index)=>(
                    <>
                    <h1>{titre.nom}</h1>
                    <table className="table table-bordered text-center" style={border} id="table_user">
                        <thead className="text-success ">
                            <tr>
                                <th>{titre.nom}</th>
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
                            data.filter(data=>data.type===titre.id).length>0 ?
                            <tbody className={!theme ? "text-dark" : "text-white"}>
                                { 
                                    data.filter(data=>data.type===titre.id).map((data,index)=>(
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
                    </>
                ))
                }
        </div>

        
    );
}
export default Efficacite;