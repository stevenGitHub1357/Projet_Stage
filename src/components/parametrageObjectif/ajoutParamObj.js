import { useState } from "react"
import { useEffect } from "react"
import { TitlePage } from "../templates/templates"
import { type } from "@testing-library/user-event/dist/type"
import { setParametrageObjectifData, addParametrageObjectif, deleteParametrageObjectif } from "../feature/parametrageObjectif.slice"
import { useCookies } from "react-cookie"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useRef } from "react"
import axios from "axios"
import { Warning, Success, error, Confirmation} from "../service/service-alert";

import Global_url from "../../global_url"

var Url = Global_url


const AjoutParamObj = ({MenuCollapse,theme}) => {
    const dispatch = useDispatch();
    const itemParam = useSelector((state) => state.parametrageObjectif.parametrageObjectif)
    const [cookies, setCookie, removeCookie] = useCookies(['islogged_react','matricule_react','role_react','nom_complet_react',"id_user","id_processus"])
    const inputRefs = useRef([]);

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
        inputRefs.current = [];
    },[])

    const resetInputs = () => {
        if (inputRefs.current.length > 0) {
          inputRefs.current.forEach(input => {
            if (input) {
              input.value = '';
            }
          });
        }
    };


    const resetTableau = () => {
        const parametrage = {id:0, id_processus:"", objectifs:"",poids:"", cible:"",id_unite:"",recuperation:""};
        const allParam = [];
        allParam.push(parametrage);
        dispatch(setParametrageObjectifData(allParam));
    };

    const resetTableauCall = () => {
        Confirmation(theme, "Êtes-vous sûr(e) de vouloir reinitialiser le tableau ?", "Oui, initialiser le tableau !", true).then(
            (result) => {
              if (result.isConfirmed) {
                Success(theme, "Reinitialisation terminer");
                resetTableau()
              }
                
            }
        );
    };

    const updateParametrage = () =>{
        const allParam = [];
        const tbody = document.querySelector('tbody');
        const trs = tbody.querySelectorAll('tr');
        console.log("new")
        trs.forEach(tr => {
            const parametrage = {id:null, id_processus:"", objectifs:"",poids:"", cible:"",id_unite:"",recuperation:""};
            
            const tds = tr.querySelectorAll('td');
            tds.forEach(td => {
                const inputs = td.querySelectorAll('input');
                const selects = td.querySelectorAll('select');
                const textareas = td.querySelectorAll('textarea');
                textareas.forEach(textarea => {
                    if(textarea.name === 'objectif') parametrage.objectifs = textarea.value
                })
                inputs.forEach(input => {
                    if(input.name === 'id_processus') parametrage.id_processus = input.value
                    if(input.name === 'objectif') parametrage.objectifs = input.value
                    if(input.name === 'poids') parametrage.poids = Number(input.value.replace(',','.'))
                    if(input.name === 'cible') parametrage.cible = Number(input.value.replace(',','.'))
                })
                selects.forEach(select => {
                    if(select.name === 'unite') parametrage.id_unite = Number(select.value)
                    if(select.name === 'recuperation') parametrage.recuperation = Number(select.value) 
                    if(select.name === 'processus') parametrage.id_processus= Number(select.value) 
                })
            });
            allParam.push(parametrage)
            console.log(allParam);
        });
        
        resetInputs();
        dispatch(setParametrageObjectifData(allParam));
    }

    const saveAll = () =>{
        const items = itemParam.filter(item => item.id !== 0)
        axios.post(Url+"/insertManyParametrageObjectif",{items})
        resetTableau();
    }

    const saveAllCall = () => {
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
        console.log(item);
        dispatch(deleteParametrageObjectif(item));
    }
    
    return(
        <div  className={!MenuCollapse ? "content" : "contentCollapse"}>
            <TitlePage title="Parametrage objectif" process={false} theme={theme}/>
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
                        itemParam.filter(item => item.id !== 0).map((item, index) =>(
                        <tr key={index}>
                            <td className="col-4"><textarea className="col-12" type="textarea" size="40" name="objectif" defaultValue={item.objectifs}></textarea></td>
                            <td className="col-1"><input className="col-12" type="text" name="poids" defaultValue={item.poids}></input></td>
                            <td className="col-1"><input className="col-12" type="text" name="cible" defaultValue={item.cible}></input></td>
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
                                <button className="btn btn-danger btn-sm rounded-5 shadow" onClick={() => deleteParam(item)} >Supprimer</button>
                            </td>
                        </tr>
                        ))
                    }
                        <tr>
                            <td className="col-4"><textarea className="col-12" name="objectif" ref={(el) => inputRefs.current.push(el)} ></textarea></td>
                            <td className="col-1"><input className="col-12" type="text" name="poids" ref={(el) => inputRefs.current.push(el)} ></input></td>
                            <td className="col-1"><input className="col-12" type="text" name="cible" ref={(el) => inputRefs.current.push(el)} ></input></td>
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
                </tbody>
            </table>
            <button className="btn btn-outline-success btn-md" onClick={saveAllCall}>Sauvegarder les données</button>
            <button className="btn btn-outline-danger btn-md" onClick={resetTableauCall}>Initialiser le tableau</button>
        </div>
    )
}

export default AjoutParamObj;

