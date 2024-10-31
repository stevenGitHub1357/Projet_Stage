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
    const [listFile, setListFile] = useState([])
    const id_revue_processus = cookies.id_revue_processus;
    const taux = useRef()
    const realise = useRef()
    const fichier = useRef()
    const [actuel, setActuel] = useState({})
    const id_process = cookies.id_processus
    const listProcessusSlice = useSelector((state) => state.processus.processus)
    const [tauxAtteint, setTauxAtteint] = useState(0)
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
    },[cookies.id_revue_processus,, cookies.id_processus])

    useEffect(()=>{
        setIsModalOpen(false)
    })

    async function getData(){
        const item = {}
        item.id_processus = cookies.id_processus
        item.id_revue_processus = id_revue_processus
        let all = []
        let total = 0;
        await axios.post(Url+"/getPerformanceObjectifByRevueProcessus",{item}).then(res=>{
            if(res.data.length){
                setData(res.data)
                console.log(res.data)
                // setCurrent(res.data[0])
                all = res.data
                all.map(obj=>{
                    total = total+obj.taux
                })
            }else{
                setData([])
            }
        })  
        let count = all.length;
        setTauxAtteint(total/count)

    }

    const border = {
        border: !theme ? "": "black 1px solid"
    }

    

    const handleDetail  = async (data) => {
        setCurrent(data)
        setIsModalOpen(true)

    }

    const handleActuel = (data) => {
        // setCurrent(data)
        setActuel(data)
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

    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
  
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };
  
    const handleUpload = async (e) => {
      e.preventDefault();
      if (!file) {
        setMessage('Veuillez sélectionner un fichier.');
        return;
      }
  
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        const res = await axios.post(Url+'/uploadFile', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        // console.log(res.data)
        // setMessage(res.data.message);
        const item = {}
        let currentProcess = listProcessusSlice.filter(process=> process.id === Number(cookies.id_processus));
        currentProcess = currentProcess[0]
        item.folderPath = currentProcess.abbrv+"/"+id_revue_processus+"/"+current.id
        item.fileName = res.data.file.filename
        console.log("item",item)
            await axios.post(Url+'/moveFile', {item})
        item.id_revue_processus = id_revue_processus;
        item.id_parametrage = current.id;
        item.file_name = res.data.file.originalname;
        item.file_save = res.data.file.filename;
        item.folder_path = item.folderPath;
        console.log(item)
            await axios.post(Url+'/insertPerformanceObjectifRevueFichier', {item})
      } catch (error) {
        setMessage('Échec de l\'upload.');
      }
    };

    const handleDownload= async (file) => {
        
        try {
            let currentProcess = listProcessusSlice.filter(process=> process.id === Number(cookies.id_processus));
            currentProcess = currentProcess[0]
            let folderPath = currentProcess.abbrv+"/"+id_revue_processus+"/"+current.id
            let fileName = file.file_save
            let downloadUrl = Url+"/"+folderPath+"/"+fileName
            console.log(downloadUrl)
            // downloadUrl = 'http://192.168.12.236/NODEJS-SERVER-API/uploads/SOCIETE LUMINESS02052023.xlsx'
            console.log(downloadUrl)
            let newFileName = file.file_name

            const response = await axios.get(
                downloadUrl,
                {
                  responseType: 'blob', // Important pour récupérer le fichier sous forme de binaire
                }
              );
        
              // Crée un lien de téléchargement à partir du fichier téléchargé
              const url = window.URL.createObjectURL(new Blob([response.data]));
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', newFileName);
              document.body.appendChild(link);
              link.click();
              link.remove();
            } catch (error) {
            setMessage('Échec de l\'upload.');
            }
        };

        const handleTableDownload = async (data) => {
            setCurrent(data)
            const item = {}
            item.id_parametrage = data.id
            item.id_revue_processus = id_revue_processus
            let listF = await axios.post(Url+'/getPerformanceObjectifRevueFichierByObjectif', {item})
            listF = listF.data
            console.log(listF)
            if(listF.length>0){
                setListFile(listF)
            }
        }


   
    return(
        <div  className={!MenuCollapse ? "content" : "contentCollapse"}>
            <TitlePage title="Revue de la performance du processus" process={true} listProcess={false} revueDirection={true} theme={theme}/>
                <div className="text-center"><h3>Taux d'atteinte : {tauxAtteint}%</h3></div>
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
                                        <td className="col-4">{data.objectifs}</td>
                                        <td>{data.poids}</td>
                                        <td>{data.cible+""+data.abbrv}</td>

                                        {   
                                            actuel.id !== data.id ?(
                                                data.id_recuperation !== 2 ?
                                                <>
                                                    <td className="col-1">
                                                        <td><input type="text" className="form-control" value={data.realise} name="realise" onClick={() => handleActuel(data)}></input></td>
                                                        <td>{data.abbrv}</td>
                                                    </td>
                                                    <td className="col-1">
                                                        <td><input type="text" className="form-control" value={data.taux} name="taux" onClick={() => handleActuel(data)}></input></td>
                                                        <td>{data.abbrv}</td>
                                                    </td>
                                                    <td className="col-4"><textarea type="text" className="form-control" value={data.commentaire} name="commentaire" onClick={() => handleActuel(data)}></textarea></td>
                                            
                                                </>
                                                :
                                                <>
                                                    <td>{data.realise+""+data.abbrv}</td>
                                                    <td>{data.taux+""+data.abbrv}</td>
                                                    <td className="col-4"><textarea type="text" className="form-control" value={data.commentaire} name="commentaire" onClick={() => handleActuel(data)}></textarea></td>
                                            
                                                </>
                                                
                                            ):(
                                                data.id_recuperation !== 2 ?
                                                <>
                                                    <td className="col-1"><input type="text" className="form-control"  name="realise" onChange={() => handleActualise()} ref={realise}></input>{data.abbrv}</td>
                                                    <td className="col-1"><input type="text" className="form-control"  name="taux" onChange={() => handleActualise()} ref={taux}></input>{data.abbrv}</td>
                                                    <td className="col-4"><textarea type="text" className="form-control"  name="commentaire" onChange={() => handleActualise()} ref={commentaire}></textarea></td>
                                            
                                                </>
                                                :
                                                <>
                                                    <td>{data.realise+""+data.abbrv}</td>
                                                    <td>{data.taux+""+data.abbrv}</td>
                                                    <td className="col-4"><textarea type="text" className="form-control"  name="commentaire" onChange={() => handleActualise()} ref={commentaire}></textarea></td>
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
                                                    <button className="btn btn-dark rounded-3 shadow" onClick={() => handleTableDownload(data)} 
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
                            
                            <h4>Ajouter une piece jointe</h4>
                            <form className="row" onSubmit={handleUpload}>
                                <input className="btn btn-secondary float-right col-9 mx-2" type="file" onChange={handleFileChange} ref={fichier}/>
                                <button data-bs-dismiss="modal" className="col-lg-2 mx-1 btn btn-outline-success btn-md col-3 mx-2" type="submit">Valider</button>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="modal fade" id="download" data-backdrop="static" data-keyboard="false">
                    <div className="modal-dialog modal-md modal-dialog-right ">
                        <div className={"modal-content"}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Objectifs : {current.objectifs}</h5>
                            </div>
                            <div className="modal-body">
                            
                            <h4>Telecharger une piece jointe</h4>
                            <table className="table table-bordered text-center">
                                <thead>
                                    <tr>
                                        <th style={{backgroundColor:"lightgray"}}>Nom fichier</th>
                                        <th style={{backgroundColor:"lightgray"}}>Ajout</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        listFile.map((file,index)=>(
                                            <tr>
                                                <td>{file.file_name}</td>
                                                <td>{file.createdat}</td>
                                                <td><button className="mx-1 btn btn-secondary" data-bs-dismiss="modal" onClick={()=> handleDownload(file)}><i class="bi bi-download"></i></button></td>
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