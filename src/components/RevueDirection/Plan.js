import React, { useEffect, useRef, useState } from "react";
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend, LineElement, PointElement,} from 'chart.js';
import { Bar, Line } from "react-chartjs-2";
import faker from "faker";
import { useDispatch, useSelector } from "react-redux";
import Global_url from "../../global_url";
import { TitlePage } from "../templates/templates";
import axios from "axios";
import { addPlanAction, deletePlanAction, setPlanActionData } from "../feature/revueDirection.slice";
import { Confirmation, Success, Warning } from "../service/service-alert";
import { Cookies, useCookies } from "react-cookie";
var Url = Global_url
// import "./homeStyle.scss"
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,BarElement,Title,Tooltip,Legend);

const Plan = ({MenuCollapse,theme,logo,cible})=>{

    const dispatch = useDispatch()
    let [listData,setListData] = useState([])
    let [annee,setAnnee] = useState(2023)
    const[afterAddDelete,setAfterAddDelete] = useState(false)
    const [currentPlan, setCurrentPlan] = useState(-1)
    const [cookies,setCookie,removeCookie] = useCookies(['id_user','id_processus','id_revue_direction', 'type_demande', 'id_revue_processus','statut_revue','id_role'])
    const indexItem = useRef();
    const ticket = useRef();
    const sujet = useRef();
    const action = useRef();
    const pilote = useRef();
    const pdca = useRef();
    const commentaire = useRef();
    const verification = useRef();
    const [planning, setPlanning] = useState([])
    const id_planning = useRef();
    const [statut, setStatut] = useState("Q");
    const id_revue_processus = 1
    const id_processus = 2

    const colonneTable = [
        {id:1, nom:"Sujet"},
        {id:2, nom:"N.Ticket"},
        {id:3, nom:"Action"},
        {id:4, nom:"Pilote"},
        {id:5, nom:"PDCA"},
        {id:6, nom:"Commentaire"},
    ]

    const data = useSelector((state) => state.planAction.planAction)

    useEffect(()=>{
        getData()
        getPlanning()
        
    },[cookies.id_planning,cookies.id_revue_processus])

    const handleAddLine = () =>{
        getData(true,-1)
        setAfterAddDelete(true)
    }
    const handleDeleteLine = (index) =>{
        getData(true,index)
        setAfterAddDelete(true)
    }
    const handleGetCurrentPlan = (index) => {
        console.log("index current :"+index)
            getData(true,-2)
            setCurrentPlan(Number(index))
            setAfterAddDelete(false)
        
        
    }
    const getInfoTicket = async () => {
        console.log("Ticket",ticket.current.value)
        console.log(Number(ticket.current.value))
        if(ticket.current.value !== ""){
            const intTicket = Number(ticket.current.value)
            const infoTicket = await axios.post(Url+"/getTicketById",{item:intTicket});
            console.log(infoTicket)
            if(infoTicket.data.length>0){
                action.current.value = infoTicket.data[0].action
                pdca.current.value = infoTicket.data[0].pdca
                pilote.current.value = infoTicket.data[0].pilote
            }else{
                action.current.value = ""
                pdca.current.value = ""
                pilote.current.value = ""
            }
        }else{
            action.current.value = ""
            pdca.current.value = ""
            pilote.current.value = ""
        }

        
    }
    const getPlanning = async () => {
        let planningList = await axios.get(Url+"/getPlanningNotCloturer")
        setPlanning(planningList.data)
        console.log(planningList.data)
    }
    const getData = (dispatcher, index) =>{
        console.log("updateListe")
        const allData = []
        const tbody = document.querySelector('tbody');
        const trs = tbody.querySelectorAll('tr');
        // console.log(index)
        for(let tr of trs){
            let param = {};
            const tds = tr.querySelectorAll('td');
            tds.forEach(td => {
                const inputs = td.querySelectorAll('input');
                const selects = td.querySelectorAll('select');
                const textareas = td.querySelectorAll('textarea');
                textareas.forEach(textarea => {
                    if(textarea.name === 'sujet') param.sujet = textarea.value
                    if(textarea.name === 'action') param.action = textarea.value
                    if(textarea.name === 'commentaire') param.commentaire = textarea.value
                })
                inputs.forEach(input => {
                    if(input.name === 'ticket') param.ticket = input.value
                    if(input.name === 'pdca') param.pdca = input.value
                    if(input.name === 'index') param.index = input.value
                    if(input.name === 'pilote') param.pilote = input.value
                })
            });
            param.verif = true 
            param.erreur = ""
            
            if(param.ticket==="") param.erreur = param.erreur+"/tr - N.ticket ne peut pas etre vide"
            if(param.action==="Ticket inexistant") param.erreur = param.erreur+"/tr - N.ticket inexistant"
            if(param.sujet==="") param.erreur = param.erreur+"/tr - Sujet ne peut pas etre vide"
            if(param.commentaire==="") param.erreur = param.erreur+"/tr - Commentaire ne peut pas etre vide"
            const verif = allData.filter(data=> data.ticket === param.ticket)
            if(verif.length>0) param.erreur = param.erreur+"/tr - Ticket déja utiliser"

            param.id_revue_processus = id_revue_processus+1;                

            if(Number(index) !== Number(param.index)){
                allData.push(param)
            }
            
            
        }
        if(index===-1){
            allData.push({})
        }
        setCurrentPlan(-1)
        console.log("dernier")
        if(dispatcher === true) dispatch(setPlanActionData(allData))

            setStatut(cookies.statut_revue)
            console.log(cookies.statut_revue)
        return allData
    }

    const handleSaveAll = async () => {
        const data = getData()
        console.log("saveAll")
        console.log(data)
        let item = {}
        item.id_processus = cookies.id_processus;
        item.id_planning = Number(id_planning.current.value)
        console.log(item)
        try {
            let newRevue = await axios.post(Url+"/createRevueProcessus",{item})
            newRevue = newRevue.data
            item = data;
            console.log(newRevue)
            await axios.post(Url+"/insertManyPlanAction",{newRevue,item});
            dispatch(setPlanActionData([{sujet : "", ticket:"", commentaire:""}]))
        } catch (error) {
            console.log(error)
        }
    }
    const handleSaveAllController = async () => {
        console.log(id_planning.current.value)
        if(id_planning.current.value === "0"){
            console.log("warning")
            Warning("Veuiller choisir un planning")
        } else{
            handleSaveAll()
            let item = {}
            item.id = cookies.id_revue_processus
            item.statut = "A"
            console.log(item)
            axios.post(Url+"/updateRevueProcessus",{item});
            setStatut("A")
        }
    }
    const handleReactiveRevue = async () => {
        
        Confirmation(theme, "Reactiver cette revue de direction !", "Valider").then(
            (result) => {
                if (result.isConfirmed) {
                    let item = {}
                    item.id = cookies.id_revue_processus
                    item.statut = "R"
                    console.log(item)
                    axios.post(Url+"/updateRevueProcessus",{item});
                    setStatut("R")
                }   
            }
        );
    }

    const handleDesactiveRevue = async () => {
        
        Confirmation(theme, "Desactiver cette revue de direction !", "Valider").then(
            (result) => {
                if (result.isConfirmed) {
                    let item = {}
                    item.id = cookies.id_revue_processus
                    item.statut = "A"
                    console.log(item)
                    axios.post(Url+"/updateRevueProcessus",{item});
                    setStatut("A")
                }   
            }
        );
    }

    
    const border = {
        border: !theme ? "": "black 1px solid"
    }

    // console.log(cookies.statut_revue)
   
    return(
        <div  className={!MenuCollapse ? "content" : "contentCollapse"}>
            <TitlePage title={"Nouveau plan d’action"} process={true} listProcess={false}  theme={theme} revueDirection={true}/>
                <table className="table table-bordered text-center" style={border} id="plan">
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
                                data.map((item,index)=>(

                                        currentPlan !== index  ? (
                                        <tr>
                                            <td className="col-3"><textarea className="form-control" type="text" name="sujet" value={item.sujet} onClick={() => handleGetCurrentPlan(index)}></textarea></td>
                                            <td><input className="form-control" type="text" name="ticket" value={item.ticket} onClick={() => handleGetCurrentPlan(index)}></input></td>
                                            <td className="col-3"><textarea className="form-control" type="text" name="action" value={item.action} style={{backgroundColor:"lightgray"}} readOnly></textarea></td>
                                            <td><input className="form-control" type="text" name="pilote" value={item.pilote} style={{backgroundColor:"lightgray"}} readOnly></input></td>
                                            <td><input className="form-control" type="text" name="pdca" value={item.pdca} style={{backgroundColor:"lightgray"}} readOnly></input></td>
                                            <td className="col-3"><textarea className="form-control" type="text" name="commentaire" value={item.commentaire} onClick={() => handleGetCurrentPlan(index)}></textarea></td>
                                            <td>
                                                <input className="form-control" type="hidden" name="index" value={index}></input>
                                                <button className="btn btn-dark rounded-3 shadow" onClick={() => handleDeleteLine(index)}>    
                                                    <i class="bi bi-dash-square"></i>
                                                </button>  
                                                {
                                                    index+1 === data.length ?
                                                        
                                                        <button className="btn btn-secondary rounded-3 shadow" onClick={handleAddLine}>
                                                            <i class="bi bi-plus-square"></i>
                                                        </button> 
                                                    :
                                                        <></>
                                                }
                                            </td>
                                        </tr>
                                        
                                        ):(
                                        <tr>
                                            <td className="col-3"><textarea className="form-control" type="text" name="sujet" ref={sujet}></textarea></td>
                                            <td><input className="form-control" type="text" name="ticket" onChange={() => getInfoTicket()} ref={ticket}></input></td>
                                            <td className="col-3"><textarea className="form-control" type="text" name="action" style={{backgroundColor:"lightgray"}} readOnly ref={action}></textarea></td>
                                            <td><input className="form-control" type="text" name="pilote" ref={pilote} style={{backgroundColor:"lightgray"}} readOnly></input></td>
                                            <td><input className="form-control" type="text" name="pdca" style={{backgroundColor:"lightgray"}} readOnly ref={pdca}></input></td>
                                            <td className="col-3"><textarea className="form-control" type="text" name="commentaire" ref={commentaire}></textarea></td>
                                            <td>
                                                <input className="form-control" type="hidden" name="index" ref={indexItem}></input>
                                                <button className="btn btn-dark rounded-3 shadow" onClick={() => handleDeleteLine(index)}>    
                                                    <i class="bi bi-dash-square"></i>
                                                </button>  
                                                {
                                                    index+1 === data.length ?
                                                        
                                                        <button className="btn btn-secondary rounded-3 shadow" onClick={handleAddLine}>
                                                            <i class="bi bi-plus-square"></i>
                                                        </button> 
                                                    :
                                                        <></>
                                                }
                                            </td>
                                        </tr>
                                        
                                        )
                                    
                                ))

                            
                            }
                        </tbody>
                        :<></>
                    }
                </table>
                
                {
                    cookies.id_role<=2 ?(
                    statut === "A" ?
                    <button className="btn btn-warning rounded-3 shadow mx-2" onClick={handleReactiveRevue}>
                        Reactivé
                    </button>  
                    :
                    statut === "R" ? 
                    <button className="btn btn-secondary rounded-3  mx-2"  onClick={handleDesactiveRevue}>
                        Desactiver
                    </button>
                    :
                    <button className="btn btn-success rounded-3  mx-2" 
                        data-bs-target="#planning" data-bs-toggle="modal">
                        Cloturé
                    </button> 
                    ):<></>
                } 

                <div className="modal fade" id="planning" data-backdrop="static" data-keyboard="false">
                    <div className="modal-dialog modal-md modal-dialog-right ">
                        <div className={"modal-content"}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Cloturer cette revue de direction et crée un nouveau pour le planning : </h5>
                            </div>
                            <div className="modal-body">
                                <select className={ !theme ? "form-control mb-2" : "form-control mb-2 darkMode border-dark text-white"} placeholder="Role" ref={id_planning}>
                                    <option value={0}>
                                        Planning...
                                    </option>
                                    {
                                    planning.map((itemC,index)=>
                                        <option key={index} value={itemC.id}>{itemC.titre}</option>
                                    )
                                }
                                </select>
                                <button className="btn btn-success rounded-3  mx-2" onClick={handleSaveAllController}  data-bs-dismiss="modal">
                                    Cloturé
                                </button> 
                            </div>
                        </div>
                    </div>
                </div>
        </div>

        
    );
}
export default Plan;