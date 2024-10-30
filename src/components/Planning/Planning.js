import React, { useEffect, useRef, useState } from "react";
import { TitlePage } from "../templates/templates";
import { useDispatch, useSelector } from "react-redux";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { id } from "date-fns/locale";
import axios from "axios";
import Global_url from "../../global_url"
var Url = Global_url

const Planning =({MenuCollapse,theme,logo})=>{

    const dispatch = useDispatch()
    const categorie = useRef();
    const titre = useRef();
    const date_deb = useRef();
    const date_clot = useRef();
    const date_deb_recol = useRef();
    const date_fin_recol = useRef();
    const categorieFilter = useRef();
    const titreFilter = useRef();
    const date_debFilter = useRef();
    const date_clotFilter = useRef();
    const statusFilter = useRef(); 
    const [listCategorie, setListCategorie] = useState([])
    const listProcessus = useSelector((state) => state.processus.processus)
    const [listProcessusDomaine, setListProcessusDomaine] = useState([])
    const [listProcessusChecked, setListProcessChecked] = useState([])
    const [modaleFiltre, setModaleFiltre] = useState(false);
    const [add,setAdd] = useState(false)
    const [data,setData] = useState([{}])
    const [current,setCurrent] = useState([{}])

    useEffect(()=>{
        getData()
    },[])

    const border = {
        border: !theme ? "": "black 1px solid"
    }

    async function getData(){
        const categorie = await axios.get(Url+"/getPlanningCategorie");
        console.log(categorie)
        setListCategorie(categorie.data)
        const planning = await axios.get(Url+"/getPlanning");
        console.log(planning.data[0].planning_categorie.libelle)
        setData(planning.data)
    }

    

    const handleAjout = () => {
        if(add===true){
            setAdd(false)
        }else{
            setAdd(true)
        }
    }

    const handleDetail = (data) => {
        console.log(data)
        setCurrent(data)
        let list= [];
        let revue = data.revue_processus
        listProcessus.map(listP=>{
            let obj = {}
            let dataCurrent = revue.filter(revue=> revue.processus.id === listP.id)
            obj.id = listP.id
            obj.libelle_processus = listP.libelle_processus
            obj.checked = false
            if(dataCurrent.length>0){
                console.log(dataCurrent, listP)
                obj.checked = true
            }
            list.push(obj)
        })
        console.log(list)
        setListProcessChecked(list)
    }

    const handleCheckedProcessus = (id) => {
        console.log(id)
        let listP = []
        listProcessus.map(list=>{
            let obj = {};
            obj.abbrv = list.abbrv;
            obj.id = list.id;
            obj.libelle_processus = list.libelle_processus;
            obj.num_processus = list.num_processus;
            obj.checked = false;
            if(list.id===Number(id)){
                obj.checked = true;
            }
            if(listProcessusChecked.length>0){
                let check = listProcessusChecked.filter(proc => proc.id === list.id)
                obj.checked = check[0].checked
                if(list.id===Number(id)){
                    if(check[0].checked===true){
                        obj.checked = false
                    }else{
                        obj.checked = true
                    }
                }
            }
            // console.log(obj)
            list.push(obj)
        })
        console.log(listP)
        setListProcessChecked(listP)
    }

    const handleAddPlanning = async (e) => {
        e.preventDefault();
        let item = {}
        item.id_categorie = categorie.current.value;
        item.titre = titre.current.value;
        item.date_debut = date_deb.current.value;
        item.date_cloture = date_clot.current.value;
        if(item.date_cloture==="") item.date_cloture=null
        item.date_recolte_debut = date_deb_recol.current.value;
        item.date_recolte_fin = date_fin_recol.current.value;
        console.log(item);
        let planning = await axios.post(Url+"/insertPlanning",{item})
        planning = planning.data
        const process = listProcessusChecked.filter(proc => proc.checked===true);
        console.log(planning)
        item = {}
        item.id_planning = planning.id;
        item.processus = process
        await axios.post(Url+"/insertDomaine",{item})
        console.log(item) 
        handleReset()
        getData()
    }

    const handleSubmit = () => {

    }

    const handleReset = () => {
        titre.current.value = ""
        date_clot.current.value = ""
        date_deb.current.value = ""
        date_deb_recol.current.value = ""
        date_fin_recol.current.value = ""
        setListProcessChecked([])
    }

    const handleModaleFiltre = () => {
        if(modaleFiltre){
            setModaleFiltre(false)
        }else{
            setModaleFiltre(true)
        }  
    }

    const handleFiltre = () => {
        if(modaleFiltre){
            setModaleFiltre(false)
        }else{
            setModaleFiltre(true)
        }  
    }

    const handleInitialiserFiltre = () => {
        if(modaleFiltre){
            setModaleFiltre(false)
        }else{
            setModaleFiltre(true)
        }  
    }

    
    return(
        <div  className={!MenuCollapse ? "content" : "contentCollapse"}>
            <TitlePage title="Planning" theme={theme}/>
            <div className="CountBoard mt-1">
                            {modaleFiltre ? (
                                <form action={handleFiltre} className="row mb-3">  
                                <div className="col-2 mt-4">
                                    <select className="form-control" name="titre" ref={categorieFilter}>
                                        <option key={0} value={0}>Categorie</option>
                                        {
                                            listCategorie.length>0 &&
                                            listCategorie.map((listCategorie, index) => (
                                                <option 
                                                    key={index}
                                                    value={listCategorie.id}
                                                >
                                                    {listCategorie.type_recuperation} 
                                                </option> 
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="col-3 mt-4">
                                    <input  className="col-12 form-control" type="text" name="titre" placeholder="Titre" id="inputParametrage" ref={titreFilter}></input>
                                </div>
                                
                                <div className="col-3">
                                    <label>Date debut</label>
                                    <input  className="col-12 form-control" type="date" name="date_deb" placeholder="" id="inputParametrage" ref={date_debFilter}></input>
                                </div>
                                <div className="col-3">
                                    <label>Date cloture</label>
                                    <input  className="col-12 form-control" type="date" name="date_fin" placeholder="" id="inputParametrage" ref={date_clotFilter}></input>
                                </div>
                                <div className="col-1 mt-4">
                                        <button className="btn btn-success rounded-1 shadow" type="submit" >Filtrer</button>
                                </div>
                                
                            </form>) : (<></>)}
                    <div className="row col-6 mb-3">
                        <div className="col-1">
                            <OverlayTrigger placement="top" overlay={<Tooltip>Ajout</Tooltip>}>
                                <button className="btn btn-secondary rounded-1 shadow" onClick={() => handleAjout(true)} ><i className="bi bi-plus"></i></button>
                            </OverlayTrigger>
                            
                        </div>
                        <div className="col-1">
                            <OverlayTrigger placement="top" overlay={<Tooltip>Filtrer</Tooltip>}>
                                <button className="btn btn-success rounded-1 shadow" onClick={() => handleModaleFiltre(true)} ><i className="bi bi-search"></i></button>
                            </OverlayTrigger>
                        </div>
                        <div className="col-1">
                            <OverlayTrigger placement="top" overlay={<Tooltip>Reinitialiser filtre</Tooltip>}>
                                <button className="btn btn-warning rounded-1 shadow" onClick={() => handleInitialiserFiltre()} ><i className="bi bi-eye"></i></button>
                            </OverlayTrigger>
                        </div>
                    </div>
                    
                {add ?
                <form onSubmit={handleAddPlanning}>
                <div className="row">
                    <div className="col-lg-6 mt-1">
                        <select className={ !theme ? "form-control mb-2" : "form-control mb-2 darkMode border-dark text-white"} placeholder="Role" ref={categorie}>
                            <option  value={0}>Categorie...</option>
                            {
                            listCategorie.map((item,index)=>
                                <option key={index} value={item.id}>{item.libelle}</option>
                            )
                        }
                        </select>
                    </div>
                    <div className="col-lg-6 mt-1">
                        <button type="button" className={ !theme ? "form-control mb-2" : "form-control mb-2 darkMode border-dark"}
                        data-bs-target="#domaine" data-bs-toggle="modal">Domaine</button>
                    </div>
                    <div className="col-lg-12 mt-1">
                        <textarea type="text" ref={titre} className={ !theme ? "form-control mb-2" : "form-control mb-2 darkMode border-dark text-white"} placeholder="Titre" aria-label="name" aria-describedby="basic-addon2"/>
                    </div>
                    <div className="col-lg-6 mt-1">
                        <label className="col-12 mx-4">Date debut</label>
                        <input type="date" ref={date_deb} className={ !theme ? "form-control mb-2" : "form-control mb-2 darkMode border-dark"} placeholder="Date debut" aria-label="password" aria-describedby="basic-addon4"/>
                    </div>
                    <div className="col-lg-6 mt-1">
                        <label className="col-12 mx-4">Date cloture</label>
                        <input type="date" ref={date_clot} className={ !theme ? "form-control mb-2" : "form-control mb-2 darkMode border-dark"} placeholder="Date cloture" aria-label="password" aria-describedby="basic-addon4"/>
                    </div>
                    <div className="col-lg-6 mt-1">
                        <label className="col-12 mx-4">Date debut recolte de données</label>
                        <input type="date" ref={date_deb_recol} className={ !theme ? "form-control mb-2" : "form-control mb-2 darkMode border-dark"} placeholder="Date debut recolte de donées" aria-label="password" aria-describedby="basic-addon4"/>
                    </div>
                    <div className="col-lg-6 mt-1">
                        <label className="col-12 mx-4">Date fin recolte de données</label>
                        <input type="date" ref={date_fin_recol} className={ !theme ? "form-control mb-2" : "form-control mb-2 darkMode border-dark"} placeholder="Date fin recolte de donées" aria-label="password" aria-describedby="basic-addon4"/>
                    </div>
                    
                    
                    <div className="col-12 text-center mt-2">
                        <button type="submit" className="btn btn-primary form-control w-25  mb-3 ms-2 mt-2">
                            <i className="bi bi-save"></i>
                            <span> Enregistrer</span>
                        </button>
                        <button type="button" onClick={()=>handleReset()} className={!theme ? "btn btn-dark mb-3 mt-2 form-control w-25 ms-2" : "btn btn-outline-warning mb-3 mt-2 form-control w-25 ms-2"}> <i className="bi bi-arrow-counterclockwise"></i> Vider</button>
                    </div>
                </div>
                </form>
                :<></>}
                <table className="table table-bordered text-center" style={border} id="planning">
                    <thead>
                        <tr>
                            <th className="col-2" style={{backgroundColor:"lightgray"}}>Catégorie</th>
                            <th className="col-3" style={{backgroundColor:"lightgray"}}>Titre</th>
                            <th className="col-1" style={{backgroundColor:"lightgray"}}>Date debut</th>
                            <th className="col-1" style={{backgroundColor:"lightgray"}}>Date cloture</th>
                            <th className="col-1" style={{backgroundColor:"lightgray"}}>Date debut recolte donnée</th>
                            <th className="col-1" style={{backgroundColor:"lightgray"}}>Date cloture recolte donnée</th>
                            <th className="col-1" style={{backgroundColor:"lightgray"}}>Statut</th>
                            <th className="col-1" style={{backgroundColor:"lightgray"}}>Domaine</th>
                        </tr>
                    </thead>
                    <tbody>
                        { data.map((data,index)=>(
                        <tr>
                            
                            {
                                data.planning_categorie===undefined ?
                                <td></td>
                                :
                                <td>{data.planning_categorie.libelle}</td>
                            }
                            <td>{data.titre}</td>
                            <td>{data.date_debut}</td>
                            <td>{data.date_cloture}</td>
                            <td>{data.date_recolte_debut}</td>
                            <td>{data.date_recolte_fin}</td>
                            <td>{data.statut}</td>
                            <td>
                                <div className="mx-1">
                                <OverlayTrigger placement="top" overlay={<Tooltip>Detail</Tooltip>}>
                                    <button className="btn btn-dark rounded-3 shadow" onClick={()=>handleDetail(data)} 
                                    data-bs-target="#detail" data-bs-toggle="modal">
                                        <i className="bi bi-info-lg"></i>
                                    </button>
                                </OverlayTrigger>
                                </div>
                            </td>
                        </tr>
                        ))
                        }
                    </tbody>
                </table>

                <div className="modal fade" id="detail" data-backdrop="static" data-keyboard="false">
                    <div className="modal-dialog modal-sm modal-dialog-right ">
                        <div className={"modal-content"}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Domaine : {current.titre}</h5>
                            </div>
                            <div className="modal-body">
                                <table className={!theme ? "table table-striped" : "table text-white"}>
                                    <tbody>
                                        
                                        {
                                            listProcessusChecked.map((processus,index)=>
                                                <tr key={index}>
                                                    <td>{processus.libelle_processus}</td>
                                                    <td><input type="checkbox" value={processus.id}  onChange={() => handleCheckedProcessus(processus.id)} checked={processus.checked}/></td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="modal fade" id="domaine" data-backdrop="static" data-keyboard="false">
                    <div className="modal-dialog modal-sm modal-dialog-right ">
                        <div className={"modal-content"}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Domaine</h5>
                            </div>
                            <div className="modal-body">
                                <table className={!theme ? "table table-striped" : "table text-white"}>
                                    <tbody>
                                        {
                                            listProcessusChecked.length>0 ? (
                                                listProcessusChecked.map((processus,index)=>
                                                    <tr key={index}>
                                                        <td>{processus.libelle_processus}</td>
                                                        <td><input type="checkbox" value={processus.id}  onChange={() => handleCheckedProcessus(processus.id)} checked={processus.checked}/></td>
                                                    </tr>
                                                )
                                                ):(
                                                listProcessus.map((processus,index)=>
                                                    <tr key={index}>
                                                        <td>{processus.libelle_processus}</td>
                                                        <td><input type="checkbox" value={processus.id}  onChange={() => handleCheckedProcessus(processus.id)} /></td>
                                                    </tr>
                                                )
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Planning;