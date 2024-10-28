import React, { useEffect, useRef, useState } from "react";
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend, LineElement, PointElement,} from 'chart.js';
import { Bar, Line } from "react-chartjs-2";
import faker from "faker";
import { useDispatch, useSelector } from "react-redux";
import Global_url from "../../global_url";
import { TitlePage } from "../templates/templates";
import axios from "axios";
import { addPlanAction, deletePlanAction, setPlanActionData } from "../feature/revueDirection.slice";
var Url = Global_url
// import "./homeStyle.scss"
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,BarElement,Title,Tooltip,Legend);

const Plan = ({MenuCollapse,theme,logo,cible})=>{

    const dispatch = useDispatch()
    let [listData,setListData] = useState([])
    let [annee,setAnnee] = useState(2023)
    const[afterAddDelete,setAfterAddDelete] = useState(false)
    const [currentPlan, setCurrentPlan] = useState(-1)
    const indexItem = useRef();
    const ticket = useRef();
    const sujet = useRef();
    const action = useRef();
    const pilote = useRef();
    const pdca = useRef();
    const commentaire = useRef();
    const verification = useRef();
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
    },[])

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
        return allData
    }

    const handleSaveAll = async () => {
        const data = getData()
        console.log("saveAll")
        console.log(data)
        let item = id_processus;
        console.log(item)
        try {
            let newRevue = await axios.post(Url+"/createRevueProcessus",{item})
            newRevue = newRevue.data
            item = data;
            console.log(newRevue)
            await axios.post(Url+"/insertManyPlanAction",{newRevue,item});
            setPlanActionData([{}])
        } catch (error) {
            console.log(error)
        }
        
        
    }
    const border = {
        border: !theme ? "": "black 1px solid"
    }
   
    return(
        <div  className={!MenuCollapse ? "content" : "contentCollapse"}>
            <TitlePage title={"Plan d’action suivant"} process={true} listProcess={false}  theme={theme} revueDirection={true}/>
                <table className="table table-bordered text-center" style={border} id="table_user">
                    <thead className="text-success ">
                        <tr>
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
                        data.length>0 ?
                        <tbody className={!theme ? "text-dark" : "text-white"}>
                            { 
                                data.map((item,index)=>(

                                        currentPlan !== index  ? (
                                        <tr>
                                            <td><textarea className="form-control" type="text" name="sujet" value={item.sujet} onClick={() => handleGetCurrentPlan(index)}></textarea></td>
                                            <td><input className="form-control" type="text" name="ticket" value={item.ticket} onClick={() => handleGetCurrentPlan(index)}></input></td>
                                            <td><textarea className="form-control" type="text" name="action" value={item.action} style={{backgroundColor:"lightgray"}} readOnly></textarea></td>
                                            <td><input className="form-control" type="text" name="pilote" value={item.pilote} style={{backgroundColor:"lightgray"}} readOnly></input></td>
                                            <td><input className="form-control" type="text" name="pdca" value={item.pdca} style={{backgroundColor:"lightgray"}} readOnly></input></td>
                                            <td><textarea className="form-control" type="text" name="commentaire" value={item.commentaire} onClick={() => handleGetCurrentPlan(index)}></textarea></td>
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
                                            <td><textarea className="form-control" type="text" name="sujet" ref={sujet}></textarea></td>
                                            <td><input className="form-control" type="text" name="ticket" onChange={() => getInfoTicket()} ref={ticket}></input></td>
                                            <td><textarea className="form-control" type="text" name="action" style={{backgroundColor:"lightgray"}} readOnly ref={action}></textarea></td>
                                            <td><input className="form-control" type="text" name="pilote" ref={pilote} style={{backgroundColor:"lightgray"}} readOnly></input></td>
                                            <td><input className="form-control" type="text" name="pdca" style={{backgroundColor:"lightgray"}} readOnly ref={pdca}></input></td>
                                            <td><textarea className="form-control" type="text" name="commentaire" ref={commentaire}></textarea></td>
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
                
                <button className="btn btn-success rounded-3 shadow" onClick={handleSaveAll}>
                    Cloturé et crée une nouvelle revue de direction
                </button>  
        </div>

        
    );
}
export default Plan;