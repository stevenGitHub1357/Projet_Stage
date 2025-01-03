import React, { useEffect, useRef, useState } from "react";
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend, LineElement, PointElement,} from 'chart.js';
import { Bar, Line } from "react-chartjs-2";
import faker from "faker";
import { useDispatch, useSelector } from "react-redux";
import { Cookies,useCookies } from "react-cookie";
import Global_url from "../../../global_url";
import axios from "axios";
import { OverlayTrigger } from "react-bootstrap";
import { Warning } from "../../service/service-alert";
var Url = Global_url
// import "./homeStyle.scss"
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,BarElement,Title,Tooltip,Legend);

const PerformanceSynthese =({MenuCollapse,theme,logo,cible,isOpen, current})=>{

    const dispatch = useDispatch()
    let [syntheseListe,setSynthese] = useState([])
    const commentaire = useRef()
    const [currentRevue,setCurrentRevue] = useState({})
    const [listCommentaire, setListCommentaire] = useState([])
    const [cookies,setCookie,removeCookie] = useCookies(['id_user','id_processus','id_revue_direction', 'type_demande'])

    useEffect(()=>{
        if(isOpen){
            getData()
        }
    },[isOpen])

    function getData(){
        const item = current.type_demande;
        console.log(item)
        axios.post(Url+"/getPerformanceSyntheseByDemande", {item}).then(res=>{
            if(res.data.length){
                setSynthese(res.data)
                console.log(res.data)
            }else{
                setSynthese([])
            }
        })

    }

    const handleCommentaire = async () => {
        let item = current;
        console.log("addCommenatire")
        const comment = commentaire.current.value
        item.commentaire = comment
        console.log(comment)
        console.log(current) 
        console.log(syntheseListe)
        if(syntheseListe[syntheseListe.length-1].commentaire===null){
            console.log("insert", item)
            axios.post(Url+"/insertPerformanceCommentaire", {item})
        }else{
            console.log("update", item)
            axios.post(Url+"/updatePerformanceCommentaire", {item})
        }
        getData()
             
    }




    const border = {
        border: !theme ? "": "black 1px solid"
    }
   
    return(
        <div>
            <div>
                <h1>Synthese {current.type_demande}</h1>
                <table className="table table-bordered text-center " style={border} id="table_user">
                    <thead className="text-success ">
                        <tr>
                            <th></th>
                            {
                                syntheseListe.map((synthese, index)=> (
                                    <th>{synthese.mois+""+synthese.annee}</th>
                                ))
                            }          
                        </tr>
                    </thead>
                    <tbody className={!theme ? "text-dark" : "text-white"}>
                        <tr>
                            <th>{current.type_demande} Plannifiées</th>
                            {
                                syntheseListe.map((synthese, index) => (
                                    <td>{synthese.declarer}</td>
                                ))
                            }
                        </tr>
                        <tr>
                            <th>{current.type_demande} Réalisé</th>
                            {
                                syntheseListe.map((synthese, index) => (
                                    <td>{synthese.cloture}</td>
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
                                syntheseListe.map((synthese, index) => (
                                    <td>{current.cible+""+current.abbrv}</td>
                                ))
                            }
                        </tr>
                        <tr>
                            <th> Commentaire</th>
                            {
                                syntheseListe.map((synthese, index) => (
                                    <td>
                                            <div className="row mb-4">
                                                <div className="col-11 mx-3" style={{color:"white"}}>
                                                    <textarea className="form-control col-12 mt-4" type="text" name="commentaire" placeholder="Nouveau commentaire"   
                                                    onChange={()=> handleCommentaire()} ref={commentaire}
                                                    defaultValue={synthese.commentaire}></textarea>
                                                    <input className="form-control col-12 mt-4" type="hidden" name="id_revue_processus" value={synthese.id_revue_processus}></input>
                                                    <input className="form-control col-12 mt-4" type="hidden" name="type_demande" value={current.type_demande}></input>
                                                </div>
                                            </div>
                                    </td>
                                ))
                            }
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* <div className="modal fade" id="commentaire" >
                <div className="modal-dialog modal-md modal-dialog-right ">
                    <div className={"modal-content bg-dark"}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel" style={{color:"white"}}>Commentaire pour : {currentRevue.sujet}</h5>
                        </div>
                        <form onSubmit={handleSaveComment}>
                            <div className="row mb-4">
                                <div className="col-8 mx-3" style={{color:"white"}}>
                                    <textarea className="form-control col-12 mt-4" type="text" name="commentaire" placeholder="Nouveau commentaire" ref={commentaire}></textarea>
                                    <input className="form-control col-12 mt-4" type="hidden" name="id_plan" value={currentRevue.id}></input>
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
            </div> */}
        </div>

        
    );
}
export default PerformanceSynthese;