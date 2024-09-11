import { useState } from "react"
import { useEffect } from "react"
import { TitlePage } from "../templates/templates"
import { useCookies } from "react-cookie"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useRef } from "react"
import axios from "axios"
import { useParams, useLocation, useNavigate } from "react-router-dom"

import { type } from "@testing-library/user-event/dist/type"
import {setObjectifData, addObjectif, deleteObjectif  ,
        setParametrageObjectifData, addParametrageObjectif, deleteParametrageObjectif } from "../feature/Objectifs.slice"
import { Warning, Success, error, Confirmation} from "../service/service-alert";
import Global_url from "../../global_url"


var Url = Global_url


const GestionObjectif = ({MenuCollapse,theme}) => {
    const dispatch = useDispatch();
    const parametrage = useSelector((state) => state.parametrageObjectif.parametrageObjectif)
    const objectif = useSelector((state) => state.objectif.objectif)
    const [liste,setListe] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(['islogged_react','matricule_react','role_react','nom_complet_react',"id_user","id_processus","page"])
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
            console.log(res.data)
            dispatch(setObjectifData(res.data))
        })
    }

    function getPage(){
        const params = new URLSearchParams(location.search);
        setCookie('page',params.get('page'));  
        console.log(page+ " : " +params.get('page'));
        if(params.get('page')==="1" && valideDispatch===true){
            setDispatch(false);
            setListe(objectif);
        }
        if(params.get('page')==="2"){
            setDispatch(true);
            setListe(parametrage);
        }
        console.log(liste)
    }

   

    const updateParametrage = () =>{
        const allParam = [];
        const tbody = document.querySelector('tbody');
        const trs = tbody.querySelectorAll('tr');
        console.log("new")
        trs.forEach(tr => {
            const param = {id:null,id_default:"", id_processus:"", objectifs:"",poids:"", cible:"",id_unite:"",recuperation:""};
            
            const tds = tr.querySelectorAll('td');
            tds.forEach(td => {
                const inputs = td.querySelectorAll('input');
                const selects = td.querySelectorAll('select');
                const textareas = td.querySelectorAll('textarea');
                textareas.forEach(textarea => {
                    if(textarea.name === 'objectif') param.objectifs = textarea.value
                })
                inputs.forEach(input => {
                    if(input.name === 'id') param.id_default = input.value
                    if(input.name === 'id_processus') param.id_processus = input.value
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
            allParam.push(param)
            console.log(allParam);
        });
        dispatch(setParametrageObjectifData(allParam));
        resetInputs();
    }

    const resetInputs = () => {
        var inputs = document.querySelectorAll('#inputParametrage');
        inputs.forEach(input => {
            input.value = '';
        })
    };

    const resetTableau = () => {
        const param = {id_default:0, id_processus:"", objectifs:"",poids:"", cible:"",id_unite:"",recuperation:""};
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
        updateParametrage()
        const items = parametrage
        axios.post(Url+"/insertManyParametrageObjectif",{items})
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

    const deleteParam = (item) =>{
        console.log("delete");
        setModeUpdate(false)
        dispatch(deleteParametrageObjectif(item));
    }

    const handleUpdate = () =>{
        console.log("update");
        if(modeUpdate===false){
            setModeUpdate(true)
        }
    }

    
    
    return(
        <div  className={!MenuCollapse ? "content" : "contentCollapse"}>
            <TitlePage title={page==="1" ? "Liste des objectifs" : "Parametrage objectifs"} process={false} theme={theme}/>
            <table className="row">
                <thead>
                    <tr className="row">
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
                        liste.filter(item=> item.id_default !== 0).map((item, index) =>(
                        <tr key={index}>  
                        {  modeUpdate ? ( 
                            <>                       
                            <td className="col-4"><textarea onClick={handleUpdate} className="col-12" type="textarea" size="40" name="objectif" defaultValue={item.objectifs}></textarea></td>
                            <td className="col-1"><input onClick={handleUpdate} className="col-12" type="text" name="poids" defaultValue={item.poids}></input></td>
                            <td className="col-1"><input onClick={handleUpdate} className="col-12" type="text" name="cible" defaultValue={item.cible}></input></td>
                            </>
                        ) : (
                            <>                       
                            <td className="col-4"><textarea onClick={handleUpdate} className="col-12" type="textarea" size="40" name="objectif" value={item.objectifs}></textarea></td>
                            <td className="col-1"><input onClick={handleUpdate} className="col-12" type="text" name="poids" value={item.poids}></input></td>
                            <td className="col-1"><input onClick={handleUpdate} className="col-12" type="text" name="cible" value={item.cible}></input></td>
                            </>
                        )}    
                            <td className="col-1">
                                <input type="hidden" name="id" defaultValue={page==="1" ? item.id : index+1}></input>
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
                                <button className="btn btn-danger btn-sm rounded-5 shadow" onClick={() => deleteParam(item)} >Supprimer</button>
                                {page==="1" ?
                                    <button className="btn btn-warning btn-sm rounded-5 shadow" onClick={() => deleteParam(item)} >Modifier</button>
                                :<></>}
                            </td>
                        </tr>
                        ))
                    }
                    {page!=="1" ?
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
                                <button className="btn btn-success btn-sm rounded-5 shadow ms-2" onClick={updateParametrage}>Ajouter</button>
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

