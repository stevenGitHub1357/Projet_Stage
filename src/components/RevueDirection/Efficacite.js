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
    const [currentType, setCurrentType] = useState(-1)
    const [currentTicket, setCurrentTicket] = useState(-1)
    const [currentEff, setCurrentEff] = useState({})
    const commentaire = useRef()
    const id_revue_processus = cookies.id_revue_processus
    const id_processus_efficacite = cookies.id_processus_efficacite
    const id_processus = cookies.id_processus
    const [listEfficacite, setListEfficacite] = useState([])
    const [insert, setInsert] = useState(false)
    const [numPage, setNumPage] = useState(1)
    const [tauxAtteint, setTauxAtteint] = useState(0)
    
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
    },[cookies.id_revue_processus, cookies.id_processus])

    async function getData(){
        console.log(id_revue_processus)
        let item = cookies.id_revue_processus
        console.log(item)
        let effi = []
        await axios.post(Url+"/getEfficaciteByRevue",{item}).then(res=>{
            if(res.data.length){
                setListEfficacite(res.data)
                effi = res.data
            }
        })
        console.log(effi)
        console.log(id_processus_efficacite)
        item = cookies.id_processus_efficacite+""
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
                newItem.commentaire = ""
                let eff = effi.filter(effi => effi.id_ticket===newItem.id_ticket && effi.id_revue_processus===Number(id_revue_processus) && effi.types===3)
                if(eff.length>0){
                    // console.log(eff)
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
                newItem.commentaire = ""
                let eff = effi.filter(effi => effi.id_ticket===newItem.id_ticket && effi.id_revue_processus===Number(id_revue_processus) && effi.types===2)
                if(eff.length>0){
                    // console.log(eff)
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
                let eff = effi.filter(effi => effi.id_ticket===newItem.id_ticket && effi.id_revue_processus===Number(id_revue_processus) && effi.types===1)
                newItem.commentaire = ""
                if(eff.length>0){
                    // console.log(eff)
                    eff = eff[0]
                    newItem.id = eff.id;
                    newItem.commentaire = eff.commentaire
                    newItem.ticket = eff.ticket
                    
                }
                allRisque.push(newItem)
            })
            
            console.log(allRisque)
            setOpportunite(allOppo)
            setEnjeux(allEnjeux)
            setRisque(allRisque)
            setCurrentType("")
            setCurrentEff({})
            let total = allRisque.length;
            let atteint = allRisque.filter(allRisque=>allRisque.pdca==="A");
            atteint = atteint.length
            let taux = (atteint*100)/total
            setTauxAtteint(taux)
    }

    const handleChangeCurrent = (type, data) =>{
        console.log("handleCurrent")
        console.log(type)
        console.log(data)
        setCurrentType(type)
        setCurrentEff(data)
        if(data.id===0){
            setInsert(true)
        }
    }

    const handleChangeComment = async () => {
        
        // console.log(currentType, currentEff)
        console.log(commentaire.current.value)
        const item = {}
        item.id_revue_processus = id_revue_processus
        item.num_ticket = currentEff.num_ticket
        item.id_ticket = currentEff.id_ticket 
        item.types = currentType
        item.commentaire = commentaire.current.value
        item.id = currentEff.id
        // console.log(item)

        

        if(insert===true && currentEff.id === 0){
            console.log("insert",item)
            axios.post(Url+"/insertEfficacite",{item})
        }else{
            console.log("update",item)
            axios.post(Url+"/updateEfficacite",{item})
        }
        // getData()
        setInsert(false)
    }

    const handleChangePage = (id) => {
        setNumPage(id)
        if(id===1){
            let total = risque.length;
            let atteint = risque.filter(risque=>risque.pdca==="A");
            atteint = atteint.length
            let taux = (atteint*100)/total
            setTauxAtteint(taux)
        }
        if(id===2){
            let total = enjeux.length;
            let atteint = enjeux.filter(enjeux=>enjeux.pdca==="A");
            atteint = atteint.length
            let taux = (atteint*100)/total
            setTauxAtteint(taux)
        }
        if(id===3){
            let total = opportunite.length;
            let atteint = opportunite.filter(opportunite=>opportunite.pdca==="A");
            atteint = atteint.length
            let taux = (atteint*100)/total
            setTauxAtteint(taux)
        }
    }

    const border = {
        border: !theme ? "": "black 1px solid"
    }
   
    return(
        <div  className={!MenuCollapse ? "content" : "contentCollapse"}>  
            <TitlePage title="Efficacité des actions face aux risques, enjeux et opportunités" process={true} listProcess={false} revueDirection={true}  theme={theme}/>
            <div className="text-center"><h3>Taux d'atteinte : {tauxAtteint}%</h3></div>
                <div className="row mt-2 mb-3">
                    <div className="col-1"></div>
                    <button className="btn btn-warning rounded-1 shadow col-3 mx-2" onClick={()=>handleChangePage(1)}>
                        RISQUE
                    </button>
                    <button className="btn btn-success rounded-1 shadow col-3 mx-2" onClick={()=>handleChangePage(2)}>
                        ENJEUX
                    </button>
                    <button className="btn btn-secondary rounded-1 shadow col-3 mx-2" onClick={()=>handleChangePage(3)}>
                        OPPORTUNITES
                    </button>
                    
                </div>
                {
                titre.filter(titre=>titre.id===Number(numPage)).map((titre, indexTitre)=>(
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
                                            <td className="col-3">{data.sujet}</td>
                                            <td className="col-3">{data.action}</td>
                                            <td className="col-1">{data.pilote}</td>
                                            {
                                                currentEff.id===data.id && currentType === titre.id && currentEff.num_ticket === data.num_ticket ?
                                                <td><textarea className="form-control col-4" type="texte" name="commentaire" ref={commentaire} onChange={handleChangeComment}></textarea></td>
                                                :
                                                <td><textarea className="form-control col-4" type="texte" value={data.commentaire} onClick={() => handleChangeCurrent(titre.id, data)}></textarea></td>
                                                
                                            }
                                            
                                            <td className="col-1">{data.pdca}</td>
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
                                            <td className="col-3">{data.sujet}</td>
                                            <td className="col-3">{data.action}</td>
                                            <td className="col-1">{data.pilote}</td>
                                            {
                                                currentEff.id===data.id && currentType === titre.id && currentEff.num_ticket === data.num_ticket ?
                                                <td><textarea className="form-control col-4" type="texte" name="commentaire" ref={commentaire} onChange={handleChangeComment}></textarea></td>
                                                :
                                                <td><textarea className="form-control col-4" type="texte" value={data.commentaire} onClick={() => handleChangeCurrent(titre.id, data)}></textarea></td>
                                                
                                            }
                                            
                                            <td className="col-1">{data.pdca}</td>
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
                                            <td className="col-3">{data.sujet}</td>
                                            <td className="col-3">{data.action}</td>
                                            <td className="col-1">{data.pilote}</td>
                                            {
                                                currentEff.id===data.id && currentType === titre.id && currentEff.num_ticket === data.num_ticket ?
                                                <td><textarea className="form-control col-4" type="texte" name="commentaire" ref={commentaire} onChange={handleChangeComment}></textarea></td>
                                                :
                                                <td><textarea className="form-control col-4" type="texte" value={data.commentaire} onClick={() => handleChangeCurrent(titre.id, data)}></textarea></td>
                                                
                                            }
                                            
                                            <td className="col-1">{data.pdca}</td>
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