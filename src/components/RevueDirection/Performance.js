import React, { useEffect, useRef, useState } from "react";
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Legend, LineElement, PointElement,} from 'chart.js';
import { Bar, Line } from "react-chartjs-2";
import faker from "faker";
import { useDispatch, useSelector } from "react-redux";
import Global_url from "../../global_url";
import { TitlePage } from "../templates/templates";
import axios from "axios";
import { Cookies,useCookies } from "react-cookie";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
var Url = Global_url
// // import "./homeStyle.scss"
// ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,BarElement,Title,Tooltip,Legend);

const Performance = ({MenuCollapse,theme,logo,cible})=>{

    const dispatch = useDispatch()
    let [data,setData] = useState([])
    let [annee,setAnnee] = useState(2023)
    const [cookies,setCookie,removeCookie] = useCookies(['id_user','id_processus'])
    const commentaire = useRef();
    const [current, setCurrent] = useState([])
    const[listCommentaire, setListCommentaire] = useState([])
    const id_revue_processus = 1;
    console.log(current)

    const colonneTable = [
        {id:1, nom:"Objectifs prévue"},
        {id:2, nom:"Poids"},
        {id:3, nom:"Cible"},
        {id:4, nom:"Realisé"},
        {id:5, nom:"Taux d'atteinte"},
        {id:6, nom:"Commentaires"},
    ]

    const listData = [
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
        const item = {}
        item.id_processus = cookies.id_processus
        item.id_revue_processus = id_revue_processus
        await axios.post(Url+"/getPerformanceObjectifByRevueProcessus",{item}).then(res=>{
            if(res.data.length){
                setData(res.data)
                console.log(res.data)
                // setCurrent(res.data[0])
            }
        })  
    }

    const border = {
        border: !theme ? "": "black 1px solid"
    }

    const handleCallAddCommentaire = async (id) => {
        const curr = data.filter(data=> data.id === id)
        const item = {}
        item.id_objectif = curr[0].id
        item.id_revue_processus = id_revue_processus

        await axios.post(Url+"/getPerformanceObjectifCommentaireByRevue",{item}).then(res=>{
            if(res.data.length){
                setListCommentaire(res.data)
            }
        }) 

        console.log(curr[0])
        setCurrent(curr[0])
    }

    const handleAddComment = async () => {
        const item = {}
        item.id_objectif = current.id
        item.id_revue_processus = id_revue_processus
        item.commentaire = commentaire.current.value
        await axios.post(Url+"/insertPerformanceObjectifCommentaire",{item})
        getData()

    }

    const handleDetail  = () => {

    }
   
    return(
        <div  className={!MenuCollapse ? "content" : "contentCollapse"}>
            <TitlePage title="Revue de la performance du processus" process={true} listProcess={false} theme={theme}/>
                <table className="table table-bordered text-center" style={border} id="table_user">
                    <thead className="text-success ">
                        <tr>
                            {
                                colonneTable.map((col, index) => (
                                    <th style={{backgroundColor:"lightgray"}}>
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
                                        <td>{data.objectifs}</td>
                                        <td>{data.poids}</td>
                                        <td>{data.cible+""+data.abbrv}</td>
                                        <td>{data.realise+""+data.abbrv}</td>
                                        <td>{data.taux+""+data.abbrv}</td>
                                        <td>{data.commentaire}</td>
                                        <td>
                                            <div className="row">
                                                
                                                <div className="col-3 mx-1">
                                                <OverlayTrigger placement="top" overlay={<Tooltip>Modifier commentaire</Tooltip>}>
                                                    <button className="btn btn-secondary rounded-3 shadow" onClick={()=>handleCallAddCommentaire(data.id)} 
                                                    data-bs-target="#commentaire" data-bs-toggle="modal">
                                                        <i class="bi bi-chat-left-text"></i>
                                                    </button>
                                                </OverlayTrigger>
                                                </div>
                                                <div className="col-3 mx-1">
                                                <OverlayTrigger placement="top" overlay={<Tooltip>Detail</Tooltip>}>
                                                    <button className="btn btn-warning rounded-3 shadow" onClick={()=>handleDetail(data.id)} 
                                                    data-bs-target="#sujet" data-bs-toggle="modal">
                                                        <i className="bi bi-pencil-square"></i>
                                                    </button>
                                                </OverlayTrigger>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))

                            
                            }
                        </tbody>
                        :<></>
                    }
                </table>

                <div className="modal fade" id="commentaire" >
                    <div className="modal-dialog modal-md modal-dialog-right ">
                        <div className={"modal-content bg-dark"}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel" style={{color:"white"}}>Objectifs : {current.objectifs}</h5>
                            </div>
                            <form onSubmit={handleAddComment}>
                                <div className="row mb-4">
                                    <div className="col-8 mx-3" style={{color:"white"}}>
                                        <textarea className="form-control col-12 mt-4" type="text" name="commentaire" placeholder="Nouveau commentaire" ref={commentaire}></textarea>
                                        <input className="form-control col-12 mt-4" type="hidden" name="id_plan" value={current.id}></input>
                                    </div>
                                    
                                    <div className="col-1 mx-2 mt-4">
                                        <button className="btn btn-success rounded-1 shadow" type="submit" data-bs-dismiss="modal">Ajouter</button>
                                    </div> 
                                </div>
                            </form>
                            <div className="modal-body">
                                <table  className="table table-bordered text-center" style={border} id="table_comment">
                                    <thead>
                                        <tr>
                                            <th style={{backgroundColor:"lightgray"}}>Commentaire</th>
                                            <th style={{backgroundColor:"lightgray"}}>Date d'ajout</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {
                                                listCommentaire.map((comment, index)=>(
                                                    <tr>
                                                        <td>
                                                            {comment.commentaire}
                                                        </td>
                                                        <td>
                                                            {comment.createdat}
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                
        </div>

        
    );
}
export default Performance;