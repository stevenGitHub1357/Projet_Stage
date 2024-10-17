import React, { useEffect, useRef, useState } from "react";
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Legend, LineElement, PointElement,} from 'chart.js';
import { Bar, Line } from "react-chartjs-2";
import faker from "faker";
import { OverlayTrigger,Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Global_url from "../../global_url";
import axios from "axios";
import { TitlePage } from "../templates/templates";
import { Danger, Success, Warning } from "../service/service-alert";
import { Cookies, useCookies } from "react-cookie";
import { getAllByAltText } from "@testing-library/react";
var Url = Global_url
// import "./homeStyle.scss"
// ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,BarElement,Title,Tooltip,Legend);

const Revue = ({MenuCollapse,theme,logo})=>{

    const dispatch = useDispatch()
    const [cookies,setCookie,removeCookie] = useCookies(['id_user','id_processus'])
    let [listData,setListeData] = useState([])
    let [listCommentaire, setListCommentaire] = useState([])
    let [currentRevue, setCurrentRevue] = useState([])
    const sujet = useRef();
    const ticket = useRef();
    const action = useRef();
    const pdca = useRef();
    const commentaire = useRef();
    const sujetModif = useRef();
    const [idSujetModif, setIdSujetModif] = useState();
    const [valideTicket,setValideTicket] = useState(false)

    const colonneTable = [
        {id:1, nom:"Sujet"},
        {id:2, nom:"Action"},
        {id:3, nom:"Commentaire"},
        {id:4, nom:"PDCA"},
    ]

    const datas = [
        {id:1, sujet:"sujet1", action:"action1", commentaire:"commentaire1",pdca:"A"},
        {id:2, sujet:"sujet1", action:"action1", commentaire:"commentaire1",pdca:"A"},
        {id:3, sujet:"sujet1", action:"action1", commentaire:"commentaire1",pdca:"A"},
    ]

    const [data, setData] = useState(datas);
    const [revueProcessus, setRevuProcessus] = useState(datas);

    useEffect(()=>{
        getData()
    },[])

    async function getData(){
        console.log(cookies.id_processus)
        let revueProcessus = await axios.post(Url+"/getLastRevueProcessusById",{item:cookies.id_processus});
        let planAction = []
        let newData = []
        if(revueProcessus.data.length>0){
            revueProcessus = revueProcessus.data[0]
            planAction = revueProcessus.plan_actions;
            if(planAction.length>0){
                const allTicketId = planAction.map(planAction=>planAction.nb_ticket)
                let allTicket = await axios.post(Url+"/getTicketByManyId",{item:allTicketId});
                allTicket = allTicket.data
                
                planAction.map(planAction => {
                    let ticket = allTicket.filter(ticket=>ticket.id === Number(planAction.nb_ticket));
                    ticket = ticket[0]
                    // console.log(planAction)
                    // console.log(ticket)
                    let theData = {};
                    theData.nb_ticket = planAction.nb_ticket
                    theData.id = planAction.id
                    theData.sujet = planAction.sujet
                    theData.allCommentaire = planAction.plan_action_commentaires
                    // console.log(theData.allCommentaire)
                    if(theData.allCommentaire.length>0) theData.commentaire = theData.allCommentaire[theData.allCommentaire.length-1].commentaire
                    theData.action = ticket.action
                    theData.pdca = ticket.pdca
                    // console.log(theData)
                    newData.push(theData)
                })
                console.log(allTicket)
            }
        }  
        console.log(newData)
        setRevuProcessus(revueProcessus)
        setData(newData) 
    }

    const border = {
        border: !theme ? "": "black 1px solid"
    }


    const handleAddSujet = async (e) => {
        e.preventDefault();
        let item = {};
        console.log("addSujet")
        item.sujet = e.currentTarget.elements.sujet.value
        item.nb_ticket = e.currentTarget.elements.ticket.value
        item.id_revue_processus = revueProcessus.id
        console.log(valideTicket)
        console.log(item)
        if(!valideTicket){
            Warning("Ticket inexistant")
        }
        const dataTicket = data.filter(data=>data.nb_ticket===item.nb_ticket)
        console.log(dataTicket)
        
        if(item.sujet===""){
            Warning("Sujet ne peut pas étre vide")
        }
        else if(dataTicket.length>0){
            Warning("Ticket déja utiliser")
        }else{
            await axios.post(Url+"/insertPlanAction",{item})
            ticket.current.value = ""
            sujet.current.value = ""
            action.current.value = ""
            pdca.current.value = ""
            Success("Nouveau plan d'action ajouter")
        }
        console.log(item)
        getData()
    }

    const GetInfoTicket = async () => {
        console.log("Ticket",ticket.current.value)
        if(ticket.current.value !== ""){
            const infoTicket = await axios.post(Url+"/getTicketById",{item:ticket.current.value});
            console.log(infoTicket)
            if(infoTicket.data.length>0){
                action.current.value = infoTicket.data[0].action
                pdca.current.value = infoTicket.data[0].pdca
                setValideTicket(true)
            }else{
                action.current.value = "Ticket inexistant"
                pdca.current.value = "Ticket inexistant"
                setValideTicket(false)
            }
        }else{
            setValideTicket(false)
            action.current.value = "Action"
            pdca.current.value = "PDCA"
        }
        
    }

    const handleAddCommentaire = async (id) => {
        console.log(id)
        console.log(data)
        let commentaire = data.filter(data => data.id === id);
        setCurrentRevue(commentaire[0])
        commentaire = commentaire[0].allCommentaire
        setListCommentaire(commentaire)
    }

    const handleAddComment = async (e) => {
        e.preventDefault();
        let item = {};
        console.log("addCommenatire")
        item.commentaire = e.currentTarget.elements.commentaire.value
        item.id_plan_action = Number(e.currentTarget.elements.id_plan.value)
        console.log(item)
        if(item.commentaire === ""){
            Warning("Commentaire ne peut pas étre vide")
        }else{
            await axios.post(Url+"/insertPlanActionCommentaire",{item})
            commentaire.current.value = ""
            getData()
        }        
    }

    const handleUpdateSujet = async (id,sujet) => {
        console.log("sujetModif")
        sujetModif.current.value = sujet
        setIdSujetModif(id) 
    }

    const handleSaveNewSujet = async (e) => {
        e.preventDefault();
        const item = {}
        item.id = idSujetModif;
        item.sujet = sujetModif.current.value;
        console.log(item)
        await axios.post(Url+"/updatePlanAction",{item})
        getData()
    }
   
    return(
        <div  className={!MenuCollapse ? "content" : "contentCollapse"}>
                <TitlePage title="Revue du plan d'action" process={true} listProcess={false} theme={theme}/>
                <form onSubmit={handleAddSujet}>
                    <div className="row mb-4">
                        
                        <div className="col-2 mx-2">
                            <label style={{textAlign :"center"}}><strong>Ticket :</strong></label>
                            <input className="form-control col-12" type="text" name="ticket" placeholder="N.Ticket" onChange={()=>GetInfoTicket(ticket)} ref={ticket}></input>
                        </div>
                        <div className="col-3 mx-2">
                            <label style={{textAlign :"center"}}><strong>Sujet :</strong></label>
                            <textarea className="form-control col-12" type="text" name="sujet" placeholder="Sujet" ref={sujet}></textarea>
                        </div>
                        <div className="col-3 mx-2">
                            <label style={{textAlign :"center"}}><strong>Action :</strong></label>
                            <textarea className="form-control col-12" style={{backgroundColor:"lightgray"}} type="text" name="action" placeholder="Action" ref={action} readOnly></textarea>
                        </div>
                        <div className="col-2 mx-2">
                            <label style={{textAlign :"center"}}><strong>PDCA :</strong></label>
                            <input className="form-control col-12" style={{backgroundColor:"lightgray"}} type="text" name="pdca" placeholder="PDCA" ref={pdca} readOnly></input>
                        </div>
                        
                                <div className="col-1 mx-2 mt-4">
                                    <button className="btn btn-success rounded-1 shadow" type="submit" >Ajouter</button>
                                </div>
                           
                    </div>
                </form>
                <table className="table table-bordered text-center" style={border} id="table_user">
                    <thead className="text-success">
                        <tr key={0}>
                            {
                                colonneTable.map((col, index) => (
                                    <th key={index} style={{backgroundColor:"lightgray"}}>
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
                                    <tr key={index}>
                                        <td>{data.sujet}</td>
                                        <td>{data.action}</td>
                                        <td>{data.commentaire}</td>
                                        <td>{data.pdca}</td>
                                        <td>
                                            <div className="row">
                                                <div className="col-3 mx-1">
                                                <OverlayTrigger placement="top" overlay={<Tooltip>Modifier commentaire</Tooltip>}>
                                                    <button className="btn btn-secondary rounded-3 shadow" onClick={()=>handleAddCommentaire(data.id)} 
                                                    data-bs-target="#commentaire" data-bs-toggle="modal">
                                                        <i class="bi bi-chat-left-text"></i>
                                                    </button>
                                                </OverlayTrigger>
                                                </div>
                                                <div className="col-3 mx-1">
                                                <OverlayTrigger placement="top" overlay={<Tooltip>Modifier sujet</Tooltip>}>
                                                    <button className="btn btn-warning rounded-3 shadow" onClick={()=>handleUpdateSujet(data.id, data.sujet)} 
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
            <>
            <div className="modal fade" id="commentaire" >
                <div className="modal-dialog modal-md modal-dialog-right ">
                    <div className={"modal-content bg-dark"}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel" style={{color:"white"}}>Sujet : {currentRevue.sujet}</h5>
                        </div>
                        <form onSubmit={handleAddComment}>
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
            </div>
            <div className="modal fade" id="sujet" >
                <div className="modal-dialog modal-md modal-dialog-right ">
                    <div className={"modal-content bg-dark"}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel" style={{color:"white"}}>Modification de sujet</h5>
                        </div>
                        
                        <div className="modal-body">
                            <form onSubmit={handleSaveNewSujet}>
                                <div className="row mb-4">
                                    <div className="col-8 mx-3" style={{color:"white"}}>
                                        <textarea className="form-control col-12 mt-4" type="text" name="sujet" placeholder="modification de sujet" ref={sujetModif}></textarea>
                                        <input className="form-control col-12 mt-4" type="hidden" name="id_plan" value={currentRevue.id}></input>
                                    </div>
                                    
                                    <div className="col-1 mx-2 mt-4">
                                        <button className="btn btn-success rounded-1 shadow" type="submit" data-bs-dismiss="modal">Modifier</button>
                                    </div> 
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </>
        </div>

        
    );
}
export default Revue;