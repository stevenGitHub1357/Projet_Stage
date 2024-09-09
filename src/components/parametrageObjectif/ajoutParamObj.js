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
    const updateParametrage = () =>{
        const parametrage = {id:null, id_processus:"", objectifs:"",poids:"", cible:"",id_unite:"",recuperation:""};
        const tbody = document.querySelector('tbody');
        const trs = tbody.querySelectorAll('tr');
        trs.forEach(tr => {
            parametrage.id_processus = cookies.id_processus;
            const tds = tr.querySelectorAll('td');
            tds.forEach(td => {
                const inputs = td.querySelectorAll('input');
                const selects = td.querySelectorAll('select')
                inputs.forEach(input => {
                    if(input.name === 'id_processus') parametrage.id_processus = input.value
                    if(input.name === 'objectif') parametrage.objectifs = input.value
                    if(input.name === 'poids') parametrage.poids = Number(input.value.replace(',','.'))
                    if(input.name === 'cible') parametrage.cible = Number(input.value.replace(',','.'))
                })
                selects.forEach(select => {
                    if(select.name === 'unite') parametrage.id_unite = Number(select.value)
                    if(select.name === 'recuperation') parametrage.recuperation = Number(select.value)
                })
            });
        });
        // console.log(parametrage);
        // setValue('');
        
        resetInputs();
        dispatch(addParametrageObjectif(parametrage));
    }

    const saveAll = () =>{
        async function saveAll(){
            const items = itemParam.filter(item => item.id !== 0)
            console.log(items)
            const saveAll = await axios.post(Url+"/insertManyParametrageObjectif",{items})
            console.log("save")
        }
        saveAll()
    }
    

    const initialiseAll = () =>{
        console.log("init")
    }

    return(
        <div  className={!MenuCollapse ? "content" : "contentCollapse"}>
            <TitlePage title="Ajout parametrage objectif" process={true} theme={theme}/>
            <table className="row">
                <thead>
                    <tr className="row">
                        <th className="col-5">Objectif</th>
                        <th className="col-1">poids</th>
                        <th className="col-1">cible</th>
                        <th className="col-1">unite</th>
                        <th className="col-2">recuperation</th>
                        <th className="col-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        itemParam.filter(item => item.id != 0).map((item, index) =>(
                        <tr key={index}>
                            <td className="col-5"><input className="col-12" type="text" name="objectif" defaultValue={item.objectifs}></input></td>
                            <td className="col-1"><input className="col-12" type="text" name="poids" defaultValue={item.poids}></input></td>
                            <td className="col-1"><input className="col-12" type="text" name="cible" defaultValue={item.cible}></input></td>
                            <td className="col-1">
                                <select className="col-12"  name="unite">
                                    {
                                        uniteParam.map((uniteParam, index) => (
                                            <option 
                                                key={index}
                                                value={uniteParam.id}
                                               defaultValue={uniteParam.id.toString() === item.id_unite}
                                            >
                                                {uniteParam.type_unite}
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
                                                defaultValue={recuperationParam.id.toString() === item.id_recuperation}
                                            >
                                                {recuperationParam.type_recup} 
                                            </option> 
                                        ))
                                    }
                                </select>
                            </td>
                            <td className="col-2">
                                <button>Modifier</button>
                                <button>Supprimer</button>
                            </td>
                        </tr>
                        ))
                    }
                        <tr>
                            <td className="col-5"><input className="col-12" type="text" name="objectif" ref={(el) => inputRefs.current.push(el)} ></input></td>
                            <td className="col-1"><input className="col-12" type="text" name="poids" ref={(el) => inputRefs.current.push(el)} ></input></td>
                            <td className="col-1"><input className="col-12" type="text" name="cible" ref={(el) => inputRefs.current.push(el)} ></input></td>
                            <td className="col-1">
                                <select className="col-12"  name="unite" ref={(el) => inputRefs.current.push(el)} >
                                    {
                                        uniteParam.map((uniteParam, index) => (
                                            <option 
                                                key={index}
                                                value={uniteParam.id}
                                                selected={uniteParam.id === 1}
                                            >{uniteParam.type_unite}</option> 
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
                                            >{recuperationParam.type_recup}</option> 
                                        ))
                                    }
                                </select>
                            </td>
                            <td className="col-2">
                                <button onClick={updateParametrage}>Ajout</button>
                                <button onClick={resetInputs}>Initialiser</button>
                            </td>
                        </tr>
                </tbody>
            </table>
            <button onClick={saveAll}>Sauvegarder les données</button>
            <button onClick={initialiseAll}>Initialiser le tableau</button>
        </div>
    )
}

export default AjoutParamObj;

