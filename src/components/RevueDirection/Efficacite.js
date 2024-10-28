import React, { useEffect, useRef, useState } from "react";
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend, LineElement, PointElement,} from 'chart.js';
import { Bar, Line } from "react-chartjs-2";
import faker from "faker";
import { useDispatch, useSelector } from "react-redux";
import Global_url from "../../global_url";
import { TitlePage } from "../templates/templates";
import axios from "axios";
import { useCookies } from "react-cookie";
var Url = Global_url
// import "./homeStyle.scss"
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,BarElement,Title,Tooltip,Legend);

const Efficacite = ({MenuCollapse,theme,logo,cible})=>{

    const dispatch = useDispatch()
    let [listData,setListeData] = useState([])
    const [risque, setRisque] = useState([])
    const [opportunite, setOpportunite] = useState([])
    const [enjeux, setEnjeux] = useState([])
    const [cookies,setCookie,removeCookie] = useCookies(['id_user','id_processus','id_revue_processus','id_processus_efficacite','id_processus'])
    const [currentType, setCurrentType] = useState(0)
    const [currentTicket, setCurrentTicket] = useState(0)
    const [currentEff, setCurrentEff] = useState({})
    const commentaire = useRef("-")
    const id_revue_processus = cookies.id_revue_processus
    const id_processus_efficacite = cookies.id_processus_efficacite
    const id_processus = cookies.id_processus
    const [listEfficacite, setListEfficacite] = useState([])
    const [insert, setInsert] = useState(false)
    
    const titre = [
        {id:1, nom:"RISQUE"},
        {id:2, nom:"ENJEUX"}, 
        {id:3, nom:"OPPORTUNITES"}
    ]

    const colonneTable = [
        {id:2, nom:"Action"},
        {id:3, nom:"Pilote"},
        {id:4, nom:"Commentaire"},
        {id:5, nom:"PDCA"},
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
    },[cookies.id_revue_processus])

    async function getData(){
        console.log(id_revue_processus)
        let item = id_revue_processus
        console.log(item)
        let effi = []
        await axios.post(Url+"/getEfficaciteByRevue",{item}).then(res=>{
            if(res.data.length){
                setListEfficacite(res.data)
                effi = res.data
            }
        })
        console.log(effi)
        console.log(id_processus)
        item = id_processus_efficacite+""
            let listOppo = await axios.post(Url+"/getOpportuniterByProcessus",{item});
            listOppo = listOppo.data
            const allOppo = []
            
            console.log(listOppo)
            listOppo.map(item => {
                const newItem = {}
                newItem.sujet = item.lib_oppo;
                newItem.action = item.action;
                newItem.pdca = item.avancement;
                newItem.pilote = item.pilote;
                newItem.num_ticket = item.num_ticket;
                newItem.id_ticket = item.id+"";
                newItem.id = 0
                let eff = effi.filter(effi => effi.id_ticket===newItem.id_ticket && effi.id_revue_processus===id_revue_processus && effi.types===3)
                if(eff.length>0){
                    console.log(eff)
                    eff = eff[0]
                    newItem.id = eff.id;
                    newItem.commentaire = eff.commentaire
                    newItem.ticket = eff.ticket
                    
                }
                allOppo.push(newItem)
            })

            let listEnjeux = await axios.post(Url+"/getEnjeuxByProcessus",{item});
            listEnjeux = listEnjeux.data
            const allEnjeux = []
            
            console.log(listEnjeux)
            listEnjeux.map(item => {
                const newItem = {}
                newItem.sujet = item.lib_enjeux;
                newItem.action = item.action;
                newItem.pdca = item.avancement;
                newItem.pilote = item.pilote;
                newItem.num_ticket = item.num_ticket;
                newItem.id_ticket = item.id+"";
                newItem.id = 0
                let eff = effi.filter(effi => effi.id_ticket===newItem.id_ticket && effi.id_revue_processus===id_revue_processus && effi.types===2)
                if(eff.length>0){
                    console.log(eff)
                    eff = eff[0]
                    newItem.id = eff.id;
                    newItem.commentaire = eff.commentaire
                    newItem.ticket = eff.ticket
                    
                }
                allEnjeux.push(newItem)
            })

            let listRisque = await axios.post(Url+"/getRisqueByProcessus",{item});
            listRisque = listRisque.data
            const allRisque = []
            
            console.log(listRisque)
            listRisque.map(item => {
                const newItem = {}
                newItem.sujet = item.risque;
                newItem.action = item.action;
                newItem.pdca = item.pdca;
                newItem.pilote = item.pilote;
                newItem.num_ticket = item.num_ticket;
                newItem.id_ticket = item.id+"";
                newItem.id = 0
                let eff = effi.filter(effi => effi.id_ticket===newItem.id_ticket && effi.id_revue_processus===id_revue_processus && effi.types===1)
                if(eff.length>0){
                    console.log(eff)
                    eff = eff[0]
                    newItem.id = eff.id;
                    newItem.commentaire = eff.commentaire
                    newItem.ticket = eff.ticket
                    
                }
                allRisque.push(newItem)
            })
            
            setOpportunite(allOppo)
            setEnjeux(allEnjeux)
        //     console.log(allRisque)
            setRisque(allRisque)
    }

    const handleChangeCurrent = (type, data) =>{
        console.log(type, data)
        setCurrentType(type)
        setCurrentEff(data)
        if(data.id===0){
            setInsert(true)
        }
    }

    const handleChangeComment = async () => {
        
        console.log(currentType, currentEff)
        console.log(commentaire.current.value)
        const item = {}
        item.id_revue_processus = id_revue_processus
        item.num_ticket = currentEff.num_ticket
        item.id_ticket = currentEff.id_ticket 
        item.types = currentType
        item.commentaire = commentaire.current.value
        item.id = currentEff.id
        console.log(item)

        

        if(insert===true){
            console.log("insert",item)
            axios.post(Url+"/insertEfficacite",{item})
        }else{
            console.log("update",item)
            axios.post(Url+"/updateEfficacite",{item})
        }
        getData()
        setInsert(false)
    }

    const border = {
        border: !theme ? "": "black 1px solid"
    }
   
    return(
        <div  className={!MenuCollapse ? "content" : "contentCollapse"}>  
            <TitlePage title="Efficacité des actions face aux risques, enjeux et opportunités" process={true} listProcess={false} revueDirection={true}  theme={theme}/>
                {
                titre.map((titre, indexTitre)=>(
                    <>
                    <h1>{titre.nom}</h1>
                    <table className="table table-bordered text-center" style={border} id="table_user">
                        <thead className="text-success ">
                            <tr key={-1}>
                                <th key={-1} style={{backgroundColor:"lightgray"}}>{titre.nom}</th>
                                {
                                    colonneTable.map((col, index) => (
                                        col.id===4?
                                        <th key={index} className="col-3" style={{backgroundColor:"lightgray"}}>
                                            {col.nom}
                                        </th>
                                        :
                                        <th key={index} style={{backgroundColor:"lightgray"}}>
                                            {col.nom}
                                        </th>

                                    ))       
                                } 
                            </tr>
                        </thead>
                        {
                            titre.id === 1 &&
                            risque.length>0 ?
                            <tbody className={!theme ? "text-dark" : "text-white"}>
                                { 
                                    risque.map((data,index)=>(
                                        <tr key={index}>
                                            <td>{data.sujet}</td>
                                            <td>{data.action}</td>
                                            <td>{data.pilote}</td>
                                            {
                                                currentEff.id===data.id && currentType === titre.id ?
                                                <td><textarea className="form-control" type="texte" name="commentaire" ref={commentaire} onChange={handleChangeComment}></textarea></td>
                                                :
                                                <td><textarea className="form-control" type="texte" value={data.commentaire} onClick={() => handleChangeCurrent(titre.id, data)}></textarea></td>
                                                
                                            }
                                            
                                            <td>{data.pdca}</td>
                                        </tr>
                                    ))

                                
                                }
                            </tbody>
                            :
                            titre.id === 2 &&
                            enjeux.length>0 ?
                            <tbody className={!theme ? "text-dark" : "text-white"}>
                                { 
                                    enjeux.map((data,index)=>(
                                        <tr key={index}>
                                            <td>{data.sujet}</td>
                                            <td>{data.action}</td>
                                            <td>{data.pilote}</td>
                                            {
                                                currentEff.id===data.id && currentType === titre.id ?
                                                <td><textarea className="form-control" type="texte" name="commentaire" ref={commentaire} onChange={handleChangeComment}></textarea></td>
                                                :
                                                <td><textarea className="form-control" type="texte" value={data.commentaire} onClick={() => handleChangeCurrent(titre.id, data)}></textarea></td>
                                                
                                            }
                                            <td>{data.pdca}</td>
                                        </tr>
                                    ))

                                
                                }
                            </tbody>
                            :
                            titre.id === 3 &&
                            opportunite.length>0 ?
                            <tbody className={!theme ? "text-dark" : "text-white"}>
                                { 
                                    opportunite.map((data,index)=>(
                                        <tr key={index}>
                                            <td>{data.sujet}</td>
                                            <td>{data.action}</td>
                                            <td>{data.pilote}</td>
                                            {
                                                currentEff.id===data.id && currentType === titre.id ?
                                                <td><textarea className="form-control" type="texte" name="commentaire" ref={commentaire} onChange={handleChangeComment}></textarea></td>
                                                :
                                                <td><textarea className="form-control" type="texte" value={data.commentaire} onClick={() => handleChangeCurrent(titre.id, data)}></textarea></td>
                                                
                                            }
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