import { useState } from "react"
import { useEffect } from "react"
import { TitlePage } from "../templates/templates"
import { Cookies, useCookies } from "react-cookie"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import axios from "axios"
import {useLocation} from "react-router-dom"

import  {setObjectifData, setObjectifUserData, deleteObjectif  , updateObjectif,
            setParametrageObjectifData, deleteParametrageObjectif,
            addObjectif, 
            setUniteData,
            setRecuperationData,
            updateUnite,
            addParametrageObjectif
        } from "../feature/objectifs.slice"
import {Success, Confirmation} from "../service/service-alert";
import Global_url from "../../global_url"
import FichierExcel from "../import_export/FichierExcel"
import { setExportData, setHeadingData } from "../feature/importExport.slice"
import Synthese from "./Synthese"
import Unite from "./Unite"
import Recuperation from "./Recuperation"
import { Button, OverlayTrigger, Tooltip, Table, Form } from 'react-bootstrap';
import Processus from "../Processus/Processus"


var Url = Global_url


const GestionObjectif = ({MenuCollapse,theme,page}) => {
    const dispatch = useDispatch();
    const parametrage = useSelector((state) => state.parametrageObjectif.parametrageObjectif)
    const objectif = useSelector((state) => state.objectif.objectif)
    const importData = useSelector((state) => state.import.import)
    const [liste,setListe] = useState([]);
    const [cookies, setCookie] = useCookies(['islogged_react','matricule_react','role_react','nom_complet_react',"id_user","id_processus","page"])
    const location = useLocation();
    // const [page,setPage] = useState(cookies.page);
    const [valideDispatch, setDispatch] = useState(true);
    const [modeUpdate, setModeUpdate] = useState(false);
    const [afterFilter, setAfterFilter] = useState(false);
    const [modeEdit, setModeEdit] = useState();
    const [modaleFiltre, setModaleFiltre] = useState(false);
    const [modaleAjout, setModaleAjout] = useState(false);

    const processus =  useSelector((state) => state.processus.processusUser)
    const processusUser =  useSelector((state) => state.processus.processusUser)
    const uniteParam = useSelector((state) => state.unite.Unite)
    const recuperationParam = useSelector((state) => state.recuperation.Recuperation)

    const colonneTable = [
        {nom : "Processus",  tableColonne : "id_processus"},
        {nom : "Objectif", tableColonne : "objectifs"},
        {nom : "Poids", tableColonne : "poids"},
        {nom : "Cible", tableColonne : "cible"},
        {nom : "Unite", tableColonne : "id_unite"},
        {nom : "Recuperation", tableColonne : "recuperation"},
    ]

    const colonneTriage = [
        {"Processus" : 1},{"Objectif" : 1},
        {"Poids" : 1},{"Cible" : 1},
        {"Unite" : 1},{"recuperation" : 1},
    ]

    const [triage, setTriage] = useState(colonneTriage);

    useEffect(()=>{ 
        getPage();
    })
    useEffect(()=>{  
        initialiseRecuperation();
        initialiseUnite();
        initialiseObjectif();
    },[])

    async function initialiseObjectif(){
        console.log("initialiseObjectif")
        
        let processusUser =processus

        // console.log(processus)
        if(processus[0].id === null){
            console.log("processus null")
            processusUser = await axios.post(Url+"/getProcessusByUser",{id_user:cookies.id_user})
            processusUser = processusUser.data
        }
        // console.log(processusUser)

        // console.log(processus)
        const objUser = await axios.post(Url+"/getParametrageObjectifUser",{processus : processusUser})
            // console.log(objUser.data)
            dispatch(setObjectifData(objUser.data))
            setDispatch(true)
            dispatch(setExportData(traitementExportData(objUser.data)))
            const headings = getHeadingsExcel()
            dispatch(setHeadingData(headings))
        return objUser.data
    }
    async function initialiseUnite(){
        console.log("initialiseUnite")
        let obj= await axios.get(Url+"/getParamObjUnite")
        dispatch(setUniteData(obj.data));
        obj = obj.data
        // console.log(obj)
        return obj
    }
    async function initialiseRecuperation(){
        console.log("initialiseRecuperation")
        let obj= await axios.get(Url+"/getParamObjRecuperation")
        dispatch(setRecuperationData(obj.data));
        obj = obj.data
        // console.log(obj)
        return obj
    }

    function getHeadingsExcel(){
        const headings = []
        colonneTable.map((objet) => (
            objet.nom !== 'Unite' ?
                headings.push(objet.nom)
            :
                null
        ))
        headings.push("Support")
        headings.push("Date creation")

        return headings
    }

    function getPage(){
        // const params = new URLSearchParams(location.search);
        // setCookie('page',params.get('page'));  
        // console.log(page+ " : " +params.get('page'));
        // setPage(params.get('page'))
        
        // console.log("dispatch : "+ valideDispatch);
        // console.log(afterFilter)
        // console.log("page : "+page)
        if(afterFilter === false){
            
            setListe(objectif)
            // console.log(objectif)
            dispatch(setExportData(traitementExportData(objectif)))
            if(page==="1" && valideDispatch===true){
                // initialiseObjectif()
                
                setDispatch(false);
                setListe(objectif);
            }
        }
        if(page==="2"){
            setDispatch(true);
            setListe(parametrage);
        }
        // setAfterFilter(true);
        // console.log(liste)
    }

   function updateObjectifController(objectif){
        Confirmation(theme, "Êtes-vous sûr(e) de vouloir modifier cette objectif ?", "Oui, modifier !", true).then(
            (result) => {
                if (result.isConfirmed) {
                    Success(theme, "Modification terminer");
                    console.log(objectif)
                    axios.post(Url+"/updateParametrageObjectif",{objectif})
                    setModeUpdate(false)
                    setModeEdit(0)
                    dispatch(updateObjectif(objectif))
                }   
            }
        );
   }

   function saveObjectifController(objectif){
        console.log(objectif)
        Confirmation(theme, "Êtes-vous sûr(e) de vouloir ajouter cette objectif ?", "Oui, ajouter !", true).then(
            (result) => {
                if (result.isConfirmed) {
                    Success(theme, "Ajout terminer");
                    console.log(objectif)
                    axios.post(Url+"/insertParametrageObjectif",{objectif})
                    setModeUpdate(false)
                    setModeEdit(0)
                    // dispatch(addObjectif(objectif))
                    resetInputs();
                    initialiseObjectif()
                }   
            }
        );
    }

    const handleUpdateListe = (index, direct) =>{
        console.log("updateListe")
        let allParam = [];
        const tbody = document.querySelector('tbody');
        const trs = tbody.querySelectorAll('tr');
        let objectif = {} 
        let pageObjectif = false;
        setModeUpdate(false)
        // console.log(index)
        for(let tr of trs){
            let param = {id:null, id_processus:"", objectifs:"",poids:"", cible:"",id_unite:"",recuperation:"",index:""};
            const tds = tr.querySelectorAll('td');
            tds.forEach(td => {
                const inputs = td.querySelectorAll('input');
                const selects = td.querySelectorAll('select');
                const textareas = td.querySelectorAll('textarea');
                textareas.forEach(textarea => {
                    if(textarea.name === 'objectif') param.objectifs = textarea.value
                    if(textarea.name === 'support') param.support = textarea.value
                })
                inputs.forEach(input => {
                    if(input.name === 'id') param.id = Number(input.value)
                    if(input.name === 'index') param.index = input.value
                    if(input.name === 'id_processus') param.id_processus = Number(input.value)
                    if(input.name === 'objectif') param.objectifs = input.value
                    if(input.name === 'poids') param.poids = Number(input.value.replace(',','.'))
                    if(input.name === 'cible') param.cible = input.value.replace(',','.')
                })
                selects.forEach(select => {
                    if(select.name === 'unite') param.id_unite = Number(select.value)
                    if(select.name === 'recuperation') param.recuperation = Number(select.value) 
                    if(select.name === 'processus') param.id_processus= Number(select.value) 
                })
            });
            if(page==="1" && param.id===index){
                objectif = param;
                pageObjectif = true;
                break;
            }
            if(page==="2"){
                param.id = null
                allParam.push(param)
            }
            if(direct){
                objectif = param
                
            }
            if(index===null && page !== "2"){
                break;
            }
        };
        allParam = allParam.filter(data => data.objectifs !== "")
        if(direct){
            console.log("save")
            saveObjectifController(objectif)
        }
        if(pageObjectif === true && !direct){
            updateObjectifController(objectif);
        }
        if(page==="2"){
            dispatch(setParametrageObjectifData(allParam));
            resetInputs();
        }
        console.log(allParam)
        return allParam;
    }

    const resetInputs = () => {
        console.log("resetInputs")
        setModeUpdate(false)
        var inputs = document.querySelectorAll('#inputParametrage');
        inputs.forEach(input => {
            input.value = '';
        })
    };

    const resetTableau = () => {
        console.log("resetTableau")
        setModeUpdate(false)
        const param = {index:0, id_processus:"", objectifs:"",poids:"", cible:"",id_unite:"",recuperation:""};
        const allParam = [];
        allParam.push(param);
        dispatch(setParametrageObjectifData(allParam));
    };

    const handleResetTableau = () => {
        Confirmation(theme, "Êtes-vous sûr(e) de vouloir reinitialiser le tableau ?", "Oui, initialiser le tableau !", true).then(
            (result) => {
                if (result.isConfirmed) {
                    Success(theme, "Reinitialisation terminer");
                    resetTableau()
                }
            }
        );
    };

    const saveAll = async () =>{
        console.log("saveAll")
        console.log(handleUpdateListe(null))
        setModeUpdate(false)
        const objectifs = handleUpdateListe(null)
        console.log(objectifs)
        await axios.post(Url+"/insertManyParametrageObjectif",{objectifs})
        resetTableau();
        initialiseObjectif();
    }

    const handleSaveAll = () => {  
        Confirmation(theme, "Êtes-vous sûr(e) de vouloir sauvegarder ces objectifs ?", "Oui, sauvegarder !", true).then(
            (result) => {
                if (result.isConfirmed) {
                    Success(theme, "Sauvegarder avec succes");
                    saveAll()
                }   
            }
        );
    };

    const handleDeleteParam = (item) =>{
        console.log("delete");
        setModeUpdate(false);
        dispatch(deleteParametrageObjectif(item));
    }

    const handleUpdate = () =>{
        console.log("update");
        if(modeUpdate===false){
            setModeUpdate(true)
        }
    }

    const handleDeleteObjectif= (item) => {
        console.log("delete objectif:"+item.id)
        setModeUpdate(false)
        const id = item.id
        Confirmation(theme, "Êtes-vous sûr(e) de vouloir supprimer cette objectif", "Oui, supprimer !", true).then(
            (result) => {
                if (result.isConfirmed) {
                    Success(theme, "Suppression terminer");
                    axios.post(Url+"/desactiveParametrageObjectif",{id});
                    dispatch(deleteObjectif(item));
                }   
            }
        );
    }

    const handleTriage= (name) => {
        console.log("triage - "+name+" : "+triage[name])
        setModeUpdate(false)
        let triageListe = [];
        if(triage[name] === 1){
            setTriage(prevTableau => ({
                ...prevTableau,
                [name]: 0
            }));
            triageListe =  [...liste].sort((a, b) => 
            a[name] > b[name] ? 1 : -1
            );
        }else{
            setTriage(prevTableau => ({
                ...prevTableau,
                [name]: 1
            }));
            triageListe =  [...liste].sort((a, b) => 
                a[name] < b[name] ? 1 : -1
            );
        }
        console.log(triageListe)
        dispatch(setExportData(traitementExportData(triageListe)))
        if(page==="1"){
            dispatch(setObjectifData(triageListe))
        }
        if(page==="2"){
            dispatch(setParametrageObjectifData(triageListe))
        }
        setAfterFilter(false)
    }

    const handleFiltre = (e) => {
        e.preventDefault();
        setAfterFilter(true)
        console.log("filter")
        let filter = {};
        filter.id_processus = Number(e.currentTarget.elements.processus.value)
        filter.objectifs = e.currentTarget.elements.objectifs.value

        if(modaleFiltre){
            filter.id_unite = Number(e.currentTarget.elements.unite.value)
            filter.poidsMax = Number(e.currentTarget.elements.poidsMax.value.replace(',','.'))
            filter.poidsMin = Number(e.currentTarget.elements.poidsMin.value.replace(',','.'))
            filter.cibleMax = e.currentTarget.elements.cibleMax.value.replace(',','.')
            filter.cibleMin = e.currentTarget.elements.cibleMin.value.replace(',','.')
            filter.recuperation = Number(e.currentTarget.elements.recuperation.value)
            filter.support = e.currentTarget.elements.support.value
        }
        // console.log(Ni)
        console.log(filter)
        let listFiltre = objectif;
        console.log(objectif)
        
        if(filter.id_processus !== 0) listFiltre = listFiltre.filter(item => item.id_processus === filter.id_processus)
            console.log(listFiltre)
        if(filter.objectifs !== "") listFiltre = listFiltre.filter(item => item.objectifs.toLowerCase().includes(filter.objectifs.toLowerCase()))
            console.log(listFiltre)

        if(modaleFiltre){
            if(filter.poidsMax !== 0) listFiltre = listFiltre.filter(item => item.poids.toString() >= filter.poidsMin.toString() && item.poids.toString() <= filter.poidsMax.toString())
                console.log(listFiltre)
            if(filter.cibleMax !== "" && filter.cibleMin !== "") listFiltre = listFiltre.filter(item => Number(item.cible) >= Number(filter.cibleMin) && Number(item.cible) <= Number(filter.cibleMax))
                console.log(listFiltre)
            if(filter.cibleMin === "" && filter.cibleMax !== "") listFiltre = listFiltre.filter(item => item.cible.toLowerCase().includes(filter.cibleMax.toLowerCase()))
                console.log(listFiltre)
            if(filter.id_unite !== 0) listFiltre = listFiltre.filter(item => item.id_unite === filter.id_unite)
                console.log(listFiltre)
            if(filter.recuperation !== 0)  listFiltre = listFiltre.filter(item => item.recuperation === filter.recuperation)
                console.log(listFiltre)
            if(filter.support !== "") listFiltre = listFiltre.filter(item => item.support.toLowerCase().includes(filter.support.toLowerCase()))
        }
        console.log(listFiltre)
        // dispatch(setObjectifData(listFiltre));
        dispatch(setExportData(traitementExportData(listFiltre)))
        setListe(listFiltre);
        
            // const obj = initialiseObjectif()
            
        
    }

    const handleInitialiserFiltre = () => {
        console.log(objectif)
        resetInputs();
        dispatch(setExportData(traitementExportData(objectif)))
        setListe(objectif);
        setAfterFilter(false);
    }

    function handleActualise(){
        console.log("actualisation")
        initialiseObjectif()
        resetInputs();
        setAfterFilter(false);
    }

    function handleImport(){
        console.log("importData")
        let dataPossible = importData.filter(data=> data[0].toLowerCase() !== 'processus'.toLowerCase())
        dataPossible = dataPossible.filter(data => !isNaN(Number(data[2])))

        // console.log(dataPossible)
        const allData = []
        let nb = 1;
        for(let objet of dataPossible){
            const imp = {}
            // console.log(objet[0])
            // console.log(processus)
            const proc =  processus.filter(processus => processus.excel === objet[0] || processus.libelle_processus === objet[0])
            // console.log(proc)
            if(proc.length>0 ){
                imp.index = nb
                imp.id_processus = proc[0].id
                imp.objectifs = objet[1];
                imp.poids = objet[2];
                // console.log(uniteParam)
                let allUnite = []
                if(uniteParam.length){
                    allUnite = uniteParam
                }else{
                    allUnite = initialiseUnite()
                }
                        for(let unites of allUnite){
                            if(imp.objectifs.includes(unites.abbrv)){
                                imp.cible = objet[3];
                                imp.id_unite = unites.id
                            }
                            if(imp.objectifs.includes("%")){
                                imp.cible = objet[3]*100;
                            }
                        }
                    
                let recuperationAll = []
                if(recuperationParam.length){
                    recuperationAll = recuperationParam.filter(rec => rec.type_recuperation === objet[4])
                }else{
                    let rec = [] 
                    rec = initialiseRecuperation()
                    recuperationAll = rec.filter(rec => rec.type_recuperation === objet[4])
                }
                
                
                imp.recuperation = recuperationAll[0].id
                imp.support = objet[5]
                // console.log(imp)
                allData.push(imp)
                nb++
            }
        }
        console.log(allData)
        setModeUpdate(false)
        dispatch(setParametrageObjectifData(allData.filter(data => data.objectifs !== "")))
        // initialiseObjectif()
    }


    const handleModaleFiltre = () => {
            if(modaleFiltre){
                setModaleFiltre(false)
            }else{
                setModaleFiltre(true)
            }
            
    }
    const handleModeEdit = (id) => {
            setModeEdit(id)
    }

    function traitementExportData(datas){
        const headings = getHeadingsExcel()
        dispatch(setHeadingData(headings))
        let allData = []
        if(datas.length>0){
            for(let data of datas){
                let newData = {}
                // newData.id = data.id;
                if(processus[0].id !== null){
                    newData.processus = processus.filter(proc => proc.id === data.id_processus)[0].excel
                }
                newData.objectifs = data.objectifs;
                newData.poids = data.poids;
                if(uniteParam[0].id !== null){
                    console.log(uniteParam[0].id)
                    const unite = uniteParam.filter(item => item.id === data.id_unite)[0].abbrv
                    newData.cible = data.cible+""+unite
                }
                // else{
                //     const unite = initialiseUnite();
                //     newData.cible = data.cible+""+unite
                // }

                // console.log(unite)
                if(recuperationParam[0].id !== null){
                    newData.recuperation = recuperationParam.filter(proc => proc.id === data.recuperation)[0].type_recuperation
                }
                // else{
                //     let recup = []
                //     recup = initialiseRecuperation()
                //     console.log(recup[0])
                //     newData.recuperation = recup.filter(proc => proc.id === data.recuperation)[0].type_recuperation
                // }
                newData.support = data.support
                newData.create = data.createat
                // console.log(newData)
                allData.push(newData)
            }
        }
        return allData
    }

    const handleModaleAjout = () => {
        if(modaleAjout){
            setModaleAjout(false)
        }else{
            setModaleAjout(true)
        }
        
    }

    const handleAddObjectif = (e) => {
        e.preventDefault();
        let ajout = {};
        console.log("addObjectif")
        ajout.id_processus = Number(e.currentTarget.elements.processus.value)
        ajout.id_unite = Number(e.currentTarget.elements.unite.value)
        ajout.objectifs = e.currentTarget.elements.objectifs.value
        ajout.poids = e.currentTarget.elements.poids.value
        ajout.cible = e.currentTarget.elements.cible.value
        ajout.recuperation = Number(e.currentTarget.elements.recuperation.value)
        ajout.support = e.currentTarget.elements.support.value

        if(page==="1"){
            console.log("save")
            saveObjectifController(ajout)
            // resetInputs();
        }
        if(page==="2"){
            console.log("page2 save")
            dispatch(addParametrageObjectif(ajout));
            resetInputs();
        }
                
        
        console.log('Formulaire soumis:',ajout);
    }
    


  return (
        <div  className={!MenuCollapse ? "content" : "contentCollapse"}>
            <TitlePage title={page==="1" ? "Liste des objectifs" : "Parametrage objectifs"} process={false} theme={theme}/>
            
                
                { page === "1" ? 
                <>
{/* filtre */}
                
                <form onSubmit={handleFiltre}>
                <div className="row mb-3" >
                                {!modaleFiltre ? (
                                    <div className="col-lg-3"></div>
                                ):(
                                    <></>
                                )}
                            <div className="col-2">
                                
                                {/* <div className="row"> */}
                                {/* <input onClick={handleUpdate} className="col-2" type="checkbox" name="validateProcessus"></input> */}
                                <select className="col-12 form-control"  name="processus">
                                    <option key={0} value="0">Processus</option> 
                                    {
                                        processus.filter(process => process.id !== 0).map((processus, index) => (
                                            <option 
                                                key={index}
                                                value={processus.id}
                                            >
                                                {processus.libelle_processus}
                                            </option> 
                                        ))
                                    }
                                    
                                </select>
                                {/* </div> */}
                            </div> 
                            <div className="col-3"><input onClick={handleUpdate} className="col-11 form-control" type="texte" size="40" name="objectifs" placeholder="objectif" id="inputParametrage"></input></div>
                            
                            {modaleFiltre === true ? (
                                <>
                                <div className="col-1">
                                    <input onClick={handleUpdate} className="col-12 form-control" type="text" name="poidsMin" placeholder="Poids min" id="inputParametrage"></input>
                                    <input onClick={handleUpdate} className="col-12 form-control" type="text" name="poidsMax" placeholder="Poids max" id="inputParametrage"></input>
                                </div>
                                <div className="col-1">
                                    <input onClick={handleUpdate} className="col-12 form-control" type="text" name="cibleMin" placeholder="Cible min" id="inputParametrage"></input>
                                    <input onClick={handleUpdate} className="col-12 form-control" type="text" name="cibleMax" placeholder="Cible max" id="inputParametrage"></input>
                                </div>
                                <div className="col-2">
                                    {/* <div className="row"> */}
                                    {/* <input onClick={handleUpdate} className="col-2" type="checkbox" name="validateUnite" id="inputParametrage"></input> */}
                                    <select className="col-12 form-control"  name="unite">
                                        <option key={0} value={0}>Uniter</option>
                                        {
                                            uniteParam.length>0 &&
                                            uniteParam.map((uniteParam, index) => (
                                                <option 
                                                    key={index}
                                                    value={uniteParam.id}
                                                >
                                                    {uniteParam.abbrv}
                                                </option> 
                                            ))
                                        }
                                    </select>
                                    {/* </div> */}
                                </div>
                                
                                <div className="col-2">
                                    {/* <div className="row"> */}
                                    {/* <input onClick={handleUpdate} className="col-2" type="checkbox" name="validateRecuperation"></input> */}
                                    
                                    <select className="col-12 form-control" name="recuperation">
                                        <option key={0} value={0}>Recuperation</option>
                                        {
                                            recuperationParam.length>0 &&
                                            recuperationParam.map((recuperationParam, index) => (
                                                <option 
                                                    key={index}
                                                    value={recuperationParam.id}
                                                >
                                                    {recuperationParam.type_recuperation} 
                                                </option> 
                                            ))
                                        }
                                    </select>
                                    <input onClick={handleUpdate} className="col-12 form-control" type="text" name="support" placeholder="Support" id="inputParametrage"></input>
                                    {/* </div> */}
                                </div>
                                
                            </>) : (<></>)}
                                <div className="col-1">
                                        <button className="btn btn-success rounded-1 shadow" type="submit" >Filtrer</button>
                                </div>
                </div>
                </form>
                
                
                    
                        
                <div className="row col-6 mb-3">
                    <div className="col-1">
                        <OverlayTrigger placement="top" overlay={<Tooltip>Ajout</Tooltip>}>
                            <button className="btn btn-success rounded-1 shadow" onClick={() => handleModaleAjout(true)} ><i className="bi bi-plus"></i></button>
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
                    <div className="col-1">
                        <OverlayTrigger placement="top" overlay={<Tooltip>Actualisation</Tooltip>}>
                            <button className="btn btn-primary rounded-1 shadow" onClick={() => handleActualise()} ><i className="bi bi-arrow-repeat"></i></button>
                        </OverlayTrigger>
                    </div>
                    <div className="col-1">
                            <Synthese />
                    </div>
                    <div className="col-4">
                        <FichierExcel action={"2"}/>
                    </div>  
                </div>
                            
                </>
                :
                <>
                    <div className="row mb-4" style={{heigth:''}}>
                        <div className="col-lg-1 ">
                            <OverlayTrigger placement="top" overlay={<Tooltip>Ajouter un objectif</Tooltip>}>
                                <button className="btn btn-success rounded-1 shadow  mx-2" onClick={() => handleModaleAjout(true)} ><i className="bi bi-plus"></i></button>
                            </OverlayTrigger>
                        </div>
                        <div className="col-lg-3 mx-2">
                            <FichierExcel action={"1"}/>
                        </div>
                        <button className="col-lg-1 mx-3 btn btn-warning rounded-4 shadow" onClick={() => handleImport()} >Valider le fichier</button>
                        <button className="col-lg-2 mx-1 btn btn-outline-success btn-md" onClick={handleSaveAll}>Sauvegarder les données</button>
                        <button className="col-lg-2 mx-1 btn btn-outline-danger btn-md" onClick={handleResetTableau}>Initialiser le tableau</button>
                    </div>
                </>
                }
                
                 
{/* ajout */} 
            
            { modaleAjout ? (
            <form onSubmit = {handleAddObjectif}>
            <tr className="row mb-3">
                <td className="col-2">
                    <select className="col-12" name="processus" >
                        {
                            processus.length>0 &&
                            processus.map((processus, index) => (
                                <option 
                                    key={index}
                                    value={processus.id}
                                    selected={processus.id === 1}
                                >{processus.libelle_processus}</option> 
                            ))
                        }
                    </select>
                </td>
                <td className="col-4"><textarea className="col-12" name="objectifs" id="inputParametrage" placeholder="Objectif" required></textarea></td>
                <td className="col-1"><input className="col-12" type="text" name="poids" id="inputParametrage" placeholder="Poids" required></input></td>
                <td className="col-1"><input className="col-12" type="text" name="cible" id="inputParametrage" placeholder="Cible" required></input></td>
                <td className="col-1">
                        
                        <select className="col-12 mb-1"  name="unite">
                                    <option 
                                        key={0}
                                        value={1}
                                    >Unité</option>
                            {
                                uniteParam.length>0 &&
                                uniteParam.map((uniteParam, index) => (
                                    <option 
                                        key={index}
                                        value={uniteParam.id}
                                    >{uniteParam.abbrv}</option> 
                                ))
                            }
                            
                        </select>
                        
                        
                </td>
                
                <td className="col-2">
                    <select className="col-12" name="recuperation">
                                    <option 
                                        key={0}
                                        value={1}
                                    >Recuperation</option>
                        
                        {
                            recuperationParam.length>0 &&
                            recuperationParam.map((recuperationParam, index) => (
                                <option 
                                    key={index}
                                    value={recuperationParam.id}
                                >{recuperationParam.type_recuperation}</option> 
                            ))
                        }
                    </select>            
                    <textarea className="col-12" name="support" id="inputParametrage" placeholder="Support"></textarea>
                
                </td>
                
                {
                page !== "1" ? (
                <td className="col-1">
                    <button  className="btn btn-success btn-sm rounded-2 shadow mb-1 ms-1" type="submit" onClick={() => handleAddObjectif(null, false)} >Ajouter</button>
                    <button  className="btn btn-warning btn-sm rounded-2 shadow" onClick={resetInputs}>Initialiser</button>
                </td>
                ):(
                <td className="col-1">
                    <button  className="btn btn-success btn-sm rounded-2 shadow mb-1 ms-1" type="submit" onClick={() => handleAddObjectif(null, true)} >Ajouter</button>
                    <button  className="btn btn-warning btn-sm rounded-2 shadow" onClick={resetInputs}>Initialiser</button>
                </td>)}
            </tr>
            </form>
            ) : (<></>)}
            
            <Table className="row">
                <thead className="mt-2 mb-2">
                <tr className="row" key ={-1}>
                    {
                        colonneTable.map((colonne,index) => (
                           
                                <th className={colonne.nom === "Processus" ? "col-2" : colonne.nom === "Objectif" ? "col-4" : colonne.nom === "Recuperation" ? "col-2" :"col-1"} key={index}> 
                                    <div className="row">
                                        <div className="col-1">
                                            {triage[colonne.tableColonne]===1 
                                                ?<i className="bi bi-sort-up-alt" onClick={() => handleTriage(colonne.tableColonne)}></i>
                                                :<i className="bi bi-sort-down-alt" onClick={() => handleTriage(colonne.tableColonne)}></i>
                                            }
                                        </div> 
                                        { colonne.nom === "Recuperation" ?
                                        <>
                                        <div className="col-7">{colonne.nom}</div> 
                                        <div className="col-1"><Recuperation/></div>
                                        </>
                                        :
                                        colonne.nom === "Unite" ?
                                        <>
                                        <div className="col-4">{colonne.nom}</div> 
                                        <div className="col-1"><Unite/></div>
                                        </>
                                        :
                                        colonne.nom === "Processus" & processusUser.map(process=>process.id).includes(0) ?
                                        <>
                                        <div className="col-7">{colonne.nom}</div> 
                                        <div className="col-1"><Processus/></div>
                                        </>
                                        :
                                        <div className="col-5">{colonne.nom}</div> 
                                        }
                                    </div>
                                </th>
                            
                        ))}
                    </tr>
                </thead>
                
                <tbody style={{ overflowY: 'auto', height: '500px' }}>
{/*liste*/}
                    {
                        liste.length>0 &&
                        liste.filter(item=> item.index !== 0 && item.activate !== 0).map((item, index) =>(
                        <tr key={item.index} className="row mb-2">  
                        {modeEdit===item.id ? ( 
                            <>   
                            <td className="col-2">
                                <select className="col-12"  name="processus">
                                    {
                                        processus.length>0 &&
                                        processus.map((processus, index) => (
                                            
                                            <option 
                                                key={index}
                                                value={processus.id}
                                                selected={processus.id === item.id_processus}
                                            >
                                                {processus.libelle_processus}
                                            </option> 
                                        ))
                                    }
                                </select>
                            </td>                
                            <td className="col-4"><textarea onClick={handleUpdate} className="col-12" type="textarea" size="40" name="objectif" defaultValue={item.objectifs}></textarea></td>
                            <td className="col-1"><input onClick={handleUpdate} className="col-12" type="text" name="poids" defaultValue={item.poids}></input></td>
                            <td className="col-1">
                                <input onClick={handleUpdate} className="col-12" type="text" name="cible" defaultValue={item.cible}></input>
                                <input type="hidden" name="id" defaultValue={item.id}></input>
                                <input type="hidden" name="index" defaultValue={index+1}></input>
                            </td>
                            <td className="col-1">
                                
                                <select className="col-12"  name="unite">
                                    {
                                        uniteParam.length>0 &&
                                        uniteParam.map((uniteParam, index) => (
                                            <option 
                                                key={index}
                                                value={uniteParam.id}
                                                selected={uniteParam.id === item.id_unite}
                                            >
                                                {uniteParam.abbrv}
                                            </option> 
                                        ))
                                    }
                                </select>
                            </td>
                            
                            <td className="col-2">
                                <select className="col-12" name="recuperation">
                                    {
                                        recuperationParam.length>0 &&
                                        recuperationParam.map((recuperationParam, index) => (
                                            <option 
                                                key={index}
                                                value={recuperationParam.id}
                                                selected={recuperationParam.id=== item.recuperation}
                                            >
                                                {recuperationParam.type_recuperation} 
                                            </option> 
                                        ))
                                    }
                                </select>
                                <textarea onClick={handleUpdate} className="col-12" type="text" name="support" defaultValue={item.support}></textarea>
                        
                            </td>
                            </>
                        ) : (
                            <>  
                            <td className="col-2">
                                <select className="form-control col-12"  name="processus">
                                    {
                                        processus.length>0 &&
                                        processus.map((processus, index) => (
                                            processus.id===item.id_processus ? (
                                            <option 
                                                key={index}
                                                value={processus.id}
                                                selected={processus.id === item.id_processus}
                                            >
                                                {processus.libelle_processus}
                                            </option> 
                                            ) : (
                                                <></>
                                            )
                                        ))
                                    }
                                </select>
                            </td>                      
                            <td className="col-4"><textarea onClick={handleUpdate} onChange={handleUpdate} className="form-control col-12" type="textarea" size="40" name="objectif" value={item.objectifs}></textarea></td>
                            <td className="col-1"><input onClick={handleUpdate} onChange={handleUpdate} className="form-control col-12" type="text" name="poids" value={item.poids}></input></td>
                            <td className="col-1">
                                <input onClick={handleUpdate} onChange={handleUpdate}  className="form-control col-12" type="text" name="cible" value={item.cible}></input>
                                <input type="hidden" name="id" value={item.id} onChange={handleUpdate}></input>
                                <input type="hidden" name="index" value={index+1} onChange={handleUpdate}></input>
                            </td>
                            <td className="col-1">
                                
                                <select className="form-control col-12"  name="unite">
                                    {
                                        uniteParam.length>0 &&
                                        uniteParam.map((uniteParam, index) => (
                                            uniteParam.id === item.id_unite ? (
                                            <option 
                                                key={index}
                                                value={uniteParam.id}
                                                selected={uniteParam.id === item.id_unite}
                                            >
                                                {uniteParam.abbrv}
                                            </option> 
                                            ) : (<></>)
                                        ))
                                    }
                                </select>
                            </td>
                            
                            <td className="col-2">
                                <select className="form-control col-12" name="recuperation">
                                    {
                                        recuperationParam.length>0 &&
                                        recuperationParam.map((recuperationParam, index) => (
                                            recuperationParam.id === item.recuperation ? (
                                            <option 
                                                key={index}
                                                value={recuperationParam.id}
                                                selected={recuperationParam.id=== item.recuperation}
                                            >
                                                {recuperationParam.type_recuperation} 
                                            </option>
                                            ) : (<></>) 
                                        ))
                                    }
                                </select>
                                <textarea onClick={handleUpdate} onChange={handleUpdate} className="form-control col-12" type="textarea" size="40" name="support" value={item.support}></textarea>
                            
                            </td>
                            </>
                        )}    
                            
                            
                            <td className="col-1">
                                {
                                page==="1" ?
                                    <div className="row">
                                    { 
                                    modeEdit !== item.id ?
                                        <button className="col-7 mr-2 btn btn-warning btn-sm rounded-3 shadow mb-1" onClick={() => handleModeEdit(item.id)} ><i className="bi bi-pencil-square"></i></button>
                                    :
                                        <button className="col-7 mr-2 btn btn-success btn-sm rounded-3 shadow mb-1" onClick={() => handleUpdateListe(item.id)} ><i className="bi bi-save"></i></button>
                                    }
                                    <button className="col-7 btn btn-danger btn-sm rounded-3 shadow mb-1" onClick={() => handleDeleteObjectif(item)} ><i className="bi bi-trash-fill"></i></button>
                                    </div>
                                :
                                    <button className="btn btn-danger btn-sm rounded-3 shadow mb-1" onClick={() => handleDeleteParam(item)} ><i className="bi bi-trash-fill"></i></button>
                                }
                            </td>
                        </tr>
                        ))
                    }
                    
                </tbody>
            </Table>
            
        </div>
    )
}

export default GestionObjectif;

