import React, { useEffect, useRef, useState } from "react";
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend, LineElement, PointElement,} from 'chart.js';
import { Bar, Line } from "react-chartjs-2";
import faker from "faker";
import { useDispatch, useSelector } from "react-redux";
import Global_url from "../../global_url";
import { TitlePage } from "../templates/templates";
import axios from "axios";
import { addPlanActionRevue, deletePlanActionRevue, setPlanActionRevueData } from "../feature/revueDirection.slice";
import { useCookies } from "react-cookie";
import { Warning,Success, Confirmation } from "../service/service-alert";
var Url = Global_url
// import "./homeStyle.scss"
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,BarElement,Title,Tooltip,Legend);

const Revue = ({MenuCollapse,theme,logo,cible})=>{

    const dispatch = useDispatch()
    let [listData,setListData] = useState([])
    let [annee,setAnnee] = useState(2023)
    const[afterAddDelete,setAfterAddDelete] = useState(false)
    const [cookies,setCookie,removeCookie] = useCookies(['id_user','id_processus','id_revue_processus','id_processus_efficacite','id_processus','statut_revue', 'id_planning'])
    const [currentPlan, setCurrentPlan] = useState(-1)
    const [currentPlanId, setCurrentPlanId] = useState(-1)
    const [insert, setInsert] = useState(true)
    const [inUpdate, setInUpdate] = useState(false)
    const indexItem = useRef();
    const ticket = useRef();
    const sujet = useRef();
    const action = useRef();
    const pilote = useRef();
    const pdca = useRef();
    const commentaire = useRef();
    const verification = useRef();
    const idCurrent = useRef();
    const id_revue_processus = cookies.id_revue_processus
    const id_processus = cookies.id_processus
    const [planActionInitData, setPlanActionInitData] = useState();
    const [tauxAtteint, setTauxAtteint] = useState(0);
    const [statut, setStatut] = useState("Q");

    const colonneTable = [
        {id:1, nom:"Sujet"},
        {id:2, nom:"N.Ticket"},
        {id:3, nom:"Action"},
        {id:4, nom:"Pilote"},
        {id:5, nom:"PDCA"},
        {id:6, nom:"Commentaire"},
    ]

    const data = useSelector((state) => state.planActionRevue.planActionRevue)

    // console.log(data)
    useEffect(()=>{
        getData()
        setInUpdate(false)
    },[cookies.id_planning,cookies.id_revue_processus])

    const handleAddLine = () =>{
        if(data.length !== planActionInitData.length){
            console.log("noooot")
            Warning("Plan d'action ne peut pas etre vide");
        }else{
            dispatch(addPlanActionRevue({}))
        }
        setAfterAddDelete(true)
    }
    const handleDeleteLine = async (id) =>{
        const item = id
        if(id!==undefined){
            console.log("delete"+item)
            await axios.post(Url+"/desactivePlanAction",{item})
        }
        // getDataFromFront(true,index)
        setAfterAddDelete(true)
        getData()
    }
    const handleGetCurrentPlan = (index, id) => {
        console.log("index current :"+index+" "+id)
        setCurrentPlan(-1)
        setCurrentPlanId(-1)
        // getDataFromFront(true,-2)
        if(statut !== "A" && cookies.id_role<=4){
            setCurrentPlan(Number(index))
            setCurrentPlanId(Number(id))
            setAfterAddDelete(false)
            setInsert(true)
        }
    }
    const getUpdatePlan = async () => {
        console.log("Update Insert")
        if(ticket.current.value !== ""){
            const intTicket = Number(ticket.current.value)
            const infoTicket = await axios.post(Url+"/getTicketById",{item:intTicket});
            // console.log(infoTicket)
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
        // console.log(data)
        console.log(currentPlanId)
        let current = data.filter(data=> data.id === Number(currentPlanId))
        
        let item = {}
        item.sujet = sujet.current.value
        item.nb_ticket = ticket.current.value
        item.id_revue_processus = id_revue_processus
        item.commentaire = commentaire.current.value
        if(current.length<=0 && insert === true){
            item = await axios.post(Url+"/insertPlanAction",{item})
            item = item.data
            console.log("insert ",item)
            setCurrentPlanId(item.id)
            setInsert(false)
            getData()
        }else{
            current=current[0]
            console.log(current)
            item.id = current.id
            item = await axios.post(Url+"/updatePlanAction",{item})
            console.log('update',item)
            getData()
        }
        
        setInUpdate(true)
        
    }
    async function getData(){
        console.log(cookies.id_processus)
        setStatut(cookies.statut_revue)
        console.log(cookies.statut_revue)
        const item = {}
        item.id_processus = cookies.id_processus;
        item.id_revue_processus = id_revue_processus;
        let revueProcessus = await axios.post(Url+"/getPlanActionByRevueProcessus",{item});
        let planAction = []
        let newData = []
        // console.log(revueProcessus)
        if(revueProcessus.data.length>0){
            revueProcessus = revueProcessus.data[0]
            planAction = revueProcessus.plan_actions;
            // console.log(planAction)
            if(planAction.length>0){
                const allTicketId = planAction.filter(planAction=>planAction.nb_ticket !== "").map(planAction=>planAction.nb_ticket)
                // console.log(allTicketId)
                let allTicket = []
                if(allTicketId.length>0){
                    allTicket = await axios.post(Url+"/getTicketByManyId",{item:allTicketId});
                    allTicket = allTicket.data
                }
                    
                    planAction.filter(planAction=>planAction.activate!==0).map(planAction => {
                        let ticket = allTicket.filter(ticket=>ticket.id === Number(planAction.nb_ticket));
                        ticket = ticket[0]
                        // console.log(planAction)
                        // console.log(ticket)
                        let theData = {};
                        theData.nb_ticket = planAction.nb_ticket
                        theData.id = planAction.id
                        theData.sujet = planAction.sujet
                        theData.allCommentaire = planAction.plan_action_commentaires
                        theData.commentaire = planAction.commentaire
                        theData.activate = planAction.activate
                        // console.log(theData.allCommentaire)
                        // if(theData.allCommentaire.length>0) theData.commentaire = theData.allCommentaire[theData.allCommentaire.length-1].commentaire
                        // console.log(ticket)
                        if(ticket !== undefined){
                            theData.action = ticket.action
                            theData.pdca = ticket.pdca
                            theData.pilote = ticket.pilote
                        }else   {
                            theData.action = ""
                            theData.pdca = ""
                            theData.pilote = ""
                        }
                        // console.log(theData)
                        newData.push(theData)
                    })
            }else{

            }
                // console.log(newData)
            
        }  
        newData = newData.sort((a, b) => a.id - b.id)
        console.log(newData)
        if(newData.length===0){
            let theData = {};
            theData.nb_ticket = ""
            theData.id = ""
            theData.sujet = ""
            theData.commentaire = ""
            theData.activate = ""
            theData.action = ""
            theData.pilote = ""
            theData.pdca = ""
            newData.push(theData)
        }
        console.log(newData)
        let atteint = newData.filter(data=>data.pdca === "A")
        atteint = atteint.length;
        let total = newData.length;
        const taux = (atteint*100)/total
        setTauxAtteint(taux.toFixed(2))

        dispatch(setPlanActionRevueData(newData))
        setPlanActionInitData(newData)
        if(!inUpdate){
            setCurrentPlan(-1)
            setCurrentPlanId(-1)
        }
        
        return newData 
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
                    setCookie('statut_revue',"R")
                }   
            }
        );
        
        setCurrentPlan(-1)
        setCurrentPlanId(-1)
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
                    setCookie('statut_revue',"A")
                }   
            }
        );
        setCurrentPlan(-1)
        setCurrentPlanId(-1)
    }
    const border = {
        border: !theme ? "": "black 1px solid"
    }
   
    return(
        <div  className={!MenuCollapse ? "content" : "contentCollapse"}>
            <TitlePage title="Revue du plan d'action" process={true} listProcess={false} theme={theme} revueDirection={true}/>
                
                <div className="text-center"><h3>Taux d'atteinte : {tauxAtteint}%</h3></div>
                <div className="row mb-3">
                    <div className="col-5"></div>
                {
                    cookies.id_role<=2 ? (
                    statut === "A" ?
                    <button className="btn btn-warning rounded-3 shadow mx-2 col-2" onClick={handleReactiveRevue}>
                        Reactivé
                    </button>  
                    :
                    statut === "R" ? 
                    <button className="btn btn-secondary rounded-3  mx-2 col-2"  onClick={handleDesactiveRevue}>
                        Desactiver
                    </button>
                    :
                    <></>
                    ):<></>
                } 
                </div>
                <table className="table table-bordered text-center" style={border} id="table_user">
                    <thead className="text-success">
                        <tr>
                            {
                                colonneTable.map((col, index) => (
                                    <th style={{backgroundColor:"lightgray"}} >
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
                                            <td className="col-4"><textarea className="form-control" type="text" name="sujet" value={item.sujet} onClick={() => handleGetCurrentPlan(index,item.id)} readOnly></textarea></td>
                                            <td><input className="form-control" type="text" name="ticket" value={item.nb_ticket} onClick={() => handleGetCurrentPlan(index,item.id)} readOnly></input></td>
                                            <td className="col-3"><textarea className="form-control" type="text" name="action" value={item.action} style={{backgroundColor:"lightgray"}} readOnly></textarea></td>
                                            <td className="col-2"><input className="form-control" type="text" name="pilote" value={item.pilote} style={{backgroundColor:"lightgray"}} readOnly></input></td>
                                            <td><input className="form-control" type="text" name="pdca" value={item.pdca} style={{backgroundColor:"lightgray"}} readOnly></input></td>
                                            <td className="col-4"><textarea className="form-control" type="text" value={item.commentaire} onClick={() => handleGetCurrentPlan(index,item.id)} readOnly></textarea></td>
                                            <td>
                                                <input className="form-control" type="hidden" name="index" value={index}></input>
                                                <button className="btn btn-dark rounded-3 shadow" onClick={() => handleDeleteLine(item.id)}>    
                                                    <i className="bi bi-dash-square"></i>
                                                </button>  
                                                {
                                                    index+1 === data.length ?
                                                        
                                                        <button className="btn btn-secondary rounded-3 shadow" onClick={handleAddLine}>
                                                            <i className="bi bi-plus-square"></i>
                                                        </button> 
                                                    :
                                                        <></>
                                                }
                                            </td>
                                        </tr>
                                        
                                        ):(
                                        <tr>
                                            <td className="col-4"><textarea className="form-control" type="text" name="sujet" ref={sujet} onChange={() => getUpdatePlan()}></textarea></td>
                                            <td><input className="form-control" type="text" name="ticket" onChange={() => getUpdatePlan()} ref={ticket}></input></td>
                                            <td className="col-3"><textarea className="form-control" type="text" name="action" style={{backgroundColor:"lightgray"}} readOnly ref={action}></textarea></td>
                                            <td className="col-2"><input className="form-control" type="text" name="pilote" ref={pilote} style={{backgroundColor:"lightgray"}} readOnly></input></td>
                                            <td><input className="form-control" type="text" name="pdca" style={{backgroundColor:"lightgray"}} readOnly ref={pdca}></input></td>
                                            <td className="col-4"><textarea className="form-control" type="text" name="commentaire" ref={commentaire} onChange={() => getUpdatePlan()}></textarea></td>
                                            <td>
                                                <button className="btn btn-dark rounded-3 shadow" onClick={() => handleDeleteLine(item.id)}>    
                                                    <i className="bi bi-dash-square"></i>
                                                </button>  
                                                {
                                                    index+1 === data.length ?
                                                        
                                                        <button className="btn btn-secondary rounded-3 shadow" onClick={handleAddLine}>
                                                            <i className="bi bi-plus-square"></i>
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
        </div>

        
    );
}
export default Revue;