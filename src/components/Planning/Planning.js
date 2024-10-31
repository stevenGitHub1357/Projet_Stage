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
    const date_debut = useRef();
    const date_cloture = useRef();
    const date_recolte_debut = useRef();
    const date_recolte_fin = useRef();
    const statut = useRef();
    const categorieFilter = useRef();
    const titreFilter = useRef();
    const date_debFilter = useRef();
    const date_clotFilter = useRef();
    const statusFilter = useRef(); 
    const [listInitData, setListInitData] = useState([])
    const [listCategorie, setListCategorie] = useState([])
    const listProcessus = useSelector((state) => state.processus.processus)
    const [listProcessusDomaine, setListProcessusDomaine] = useState([])
    const [listProcessusChecked, setListProcessChecked] = useState([])
    const [modaleFiltre, setModaleFiltre] = useState(false);
    const [add,setAdd] = useState(false)
    const [data,setData] = useState([{}])
    const [current,setCurrent] = useState([{}])
    const [actuelChange, setActuelChange] = useState(-1)

    useEffect(()=>{
        getData()
        getPlanningCategorie()
    },[])

    const border = {
        border: !theme ? "": "black 1px solid"
    }

    async function getPlanningCategorie(){
        const categorie = await axios.get(Url+"/getPlanningCategorie");
        console.log(categorie)
        setListCategorie(categorie.data)
    }

    async function getData(){
        
        const planning = await axios.get(Url+"/getPlanning");
        console.log(planning.data[0].planning_categorie.libelle)
        setData(planning.data)
        setListInitData(planning.data)
    }

    

    const handleAjout = () => {
        if(add===true){
            setAdd(false)
        }else{
            setAdd(true)
        }
    }

    const handleSeeDomaine = (data) => {
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
        setListProcessusDomaine(list)
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
            listP.push(obj)
        })
        console.log(listP)
        setListProcessChecked(listP)
    }


    const handleCheckedDomaine = (id) => {
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
            if(listProcessusDomaine.length>0){
                let check = listProcessusDomaine.filter(proc => proc.id === list.id)
                obj.checked = check[0].checked
                if(list.id===Number(id)){
                    if(check[0].checked===false){
                        obj.checked = true
                        const newList = []
                        newList.push(check[0])
                        const item = {}
                        item.id_planning = current.id;
                        item.processus = newList
                        console.log(item)
                        axios.post(Url+"/insertDomaine",{item})
                    }
                }
            }
            // console.log(obj)
            listP.push(obj)
        })
        console.log(listP)
        setListProcessusDomaine(listP)
        getData()
    }

    const handleAddPlanning = async (e) => {
        e.preventDefault();
        let item = {}
        item.id_categorie = categorie.current.value;
        item.titre = titre.current.value;
        item.date_debut = date_debut.current.value;
        item.date_cloture = date_cloture.current.value;
        if(item.date_cloture==="") item.date_cloture=null
        item.date_recolte_debut = date_recolte_debut.current.value;
        item.date_recolte_fin = date_recolte_fin.current.value;
        console.log(item);
        let planning = await axios.post(Url+"/insertPlanning",{item})
        planning = planning.data
        const process = listProcessusChecked.filter(proc => proc.checked===true);
        console.log(planning)
        item = {}
        item.id_planning = planning.id;
        item.createdat = planning.date_debut;
        item.processus = process
        await axios.post(Url+"/insertDomaine",{item})
        console.log(process) 
        handleReset()
        getData()
    }

    const handleUpdateCurrent = async () => {
        // e.preventDefault();
        let item = {}
        console.log(actuelChange)
        item.id_categorie = categorie.current.value;
        item.titre = titre.current.value;
        item.date_debut = date_debut.current.value;
        item.date_cloture = date_cloture.current.value;
        if(item.date_cloture==="") item.date_cloture=null
        item.date_recolte_debut = date_recolte_debut.current.value;
        item.date_recolte_fin = date_recolte_fin.current.value;
        item.id = actuelChange.id
        item.statut = statut.current.value;
        if(item.statut === "A") item.date_cloture = new Date()
        let planning = await axios.post(Url+"/updatePlanning",{item})
        console.log(item) 
    }

    const handleSubmit = () => {

    }

    const handleReset = () => {
        titre.current.value = ""
        date_cloture.current.value = ""
        date_debut.current.value = ""
        date_recolte_debut.current.value = ""
        date_recolte_fin.current.value = ""
        setListProcessChecked([])
    }

    const handleModaleFiltre = () => {
        if(modaleFiltre){
            setModaleFiltre(false)
        }else{
            setModaleFiltre(true)
        }  
    }

    const handleFiltre = (e) => {
        e.preventDefault();
        let newList = listInitData
        let item = {}
        item.id_categorie = categorieFilter.current.value;
        item.titre = titreFilter.current.value;
        item.date_debut = date_debFilter.current.value;
        item.date_cloture = date_clotFilter.current.value;
        item.statut = statusFilter.current.value;
        if(item.id_categorie!=="0") newList = newList.filter(data=> Number(data.id_categorie)===Number(item.id_categorie))
        if(item.titre!=="") newList = newList.filter(data=>data.titre.toLowerCase().includes(item.titre.toLowerCase()))
        if (item.date_debut !== "") {
            newList = newList.filter(data => Date.parse(data.date_debut) >= Date.parse(item.date_debut));
        }
        if (item.date_cloture !== "" ) {
            const newListInside = newList.filter(data => Date.parse(data.date_cloture) <= Date.parse(item.date_cloture));
            const newListNull = newList.filter(data => data.date_cloture===null);
            newList = []
            newListInside.map(list=>{
                newList.push(list)
            })
            newListNull.map(list=>{
                newList.push(list)
            })
            
        }
        if(item.statut!=="") newList = newList.filter(data=>data.statut.toLowerCase()===item.statut.toLowerCase())

        console.log(item)
        console.log(newList)
        setData(newList)
    }

    const handleInitialiserFiltre = () => {
        setData(listInitData)  
    }

    const handleChangeCurrent = (obj) => {
        console.log(obj)
        if(actuelChange.id !== obj.id){
            setActuelChange(obj)
            getData()
        }
    }

    const handleCloturer = (obj) => {
        console.log(obj)
    }

    const handleAddCategorie = async (e) => {
        e.preventDefault();
        let item = {}
        item.libelle = e.currentTarget.elements.libelle.value
        item.abbrv = e.currentTarget.elements.abbrv.value
        console.log(item)
        await axios.post(Url+"/insertPlanningCategorie",{item})
        console.log(item) 
        // handleReset()
        getPlanningCategorie()

    }

    
    return(
        <div  className={!MenuCollapse ? "content" : "contentCollapse"}>
            <TitlePage title="Planning" theme={theme}/>
            <div className="CountBoard mt-1">
                            {modaleFiltre ? (
                                <div className="row mb-3">
                                <div className="col-3 mt-4">
                                    <select className="form-control" name="titre" ref={categorieFilter} onChange={handleFiltre}>
                                        <option key={0} value={0}>Categorie</option>
                                        {
                                            listCategorie.length>0 &&
                                            listCategorie.map((listCategorie, index) => (
                                                <option 
                                                    key={index}
                                                    value={listCategorie.id}
                                                >
                                                    {listCategorie.libelle} 
                                                </option> 
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="col-3 mt-4">
                                    <input  className="col-12 form-control" type="text" name="titre" placeholder="Titre" id="inputParametrage" ref={titreFilter} onChange={handleFiltre}></input>
                                </div>
                                
                                <div className="col-2">
                                    <label>Date debut</label>
                                    <input  className="col-12 form-control" type="date" name="date_debut" placeholder="" id="inputParametrage" ref={date_debFilter} onChange={handleFiltre}></input>
                                </div>
                                <div className="col-2">
                                    <label>Date cloture</label>
                                    <input  className="col-12 form-control" type="date" name="date_fin" placeholder="" id="inputParametrage" ref={date_clotFilter} onChange={handleFiltre}></input>
                                </div>
                                <div className="col-2">
                                    <label>Statut</label>
                                    <input  className="col-12 form-control" type="texte" name="date_fin" placeholder="" id="inputParametrage" ref={statusFilter} onChange={handleFiltre}></input>
                                </div>
                                </div>
                            ) : (<></>)}
                    <div className="row col-6 mb-3">
                        <div className="col-1">
                            <OverlayTrigger placement="top" overlay={<Tooltip>Ajout Planning</Tooltip>}>
                                <button className="btn btn-dark rounded-1 shadow" onClick={() => handleAjout(true)} ><i className="bi bi-plus"></i></button>
                            </OverlayTrigger>
                        </div>
                        <div className="col-1">
                            <OverlayTrigger placement="top" overlay={<Tooltip>Ajout une categorie</Tooltip>}>
                                <button className="btn btn-secondary rounded-1 shadow" data-bs-target="#categorie" data-bs-toggle="modal"><i className="bi bi-plus"></i></button>
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
                    <div className="col-lg-4 mt-1">
                        <select className={ !theme ? "form-control mb-2" : "form-control mb-2 darkMode border-dark text-white"} placeholder="Categorie" ref={categorie}>
                            <option  value={0}>Categorie...</option>
                            {
                            listCategorie.map((item,index)=>
                                <option key={index} value={item.id}>{item.libelle}</option>
                            )
                        }
                        </select>
                    </div>
                    <div className="col-lg-4 mt-1">
                        <textarea type="text" ref={titre} className={ !theme ? "form-control mb-2" : "form-control mb-2 darkMode border-dark text-white"} placeholder="Titre" aria-label="name" aria-describedby="basic-addon2"/>
                    </div>
                    <div className="col-lg-4 mt-1">
                        <button type="button" className={ !theme ? "form-control mb-2" : "form-control mb-2 darkMode border-dark"}
                        data-bs-target="#domaine" data-bs-toggle="modal">Domaine</button>
                    </div>
                    <div className="col-lg-3 mt-1">
                        <label className="col-12 mx-4">Date debut</label>
                        <input type="date" ref={date_debut} className={ !theme ? "form-control mb-2" : "form-control mb-2 darkMode border-dark"} placeholder="Date debut" aria-label="password" aria-describedby="basic-addon4"/>
                    </div>
                    <div className="col-lg-3 mt-1">
                        <label className="col-12 mx-4">Date cloture</label>
                        <input type="date" ref={date_cloture} className={ !theme ? "form-control mb-2" : "form-control mb-2 darkMode border-dark"} placeholder="Date cloture" aria-label="password" aria-describedby="basic-addon4"/>
                    </div>
                    <div className="col-lg-3 mt-1">
                        <label className="col-12 mx-4">Date debut recolte de données</label>
                        <input type="date" ref={date_recolte_debut} className={ !theme ? "form-control mb-2" : "form-control mb-2 darkMode border-dark"} placeholder="Date debut recolte de donées" aria-label="password" aria-describedby="basic-addon4"/>
                    </div>
                    <div className="col-lg-3 mt-1">
                        <label className="col-12 mx-4">Date fin recolte de données</label>
                        <input type="date" ref={date_recolte_fin} className={ !theme ? "form-control mb-2" : "form-control mb-2 darkMode border-dark"} placeholder="Date fin recolte de donées" aria-label="password" aria-describedby="basic-addon4"/>
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
                            <th className="col-1" style={{backgroundColor:"lightgray"}}>Catégorie</th>
                            <th className="col-3" style={{backgroundColor:"lightgray"}}>Titre</th>
                            <th className="col-1" style={{backgroundColor:"lightgray"}}>Date debut</th>
                            <th className="col-1" style={{backgroundColor:"lightgray"}}>Date cloture</th>
                            <th className="col-1" style={{backgroundColor:"lightgray"}}>Date debut recolte donnée</th>
                            <th className="col-1" style={{backgroundColor:"lightgray"}}>Date cloture recolte donnée</th>
                            <th className="col-1" style={{backgroundColor:"lightgray"}}>Statut</th>
                            <th className="col-1" style={{backgroundColor:"lightgray"}}></th>
                        </tr>
                    </thead>
                    <tbody>
                        { data.map((item,index)=>(
                            
                        <tr >
                            {
                            actuelChange.id !== item.id ? (
                            <>
                            {
                                item.planning_categorie===undefined ?
                                <td></td>
                                :
                                <td className="col-2"><textarea className="col-12 form-control" type="text" value={item.planning_categorie.libelle} onClick={()=>handleChangeCurrent(item)}></textarea></td>
                            }
                            <td className="col-5"><textarea className="col-12 form-control" type="text" value={item.titre} onClick={()=>handleChangeCurrent(item)}></textarea></td>
                            <td className="col-1"><input className="col-12 form-control" type="date" value={item.date_debut} onClick={()=>handleChangeCurrent(item)}></input></td>
                            <td className="col-1"><input className="col-12 form-control" type="date" value={item.date_cloture} onClick={()=>handleChangeCurrent(item)}></input></td>
                            <td className="col-1"><input className="col-12 form-control" type="date" value={item.date_recolte_debut} onClick={()=>handleChangeCurrent(item)}></input></td>
                            <td className="col-1"><input className="col-12 form-control" type="date" value={item.date_recolte_fin} onClick={()=>handleChangeCurrent(item)}></input></td>
                            <td className="col-1"><input className="col-12 form-control" type="text" value={item.statut} onClick={()=>handleChangeCurrent(item)}></input></td>
                            </>
                            ):(
                                <>
                                {
                                    item.planning_categorie===undefined ?
                                    <td></td>
                                    :
                                    <td className="col-2">
                                         <select className={ !theme ? "form-control mb-2" : "form-control mb-2 darkMode border-dark text-white"} placeholder="Role" ref={categorie} onChange={()=>handleUpdateCurrent()} >
                                                {
                                                listCategorie.map((itemC,index)=>
                                                    <option key={index} value={itemC.id}
                                                        selected={itemC.id === item.id_categorie}
                                                    >{itemC.libelle}</option>
                                                )
                                            }
                                            </select>
                                    </td>
                                }
                                <td className="col-5"><textarea className="col-12 form-control" type="text" onChange={()=>handleUpdateCurrent()} ref={titre}></textarea></td>
                                <td className="col-1"><input className="col-12 form-control" type="date" onChange={()=>handleUpdateCurrent()} ref={date_debut}></input></td>
                                <td className="col-1"><input className="col-12 form-control" type="date" onChange={()=>handleUpdateCurrent()} ref={date_cloture}></input></td>
                                <td className="col-1"><input className="col-12 form-control" type="date" onChange={()=>handleUpdateCurrent()} ref={date_recolte_debut}></input></td>
                                <td className="col-1"><input className="col-12 form-control" type="date" onChange={()=>handleUpdateCurrent()} ref={date_recolte_fin}></input></td>
                                <td className="col-1"><input className="col-12 form-control" type="text" onChange={()=>handleUpdateCurrent()} ref={statut}></input></td>
                                </>
                            )}
                            <td className="col-1">
                                <div className="mx-1">
                                <OverlayTrigger placement="top" overlay={<Tooltip>Domaine</Tooltip>}>
                                    <button className="btn btn-secondary rounded-3 shadow" onClick={()=>handleSeeDomaine(item)} 
                                    data-bs-target="#detail" data-bs-toggle="modal">
                                        {/* <i className="bi bi-info-lg"></i> */}
                                        Domaine
                                    </button>
                                </OverlayTrigger>
                                </div>
                            </td>
                            <td className="col-1">
                                {/* <div className="col-4 mx-1">
                                <OverlayTrigger placement="top" overlay={<Tooltip>Cloturée</Tooltip>}>
                                    <button className="btn btn-dark rounded-3 shadow" onClick={()=>handleCloturer(item)} 
                                    data-bs-target="#detail" data-bs-toggle="modal">
                                        <i class="bi bi-x-square"></i>
                                    </button>
                                </OverlayTrigger>
                                </div> */}
                                {
                                    // item.id === data[data.length-1].id ?(
                                    //     <div className="col-4 mx-1">
                                    //         <OverlayTrigger placement="top" overlay={<Tooltip>Ajout</Tooltip>}>
                                    //             <button className="btn btn-secondary rounded-1 shadow" onClick={() => handleAjout(true)} ><i className="bi bi-plus"></i></button>
                                    //         </OverlayTrigger>
                                    //     </div>
                                    // ):(
                                    //     <></>
                                    // )
                                }
                                
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
                                            listProcessusDomaine.filter(proc=>proc.id!==0).map((processus,index)=>
                                                <tr key={index}>
                                                    <td>{processus.libelle_processus}</td>
                                                    <td><input type="checkbox" value={processus.id}  onChange={() => handleCheckedDomaine(processus.id)} checked={processus.checked}/></td>
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
                                                listProcessusChecked.filter(proc=>proc.id!==0).map((processus,index)=>
                                                    <tr key={index}>
                                                        <td>{processus.libelle_processus}</td>
                                                        <td><input type="checkbox" value={processus.id}  onChange={() => handleCheckedProcessus(processus.id)} checked={processus.checked}/></td>
                                                    </tr>
                                                )
                                                ):(
                                                listProcessus.filter(proc=>proc.id!==0).map((processus,index)=>
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

                <div className="modal fade" id="categorie" data-backdrop="static" data-keyboard="false">
                    <div className="modal-dialog modal-sm modal-dialog-right ">
                        <div className={"modal-content"}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Ajout de catégorie</h5>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleAddCategorie}>
                                        <div>
                                            <label className="row mx-2">
                                                Libelle
                                            </label>
                                            <input className="row mx-1 mb-2 form-control" type="text" name="libelle"></input>
                                        </div>
                                        <div>
                                            <label className="row mx-2">
                                                Abreviation
                                            </label>
                                            <input className="row mx-1 mb-2 form-control" type="text" name="abbrv"></input>
                                        </div>
                                        <button data-bs-dismiss="modal" type="submit" className="mx-2 btn btn-secondary rounded-1 shadow modal-">Valider</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Planning;