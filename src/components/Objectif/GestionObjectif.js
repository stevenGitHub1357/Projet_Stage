import { useState } from "react"
import { useEffect } from "react"
import { TitlePage } from "../templates/templates"
import { useCookies } from "react-cookie"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import axios from "axios"
import {useLocation} from "react-router-dom"

import  {setObjectifData, deleteObjectif  , updateObjectif,
            setParametrageObjectifData, deleteParametrageObjectif
        } from "../feature/Objectifs.slice"
import {Success, Confirmation} from "../service/service-alert";
import Global_url from "../../global_url"


var Url = Global_url


const GestionObjectif = ({MenuCollapse,theme}) => {
    const dispatch = useDispatch();
    const parametrage = useSelector((state) => state.parametrageObjectif.parametrageObjectif)
    const objectif = useSelector((state) => state.objectif.objectif)
    const [liste,setListe] = useState([]);
    const [cookies, setCookie] = useCookies(['islogged_react','matricule_react','role_react','nom_complet_react',"id_user","id_processus","page"])
    const location = useLocation();
    const page = cookies.page;
    console.log(page)
    const [valideDispatch, setDispatch] = useState(true);
    const [modeUpdate, setModeUpdate] = useState(false);
    const [afterFilter, setAfterFilter] = useState(false);

    const uniteParam = [
        {id : 1, type_unite : ""},
        {id : 2, type_unite : "%"}
    ]
    const recuperationParam= [
        {id : 1, type_recup : "manuel"},
        {id : 2, type_recup : "auto"}
    ]

    const colonneTable = [
        {nom : "Processus",  tableColonne : "id_processus"},
        {nom : "Objectif", tableColonne : "objectifs"},
        {nom : "Poids", tableColonne : "poids"},
        {nom : "Cible", tableColonne : "cible"},
        {nom : "Unite", tableColonne : "id_unite"},
        {nom : "recuperation", tableColonne : "recuperation"},
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

    function getPage(){
        const params = new URLSearchParams(location.search);
        setCookie('page',params.get('page'));  
        console.log(page+ " : " +params.get('page'));
        // console.log("dispatch : "+ valideDispatch);
        // console.log(afterFilter)
        if(afterFilter === false){
            setListe(objectif)
        }
        if(params.get('page')==="1" && valideDispatch===true){
            setDispatch(false);
            if(afterFilter === false){
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
        Confirmation(theme, "Êtes-vous sûr(e) de vouloir modifier cette objectif ?", "Oui, sauvegarder !", true).then(
            (result) => {
                if (result.isConfirmed) {
                    Success(theme, "Modification terminer");
                    console.log(objectif)
                    axios.post(Url+"/updateParametrageObjectif",{objectif})
                    setModeUpdate(false)
                    dispatch(updateObjectif(objectif))
                }   
            }
        );
   }

    const handleUpdateListe = (index) =>{
        let allParam = [];
        const tbody = document.querySelector('tbody');
        const trs = tbody.querySelectorAll('tr');
        let objectif = {} 
        let pageObjectif = false;
        setModeUpdate(false)
        // console.log(index)
        for(let tr of trs){
            let param = {id:null, id_processus:"", objectifs:"",poids:"", cible:"",id_unite:"",recuperation:"",index:""};
            let filter = {id:null, id_processus:"", objectifs:"",poids:"", cible:"",id_unite:"",recuperation:"",index:""};
            const tds = tr.querySelectorAll('td');
            tds.forEach(td => {
                const inputs = td.querySelectorAll('input');
                const selects = td.querySelectorAll('select');
                const textareas = td.querySelectorAll('textarea');
                textareas.forEach(textarea => {
                    if(textarea.name === 'objectif') param.objectifs = textarea.value
                })
                inputs.forEach(input => {
                    if(input.name === 'id') param.id = Number(input.value)
                    if(input.name === 'index') param.index = input.value
                    if(input.name === 'id_processus') param.id_processus = Number(input.value)
                    if(input.name === 'objectif') param.objectifs = input.value
                    if(input.name === 'poids') param.poids = Number(input.value.replace(',','.'))
                    if(input.name === 'cible') param.cible = Number(input.value.replace(',','.'))
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
        };
        if(pageObjectif === true){
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
        setModeUpdate(false)
        const objectifs = handleUpdateListe(null).filter(obj => obj.index !== "")
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
        Confirmation(theme, "Êtes-vous sûr(e) de vouloir supprimer cette objectif", "Oui, sauvegarder !", true).then(
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
                    if(input.name === 'id_processus') filter.id_processus = Number(input.value)
                    if(input.name === 'validateProcessus') filter.validateProcessus = input.checked
                    if(input.name === 'objectif') filter.objectifs = input.value
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
        };
        console.log(filter)
        let listFiltre = objectif;
        console.log(objectif)
        if(filter.validateProcessus === true) listFiltre = listFiltre.filter(item => item.id_processus === filter.id_processus)
        
        if(filter.objectifs !== "") listFiltre = listFiltre.filter(item => item.objectifs.toLowerCase().includes(filter.objectifs))
             
        if(filter.poidsMax !== 0) listFiltre = listFiltre.filter(item => item.poids >= filter.poidsMin.toString() && item.poids <= filter.poidsMax.toString())

        if(filter.cibleMax !== 0) listFiltre = listFiltre.filter(item => item.cible >= filter.cibleMin.toString() && item.cible <= filter.cibleMax.toString())

        if(filter.validateUnite === true) listFiltre = listFiltre.filter(item => item.id_unite === filter.id_unite)

        if(filter.validateRecuperation === true)  listFiltre = listFiltre.filter(item => item.recuperation === filter.recuperation)

        // console.log(listFiltre)
        // dispatch(setObjectifData(listFiltre));
        setListe(listFiltre);
        if(filtreValide === false){
            resetInputs();
            setListe(objectif);
            setAfterFilter(false);
        }
        

    }

    
    
    return(
        <div  className={!MenuCollapse ? "content" : "contentCollapse"}>
            <TitlePage title={page==="1" ? "Liste des objectifs" : "Parametrage objectifs"} process={false} theme={theme}/>
            <table className="row">
                <filtre>
                { page === "1" ? 
                <tr className="row mb-3" >
                            <td className="col-2">
                                <div className="row">
                                <input onClick={handleUpdate} className="col-2" type="checkbox" name="validateProcessus"></input>
                                <select className="col-10"  name="processus">
                                    {
                                        processus.map((processus, index) => (
                                            <option 
                                                key={index}
                                                value={processus.id}
                                            >
                                                {processus.libelle_processus}
                                            </option> 
                                        ))
                                    }
                                </select>
                                </div>
                            </td> 
                            <td className="col-4"><input onClick={handleUpdate} className="col-12" type="texte" size="40" name="objectif" placeholder="objectif" id="inputParametrage"></input></td>
                            <td className="col-1">
                                <input onClick={handleUpdate} className="col-12" type="text" name="poidsMin" placeholder="Poids min" id="inputParametrage"></input>
                                <input onClick={handleUpdate} className="col-12" type="text" name="poidsMax" placeholder="Poids max" id="inputParametrage"></input>
                            </td>
                            <td className="col-1">
                                <input onClick={handleUpdate} className="col-12" type="text" name="cibleMin" placeholder="Cible min" id="inputParametrage"></input>
                                <input onClick={handleUpdate} className="col-12" type="text" name="cibleMax" placeholder="Cible max" id="inputParametrage"></input>
                            </td>
                            <td className="col-1">
                                <div className="row">
                                <input onClick={handleUpdate} className="col-2" type="checkbox" name="validateUnite" id="inputParametrage"></input>
                                <select className="col-9"  name="unite">
                                    {
                                        uniteParam.map((uniteParam, index) => (
                                            <option 
                                                key={index}
                                                value={uniteParam.id}
                                            >
                                                {uniteParam.type_unite}
                                            </option> 
                                        ))
                                    }
                                </select>
                                </div>
                            </td>
                            
                            <td className="col-1">
                                <div className="row">
                                <input onClick={handleUpdate} className="col-2" type="checkbox" name="validateRecuperation"></input>
                                <select className="col-9" name="recuperation">
                                    {
                                        recuperationParam.map((recuperationParam, index) => (
                                            <option 
                                                key={index}
                                                value={recuperationParam.id}
                                            >
                                                {recuperationParam.type_recup} 
                                            </option> 
                                        ))
                                    }
                                </select>
                                </div>
                            </td>
                            <td className="col-2">
                                <div className="row">
                                    <button className="col-5 mr-2 btn btn-success btn-sm rounded-1 shadow" onClick={() => handleFiltre(true)} >Filtrer</button>
                                    <button className="col-5 btn btn-warning btn-sm rounded-1 shadow" onClick={() => handleFiltre(false)} >Initialiser</button>
                                </div>
                            </td>
                </tr>
                : <></>}
                </filtre>
                <thead>
                <tr className="row" key="0">
                    {
                        colonneTable.map((colonne,index) => (
                           
                                <th className={colonne.nom === "Processus" ? "col-2" : colonne.nom === "Objectif" ? "col-4" : "col-1"} > 
                                    <div className="row">
                                        <div className="col-1">
                                            {triage[colonne.tableColonne]===1 
                                                ?<i className="bi bi-sort-up-alt" onClick={() => handleTriage(colonne.tableColonne)}></i>
                                                :<i className="bi bi-sort-down-alt" onClick={() => handleTriage(colonne.tableColonne)}></i>
                                            }
                                        </div>
                                        <div className="col-9">{colonne.nom}</div> 
                                        
                                    </div>
                                </th>
                            
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        liste.length>0 &&
                        liste.filter(item=> item.index !== 0 && item.activate !== 0).map((item, index) =>(
                        <tr key={item.index} className="row">  
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
                        {  modeUpdate ? ( 
                            <>   
                                               
                            <td className="col-4"><textarea onClick={handleUpdate} className="col-12" type="textarea" size="40" name="objectif" defaultValue={item.objectifs}></textarea></td>
                            <td className="col-1"><input onClick={handleUpdate} className="col-12" type="text" name="poids" defaultValue={item.poids}></input></td>
                            <td className="col-1">
                                <input onClick={handleUpdate} className="col-12" type="text" name="cible" defaultValue={item.cible}></input>
                                <input type="hidden" name="id" defaultValue={item.id}></input>
                                <input type="hidden" name="index" defaultValue={index+1}></input>
                            </td>
                            </>
                        ) : (
                            <>                       
                            <td className="col-4"><textarea onClick={handleUpdate} onChange={handleUpdate} className="col-12" type="textarea" size="40" name="objectif" value={item.objectifs}></textarea></td>
                            <td className="col-1"><input onClick={handleUpdate} onChange={handleUpdate} className="col-12" type="text" name="poids" value={item.poids}></input></td>
                            <td className="col-1">
                                <input onClick={handleUpdate} onChange={handleUpdate}  className="col-12" type="text" name="cible" value={item.cible}></input>
                                <input type="hidden" name="id" value={item.id} onChange={handleUpdate}></input>
                                <input type="hidden" name="index" value={index+1} onChange={handleUpdate}></input>
                            </td>
                            </>
                        )}    
                            <td className="col-1">
                                
                                <select className="col-12"  name="unite">
                                    {
                                        uniteParam.map((uniteParam, index) => (
                                            <option 
                                                key={index}
                                                value={uniteParam.id}
                                                selected={uniteParam.id === item.id_unite}
                                            >
                                                {uniteParam.type_unite}
                                            </option> 
                                        ))
                                    }
                                </select>
                            </td>
                            
                            <td className="col-1">
                                <select className="col-12" name="recuperation">
                                    {
                                        recuperationParam.map((recuperationParam, index) => (
                                            <option 
                                                key={index}
                                                value={recuperationParam.id}
                                                selected={recuperationParam.id=== item.recuperation}
                                            >
                                                {recuperationParam.type_recup} 
                                            </option> 
                                        ))
                                    }
                                </select>
                            </td>
                            
                            <td className="col-2">
                                
                                {
                                page==="1" ?
                                    <>
                                    <button className="mr-2 btn btn-warning btn-sm rounded-3 shadow" onClick={() => handleUpdateListe(item.id)} >Modifier</button>
                                    <button className="btn btn-danger btn-sm rounded-3 shadow" onClick={() => handleDeleteObjectif(item)} >Supprimer</button>
                                    </>
                                :
                                    <button className="btn btn-danger btn-sm rounded-3 shadow" onClick={() => handleDeleteParam(item)} >Supprimer</button>
                                }
                            </td>
                        </tr>
                        ))
                    }
                    {page !== "1" ?
                        <tr>
                            <td className="col-2">
                                <select className="col-12" name="processus">
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
                                <select className="col-12"  name="unite">
                                    {
                                        uniteParam.map((uniteParam, index) => (
                                            <option 
                                                key={index}
                                                value={uniteParam.id}
                                            >{uniteParam.type_unite}</option> 
                                        ))
                                    }
                                </select>
                            </td>
                            
                            <td className="col-1">
                                <select className="col-12" name="recuperation">
                                    {
                                        recuperationParam.map((recuperationParam, index) => (
                                            <option 
                                                key={index}
                                                value={recuperationParam.id}
                                                selected={recuperationParam.id === 1}
                                            >{recuperationParam.type_recup}</option> 
                                        ))
                                    }
                                </select>
                            </td>
                            
                            <td className="col-2">
                                <button className="btn btn-success btn-sm rounded-5 shadow ms-2" onClick={() => handleUpdateListe(null)} >Ajouter</button>
                                <button className="btn btn-warning btn-sm rounded-5 shadow" onClick={resetInputs}>Initialiser</button>
                            </td>
                        </tr>
                    :<></>}
                </tbody>
            </table>
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

