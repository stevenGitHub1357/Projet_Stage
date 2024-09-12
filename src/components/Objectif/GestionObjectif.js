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
    const [valideDispatch, setDispatch] = useState(true);
    const [modeUpdate, setModeUpdate] = useState(false);

    const uniteParam = [
        {id : 1, type_unite : ""},
        {id : 2, type_unite : "%"}
    ]
    const recuperationParam= [
        {id : 1, type_recup : "manuel"},
        {id : 2, type_recup : "auto"}
    ]
    const processus =  useSelector((state) => state.processus.processus)

    useEffect(()=>{ 
        getPage();
    })
    useEffect(()=>{  
        initialiseObjectif();
    },[])

    function initialiseObjectif(){
        axios.get(Url+"/getParametrageObjectif").then(res=>{
            // console.log(res.data)
            dispatch(setObjectifData(res.data))
            setDispatch(true)
        })
    }

    function getPage(){
        const params = new URLSearchParams(location.search);
        setCookie('page',params.get('page'));  
        // console.log(page+ " : " +params.get('page'));
        // console.log("dispatch : "+ valideDispatch);
        setListe(objectif) 
        if(params.get('page')==="1" && valideDispatch===true){
            setDispatch(false);
            setListe(objectif);
        }
        if(params.get('page')==="2"){
            setDispatch(true);
            setListe(parametrage);
        }
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
        // console.log(index)
        for(let tr of trs){
            let param = {id:null,index:"", id_processus:"", objectifs:"",poids:"", cible:"",id_unite:"",recuperation:""};
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
            console.log(allParam)
            dispatch(setParametrageObjectifData(allParam));
            resetInputs();
        }
        console.log(allParam)
        return allParam;
    }

    const resetInputs = () => {
        var inputs = document.querySelectorAll('#inputParametrage');
        inputs.forEach(input => {
            input.value = '';
        })
    };

    const resetTableau = () => {
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
        const id = item.id
        Confirmation(theme, "Êtes-vous sûr(e) de vouloir supprimer cette objectif", "Oui, sauvegarder !", true).then(
            (result) => {
                if (result.isConfirmed) {
                    Success(theme, "Suppression terminer");
                    axios.post(Url+"/deleteParametrageObjectif",{id});
                    dispatch(deleteObjectif(item));
                }   
            }
        );
    }

    
    
    return(
        <div  className={!MenuCollapse ? "content" : "contentCollapse"}>
            <TitlePage title={page==="1" ? "Liste des objectifs" : "Parametrage objectifs"} process={false} theme={theme}/>
            <table className="row">
                <thead>
                    <tr className="row" key="0">
                        <th className="col-4">Objectif</th>
                        <th className="col-1">poids</th>
                        <th className="col-1">cible</th>
                        <th className="col-1">unite</th>
                        <th className="col-2">processus</th>
                        <th className="col-1">recuperation</th>
                        <th className="col-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        liste.length>0 &&
                        liste.filter(item=> item.index !== 0).map((item, index) =>(
                        <tr key={item.index}>  
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
                                    <button className="btn btn-warning btn-sm rounded-5 shadow" onClick={() => handleUpdateListe(item.id)} >Modifier</button>
                                    <button className="btn btn-danger btn-sm rounded-5 shadow" onClick={() => handleDeleteObjectif(item)} >Supprimer</button>
                                    </>
                                :
                                    <button className="btn btn-danger btn-sm rounded-5 shadow" onClick={() => handleDeleteParam(item)} >Supprimer</button>
                                }
                            </td>
                        </tr>
                        ))
                    }
                    {page !== "1" ?
                        <tr>
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

