import { useState } from "react"
import { useEffect } from "react"
import { TitlePage } from "../templates/templates"
import { useCookies } from "react-cookie"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import axios from "axios"
import {useLocation} from "react-router-dom"

import  {setObjectifData, deleteObjectif  , updateObjectif,
            setParametrageObjectifData, deleteParametrageObjectif,
            addObjectif,
            setUniteData,
            setRecuperationData
        } from "../feature/objectifs.slice"
import {Success, Confirmation} from "../service/service-alert";
import Global_url from "../../global_url"
import FichierExcel from "../import_export/FichierExcel"
import { setExportData, setHeadingData } from "../feature/importExport.slice"
import Synthese from "./Synthese"
import Unite from "./Unite"
import Recuperation from "./Recuperation"
import { Button, OverlayTrigger, Tooltip, Table } from 'react-bootstrap';


var Url = Global_url


const GestionObjectif = ({MenuCollapse,theme}) => {
    const dispatch = useDispatch();
    const parametrage = useSelector((state) => state.parametrageObjectif.parametrageObjectif)
    const objectif = useSelector((state) => state.objectif.objectif)
    const importData = useSelector((state) => state.import.import)
    const [liste,setListe] = useState([]);
    const [cookies, setCookie] = useCookies(['islogged_react','matricule_react','role_react','nom_complet_react',"id_user","id_processus","page"])
    const location = useLocation();
    const page = cookies.page;
    const [valideDispatch, setDispatch] = useState(true);
    const [modeUpdate, setModeUpdate] = useState(false);
    const [afterFilter, setAfterFilter] = useState(false);
    const [modeEdit, setModeEdit] = useState();
    const [modaleFiltre, setModaleFiltre] = useState(false);

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
    const processus =  useSelector((state) => state.processus.processus)

    useEffect(()=>{ 
        getPage();
    })
    useEffect(()=>{  
        initialiseRecuperation();
        initialiseUnite();
        initialiseObjectif();
    },[])

    function initialiseObjectif(){
        const obj= axios.get(Url+"/getParametrageObjectif").then(res=>{
            // console.log(res.data)
            dispatch(setObjectifData(res.data))
            setDispatch(true)
        })
        return obj
    }
    function initialiseUnite(){
        const obj= axios.get(Url+"/getParamObjUnite").then(res=>{
            dispatch(setUniteData(res.data));
            console.log(res.data)
        })
        return obj
    }
    function initialiseRecuperation(){
        const obj= axios.get(Url+"/getParamObjRecuperation").then(res=>{
            dispatch(setRecuperationData(res.data));
            console.log(res.data)
        })
        return obj
    }

    function getHeadingsExcel(){
        const headings = ['id']
        colonneTable.map((objet) => (
            headings.push(objet.nom)
        ))
        return headings
    }

    function getPage(){
        const params = new URLSearchParams(location.search);
        setCookie('page',params.get('page'));  
        console.log(page+ " : " +params.get('page'));
        dispatch(setExportData(liste))
        // console.log("dispatch : "+ valideDispatch);
        // console.log(afterFilter)
        if(afterFilter === false){
            
            setListe(objectif)
            if(params.get('page')==="1" && valideDispatch===true){
                // initialiseObjectif()
                const headings = getHeadingsExcel()
                dispatch(setHeadingData(headings))
                setDispatch(false);
                setListe(objectif);
            }
        }
        if(params.get('page')==="2"){
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
        setModeUpdate(false)
        var inputs = document.querySelectorAll('#inputParametrage');
        inputs.forEach(input => {
            input.value = '';
        })
    };

    const resetTableau = () => {
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

    const saveAll = () =>{
        console.log("saveAll")
        console.log(handleUpdateListe(null))
        setModeUpdate(false)
        const objectifs = handleUpdateListe(null)
        console.log(objectifs)
        axios.post(Url+"/insertManyParametrageObjectif",{objectifs})
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
        // console.log("delete");
        setModeUpdate(false);
        dispatch(deleteParametrageObjectif(item));
    }

    const handleUpdate = () =>{
        // console.log("update");
        if(modeUpdate===false){
            setModeUpdate(true)
        }
    }

    const handleDeleteObjectif= (item) => {
        // console.log("delete objectif:"+item.id)
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
        dispatch(setExportData(triageListe))
        if(page==="1"){
            dispatch(setObjectifData(triageListe))
        }
        if(page==="2"){
            dispatch(setParametrageObjectifData(triageListe))
        }
        setAfterFilter(false)
    }

    const handleFiltre = (filtreValide) => {
        console.log("filter")
        const filtre = document.querySelector('filtre');
        const trs = filtre.querySelectorAll('tr');
        setModeUpdate(false)
        setAfterFilter(true)
        let filter = {};
        for(let tr of trs){
            const tds = tr.querySelectorAll('td');
            tds.forEach(td => {
                const inputs = td.querySelectorAll('input');
                const selects = td.querySelectorAll('select');
                inputs.forEach(input => {
                    if(input.name === 'objectif') filter.objectifs = input.value
                    if(input.name === 'support') filter.support = input.value
                    if(input.name === 'id_processus') filter.id_processus = Number(input.value)
                    if(input.name === 'validateProcessus') filter.validateProcessus = input.checked
                    if(input.name === 'poidsMax') filter.poidsMax = Number(input.value.replace(',','.'))
                    if(input.name === 'poidsMin') filter.poidsMin = Number(input.value.replace(',','.'))
                    if(input.name === 'cibleMax') filter.cibleMax = Number(input.value.replace(',','.'))
                    if(input.name === 'cibleMin') filter.cibleMin = Number(input.value.replace(',','.'))
                    if(input.name === 'validateUnite') filter.validateUnite = input.checked
                    if(input.name === 'validateRecuperation') filter.validateRecuperation = input.checked
                })
                selects.forEach(select => {
                    if(select.name === 'unite') filter.id_unite = Number(select.value)
                    if(select.name === 'recuperation') filter.recuperation = Number(select.value) 
                    if(select.name === 'processus') filter.id_processus= Number(select.value) 
                })
            });
            break;
        };
        console.log(filter)
        let listFiltre = objectif;
        console.log(objectif)
        if(filter.id_processus !== 0) listFiltre = listFiltre.filter(item => item.id_processus === filter.id_processus)
        
        if(filter.objectifs !== "") listFiltre = listFiltre.filter(item => item.objectifs.toLowerCase().includes(filter.objectifs))
             
        if(filter.poidsMax !== 0) listFiltre = listFiltre.filter(item => item.poids >= filter.poidsMin.toString() && item.poids <= filter.poidsMax.toString())

        if(filter.cibleMax !== 0) listFiltre = listFiltre.filter(item => item.cible >= filter.cibleMin.toString() && item.cible <= filter.cibleMax.toString())

        if(filter.id_unite !== 0) listFiltre = listFiltre.filter(item => item.id_unite === filter.id_unite)

        if(filter.recuperation !== 0)  listFiltre = listFiltre.filter(item => item.recuperation === filter.recuperation)

        if(filter.support !== "") listFiltre = listFiltre.filter(item => item.support.toLowerCase().includes(filter.support))

        // console.log(listFiltre)
        // dispatch(setObjectifData(listFiltre));
        dispatch(setExportData(listFiltre))
        setListe(listFiltre);
        if(filtreValide === false){
            resetInputs();
            dispatch(setExportData(objectif))
            setListe(objectif);
            setAfterFilter(false);
        }
    }

    function handleImport(){
        console.log(importData)
        let dataPossible = importData.filter(data=> data[0].toLowerCase() !== 'processus'.toLowerCase())
        dataPossible = dataPossible.filter(data => !isNaN(Number(data[2])))

        console.log(dataPossible)
        const allData = []
        for(let objet of dataPossible){
            const imp = {}
            // console.log(objet[0])
            // console.log(processus)
            const proc =  processus.filter(processus => processus.excel === objet[0])
            
            imp.id_processus = proc[0].id
            imp.objectifs = objet[1];
            imp.poids = objet[2];
            console.log(uniteParam)
            if(imp.objectifs.includes('%')){
                imp.cible = objet[3]*100;
                imp.id_unite = uniteParam.filter(unite => unite.abbrv === '%')[0].id
            }else{
                imp.cible = objet[3]+""
                imp.id_unite = uniteParam.filter(unite => unite.abbrv === '')[0].id
            }
            const recuperationAll = recuperationParam.filter(rec => rec.type_recuperation === objet[4])
            
            imp.recuperation = recuperationAll[0].id
            imp.support = objet[5]
            // console.log(imp)
            allData.push(imp)
        }
        console.log(allData)
        setModeUpdate(false)
        dispatch(setParametrageObjectifData(allData.filter(data => data.objectifs !== "")))
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


  return (
        <div  className={!MenuCollapse ? "content" : "contentCollapse"}>
            <TitlePage title={page==="1" ? "Liste des objectifs" : "Parametrage objectifs"} process={false} theme={theme}/>
            <Table className="row">
                <filtre>
                { page === "1" ? 
                <>
{/* filtre */}
                {modaleFiltre === true ? (
                <tr className="row mb-3" >
                            <td className="col-2">
                                {/* <div className="row"> */}
                                {/* <input onClick={handleUpdate} className="col-2" type="checkbox" name="validateProcessus"></input> */}
                                <select className="col-10"  name="processus">
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
                            </td> 
                            <td className="col-3"><input onClick={handleUpdate} className="col-11" type="texte" size="40" name="objectif" placeholder="objectif" id="inputParametrage"></input></td>
                            <td className="col-1">
                                <input onClick={handleUpdate} className="col-10" type="text" name="poidsMin" placeholder="Poids min" id="inputParametrage"></input>
                                <input onClick={handleUpdate} className="col-10" type="text" name="poidsMax" placeholder="Poids max" id="inputParametrage"></input>
                            </td>
                            <td className="col-1">
                                <input onClick={handleUpdate} className="col-10" type="text" name="cibleMin" placeholder="Cible min" id="inputParametrage"></input>
                                <input onClick={handleUpdate} className="col-10" type="text" name="cibleMax" placeholder="Cible max" id="inputParametrage"></input>
                            </td>
                            <td className="col-2">
                                {/* <div className="row"> */}
                                {/* <input onClick={handleUpdate} className="col-2" type="checkbox" name="validateUnite" id="inputParametrage"></input> */}
                                <select className="col-10"  name="unite">
                                    <option key={0} value="0">Uniter</option>
                                    {
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
                            </td>
                            
                            <td className="col-2">
                                {/* <div className="row"> */}
                                {/* <input onClick={handleUpdate} className="col-2" type="checkbox" name="validateRecuperation"></input> */}
                                
                                <select className="col-10" name="recuperation">
                                    <option key={0} value="0">Recuperation</option>
                                    {
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
                                <input onClick={handleUpdate} className="col-10" type="text" name="support" placeholder="Support" id="inputParametrage"></input>
                                {/* </div> */}
                            </td>
                            <td className="col-1">
                                    <button className="btn btn-success rounded-1 shadow" onClick={() => handleFiltre(true)} >Filtrer</button>
                            </td>
                </tr>
                ) : (<></>)}

                    
                        
                <div className="row col-6">
                    <div className="col-1">
                        <OverlayTrigger placement="top" overlay={<Tooltip>Filtrer</Tooltip>}>
                            <button className="btn btn-success rounded-1 shadow" onClick={() => handleModaleFiltre(true)} ><i className="bi bi-search"></i></button>
                        </OverlayTrigger>
                    </div>
                    <div className="col-1">
                        <OverlayTrigger placement="top" overlay={<Tooltip>Reinitialiser filtrer</Tooltip>}>
                            <button className="btn btn-warning rounded-1 shadow" onClick={() => handleFiltre(false)} ><i className="bi bi-eye"></i></button>
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
                <div className="row mb-4" style={{heigth:'70vh'}}>
                    <div className="col-4"><FichierExcel action={"1"}/></div>
                    <button className="col-1 btn btn-warning rounded-5 shadow" onClick={() => handleImport()} >valider</button>
                </div>
                }
                </filtre>
                
                <thead className="mt-2">
                <tr className="row" key="0">
                    {
                        colonneTable.map((colonne,index) => (
                           
                                <th className={colonne.nom === "Processus" ? "col-2" : colonne.nom === "Objectif" ? "col-4" : colonne.nom === "Recuperation" ? "col-2" :"col-1"} > 
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
                                        <div className="col-5">{colonne.nom}</div> 
                                        }
                                    </div>
                                </th>
                            
                        ))}
                    </tr>
                
{/* ajout */}   
                <tr className="row mb-3">
                            <td className="col-2">
                                <select className="col-12" name="processus" >
                                    {
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
                            <td className="col-4"><textarea className="col-12" name="objectif" id="inputParametrage"></textarea></td>
                            <td className="col-1"><input className="col-12" type="text" name="poids" id="inputParametrage"></input></td>
                            <td className="col-1"><input className="col-12" type="text" name="cible" id="inputParametrage"></input></td>
                            <td className="col-1">
                                    
                                    <select className="col-12 mb-1"  name="unite">
                                        {
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
                                    {
                                        recuperationParam.map((recuperationParam, index) => (
                                            <option 
                                                key={index}
                                                value={recuperationParam.id}
                                                selected={recuperationParam.id === 1}
                                            >{recuperationParam.type_recuperation}</option> 
                                        ))
                                    }
                                </select>            
                                <td className="col-4"><textarea className="col-12" name="support" id="inputParametrage" placeholder="Support"></textarea></td>
                            
                            </td>
                            
                            {
                            page !== "1" ? (
                            <td className="col-1">
                                <button className="btn btn-success btn-sm rounded-2 shadow mb-1 ms-1" onClick={() => handleUpdateListe(null, false)} >Ajouter</button>
                                <button className="btn btn-warning btn-sm rounded-2 shadow" onClick={resetInputs}>Initialiser</button>
                            </td>
                            ):(
                            <td className="col-1">
                                <button className="btn btn-success btn-sm rounded-2 shadow mb-1 ms-1" onClick={() => handleUpdateListe(null, true)} >Ajouter</button>
                                <button className="btn btn-warning btn-sm rounded-2 shadow" onClick={resetInputs}>Initialiser</button>
                            </td>)}
                        </tr>

                        </thead>
                
                <tbody style={{ overflowY: 'auto', height: '450px' }}>
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
                                                <div></div>
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
                                        uniteParam.map((uniteParam, index) => (
                                            uniteParam.id === item.id_unite ? (
                                            <option 
                                                key={index}
                                                value={uniteParam.id}
                                                selected={uniteParam.id === item.id_unite}
                                            >
                                                {uniteParam.abbrv}
                                            </option> 
                                            ) : (<option></option>)
                                        ))
                                    }
                                </select>
                            </td>
                            
                            <td className="col-2">
                                <select className="form-control col-12" name="recuperation">
                                    {
                                        recuperationParam.map((recuperationParam, index) => (
                                            recuperationParam.id === item.recuperation ? (
                                            <option 
                                                key={index}
                                                value={recuperationParam.id}
                                                selected={recuperationParam.id=== item.recuperation}
                                            >
                                                {recuperationParam.type_recuperation} 
                                            </option>
                                            ) : (<option></option>) 
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
                                        <button className="col-7 mr-2 btn btn-warning btn-sm rounded-3 shadow mb-1" onClick={() => handleModeEdit(item.id)} ><i class="bi bi-pencil-square"></i></button>
                                    :
                                        <button className="col-7 mr-2 btn btn-success btn-sm rounded-3 shadow mb-1" onClick={() => handleUpdateListe(item.id)} ><i class="bi bi-save"></i></button>
                                    }
                                    <button className="col-7 btn btn-danger btn-sm rounded-3 shadow mb-1" onClick={() => handleDeleteObjectif(item)} ><i class="bi bi-trash-fill"></i></button>
                                    </div>
                                :
                                    <button className="btn btn-danger btn-sm rounded-3 shadow mb-1" onClick={() => handleDeleteParam(item)} ><i class="bi bi-trash-fill"></i></button>
                                }
                            </td>
                        </tr>
                        ))
                    }
                    

                    
                </tbody>
            </Table>
            {page!=="1" ?
                <div>
                <button className="btn btn-outline-success btn-md" onClick={handleSaveAll}>Sauvegarder les données</button>
                <button className="btn btn-outline-danger btn-md" onClick={handleResetTableau}>Initialiser le tableau</button>
                </div>
            :<></>}
        </div>
    )
}

export default GestionObjectif;

