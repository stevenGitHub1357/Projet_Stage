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
import PerformanceConsultation from "./Component/PerformanceConsultation";
import PerformanceSynthese from "./Component/PerformanceSynthese"
import { act } from "react";
// import PerformanceConsultation from "./Component"
var Url = Global_url
// // import "./homeStyle.scss"
// ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,BarElement,Title,Tooltip,Legend);

const Performance = ({MenuCollapse,theme,logo,cible})=>{

    const dispatch = useDispatch()
    let [data,setData] = useState([])
    let [annee,setAnnee] = useState(2023)
    const [cookies,setCookie,removeCookie] = useCookies(['id_user','id_processus','id_revue_direction', 'type_demande', 'id_revue_processus'])
    const commentaire = useRef();
    const [current, setCurrent] = useState([])
    const[listCommentaire, setListCommentaire] = useState([])
    const [consultation, setConsultation] = useState([])
    const [synthese, setSynthese] = useState([])
    const id_revue_processus = cookies.id_revue_processus;
    const taux = useRef()
    const realise = useRef()
    const fichier = useRef()
    const [actuel, setActuel] = useState({})
    const id_process = cookies.id_processus
    // console.log(current)

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
        console.log('Cookie a changé:', cookies.id_processus);
        getData()
    },[cookies.id_revue_processus])

    useEffect(()=>{
        setIsModalOpen(false)
    })

    async function getData(){
        const item = {}
        item.id_processus = cookies.id_processus
        item.id_revue_processus = id_revue_processus
        await axios.post(Url+"/getPerformanceObjectifByRevueProcessus",{item}).then(res=>{
            if(res.data.length){
                setData(res.data)
                console.log(res.data)
                // setCurrent(res.data[0])
            }else{
                setData([])
            }
        })  
    }

    const border = {
        border: !theme ? "": "black 1px solid"
    }

    

    const handleDetail  = async (data) => {
        const item = data.type_demande
        console.log(item)
        // setCookie(data.type_demande)
        setCurrent(data)
        setIsModalOpen(true)

    }

    const handleActuel = (data) => {
        setActuel(data)
        console.log(data)

    }

    const handleActualise = async (fichierVer) => {
        console.log("actualise")
        let item = actuel
        item.id_parametrage = actuel.id;

        if(fichierVer === true){
            let fichierAct = fichier.current.value;
            fichierAct = fichierAct.split("\\")
            fichierAct = fichierAct[fichierAct.length-1]
            console.log(fichierAct);
            item.fichier = fichierAct;
        }else{
            item.commentaire = commentaire.current.value;
            if(actuel.id_recuperation!==2){
                item.realise = realise.current.value;
                item.taux = taux.current.value;
            }
        }

        console.log(item)
        if(item.existe===0){
            console.log("insertion",item)
            item = await axios.post(Url+"/insertPerformanceObjectifRevue",{item})
            console.log(item)
            setActuel(item)

        }
        else if(item.existe===1){
            console.log("update",item)
            item = await axios.post(Url+"/updatePerformanceObjectifRevue",{item})

        }
        getData()

    }
    const [isModalOpen, setIsModalOpen] = useState(false);


   
    return(
        <div  className={!MenuCollapse ? "content" : "contentCollapse"}>
            <TitlePage title="Revue de la performance du processus" process={true} listProcess={false} revueDirection={true} theme={theme}/>
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

                                        {   
                                            actuel.id !== data.id ?(
                                                data.id_recuperation !== 2 ?
                                                <>
                                                    <td className="col-1"><input type="text" className="form-control" value={data.realise} name="realise" onClick={() => handleActuel(data)}></input>{data.abbrv}</td>
                                                    <td className="col-1"><input type="text" className="form-control" value={data.taux} name="taux" onClick={() => handleActuel(data)}></input>{data.abbrv}</td>
                                                    <td><td><textarea type="text" className="form-control" value={data.commentaire} name="commentaire" onClick={() => handleActuel(data)}></textarea></td></td>
                                            
                                                </>
                                                :
                                                <>
                                                    <td>{data.realise+""+data.abbrv}</td>
                                                    <td>{data.taux+""+data.abbrv}</td>
                                                    <td><td><textarea type="text" className="form-control" value={data.commentaire} name="commentaire" onClick={() => handleActuel(data)}></textarea></td></td>
                                            
                                                </>
                                                
                                            ):(
                                                data.id_recuperation !== 2 ?
                                                <>
                                                    <td className="col-1"><input type="text" className="form-control"  name="realise" onChange={() => handleActualise()} ref={realise}></input>{data.abbrv}</td>
                                                    <td className="col-1"><input type="text" className="form-control"  name="taux" onChange={() => handleActualise()} ref={taux}></input>{data.abbrv}</td>
                                                    <td><td><textarea type="text" className="form-control"  name="commentaire" onChange={() => handleActualise()} ref={commentaire}></textarea></td></td>
                                            
                                                </>
                                                :
                                                <>
                                                    <td>{data.realise+""+data.abbrv}</td>
                                                    <td>{data.taux+""+data.abbrv}</td>
                                                    <td><td><textarea type="text" className="form-control"  name="commentaire" onChange={() => handleActualise()} ref={commentaire}></textarea></td></td>
                                                </>
                                            )
                                        }
                                        
                                        
                                        
                                        <td>
                                            <div className="row">
                                                
                                            {
                                                data.id_recuperation === 2 ?
                                                <div className="col-3 mx-1">
                                                <OverlayTrigger placement="top" overlay={<Tooltip>Detail {data.type_demande}</Tooltip>}>
                                                    <button className="btn btn-dark rounded-3 shadow" onClick={()=>handleDetail(data)} 
                                                    data-bs-target="#detail" data-bs-toggle="modal">
                                                        <i class="bi bi-info-lg"></i>
                                                    </button>
                                                </OverlayTrigger>
                                                </div>
                                                :
                                                <>
                                                <div className="col-3 mx-2">
                                                <OverlayTrigger placement="top" overlay={<Tooltip>Telecharger la piece jointe {data.type_demande}</Tooltip>}>
                                                    <button className="btn btn-dark rounded-3 shadow" onClick={() => handleActuel(data)} 
                                                    data-bs-target="#download" data-bs-toggle="modal">
                                                        <i class="bi bi-download"></i>
                                                    </button>
                                                </OverlayTrigger>
                                                </div>
                                                <div className="col-3 mx-2">
                                                <OverlayTrigger placement="top" overlay={<Tooltip>Ajouter une piece jointe {data.type_demande}</Tooltip>}>
                                                    <button className="btn btn-secondary rounded-3 shadow" onClick={() => handleActuel(data)}
                                                    data-bs-target="#upload" data-bs-toggle="modal">
                                                        <i class="bi bi-upload"></i>
                                                    </button>
                                                </OverlayTrigger>
                                                </div>
                                                </>
                                            }
                                            </div>
                                        </td>
                                    </tr>
                                ))

                            
                            }
                        </tbody>
                        :<></>
                    }
                </table>

                


                <div className="modal fade" id="detail" data-backdrop="static" data-keyboard="false">
                    <div className="modal-dialog modal-lg modal-dialog-right ">
                        <div className={"modal-content"}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Objectifs : {current.objectifs}</h5>
                            </div>
                            <div className="modal-body">
                                <PerformanceConsultation isOpen={isModalOpen} current={current} />
                                <PerformanceSynthese isOpen={isModalOpen} current={current}/>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="modal fade" id="upload" data-backdrop="static" data-keyboard="false">
                    <div className="modal-dialog modal-md modal-dialog-right ">
                        <div className={"modal-content"}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Objectifs : {current.objectifs}</h5>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <input className="btn btn-secondary float-right col-9 mx-2" type="file" accept=".xlsx" ref={fichier}/>
                                    <button data-bs-dismiss="modal" className="col-lg-2 mx-1 btn btn-outline-success btn-md col-3 mx-2" onClick={() => handleActualise(true)}>Valider</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                
        </div>

        
    );
}
export default Performance;