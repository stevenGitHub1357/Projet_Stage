import { useEffect } from "react";
import { TitlePage } from "../templates/templates"
import axios from "axios"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";

import Global_url from "../../global_url"
import { setParametrageObjectifData } from "../feature/parametrageObjectif.slice";

var Url = Global_url 

const ListParamObj = ({MenuCollapse,theme}) => {
    const dispatch = useDispatch()
    const itemParam = useSelector((state) => state.parametrageObjectif.parametrageObjectif)
    useEffect(()=>{
        setData()
        // console.log(itemParam)
    },[])

    const uniteParam = [
        {id : 1, type_unite : ""},
        {id : 2, type_unite : "%"}
    ]
    const recuperationParam= [
        {id : 1, type_recup : "manuel"},
        {id : 2, type_recup : "auto"}
    ]
    const processus =  useSelector((state) => state.processus.processus)

    function setData(){
        axios.get(Url+"/getParametrageObjectif").then(res=>{
            dispatch(setParametrageObjectifData(res.data))  
        })
    }

    return(
        <div  className={!MenuCollapse ? "content" : "contentCollapse"}>
            <TitlePage title="Liste parametrage objectif" process={true} theme={theme}/>
            <table className="row">
                <thead>
                    <tr className="row">
                        <th className="col-5">Objectif</th>
                        <th className="col-1">poids</th>
                        <th className="col-1">cible</th>
                        <th className="col-1">unite</th>
                        <th className="col-1">processus</th>
                        <th className="col-1">recuperation</th>
                        <th className="col-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        itemParam.filter(item => item.id !== 0).map((item, index) =>(
                        <tr key={index}>
                            <td className="col-5"><input className="col-12" type="message" size="40" name="objectif" defaultValue={item.objectifs}></input></td>
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
                            <td className="col-1">
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
                            
                            
                        </tr>
                        ))
                    }
                </tbody>
            </table>
        
        </div>
    )
}

export default ListParamObj;

