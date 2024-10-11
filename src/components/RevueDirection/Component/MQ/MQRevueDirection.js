import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import FichierExcel from "../../../import_export/FichierExcel";
import { Button, OverlayTrigger, Tooltip, Table, Form } from 'react-bootstrap';
import ConsultationFAC from "./FAC/ConsultationFAC";
import ConsultationFNC from "./FNC/ConsultationFNC";
import SyntheseFAC from "./FAC/SyntheseFAC";
import SyntheseFNC from "./FNC/SyntheseFNC";
import { setRevueDirectionData } from "../../../feature/revueDirection.slice";
import Global_url from "../../../../global_url";
import axios from "axios";
var Url = Global_url

const MQRevueDirection =({MenuCollapse,theme,logo})=>{

    const dispatch = useDispatch();
    const [afficher,setAfficher] = useState('FAC')
    let revueDirection = useSelector((state) => state.revueDirection.revueDirection)
    revueDirection = revueDirection.filter(revue=> revue.parametrage.id_processus === 2)
    let [revueMQ, setRevueMQ] = useState(revueDirection[0])
    // console.log(revueDirection)

    

    const handleAfficher = (aff) => {
        console.log(aff)
        let revue = {}
        revueDirection.filter(revue => revue.revue_direction===aff).map((revues)=>(
            revue = revues
        ))
        setRevueMQ(revue)
        console.log(revue)
        setAfficher(aff)
    }
    
    return(
        <div>
                <div className="row col-6 mb-3">
                    {
                        revueDirection.length>0 ? (
                            revueDirection.map((revue, index)=>(
                                <div className="col-1 mx-1">
                                    <OverlayTrigger placement="top" overlay={<Tooltip>{revue.libelle}</Tooltip>}>
                                        <button className="btn btn-success rounded-1 shadow" onClick={() => handleAfficher(revue.revue_direction)} >{revue.revue_direction}</button>
                                    </OverlayTrigger>
                                </div>
                            ))
                        
                        ) : (
                            <></>
                        )
                    }
                    <div className="col-4 mx-1">
                        <FichierExcel action={"2"}/>
                    </div>  
                </div>
                {   revueMQ !== undefined ?
                    <>
                    <div className="row">
                        <div className="col-2"><h5>Objectif : </h5></div>
                            <div className="col-10">
                            {revueMQ.parametrage.objectifs}
                        </div>
                    </div>
                    {
                        afficher === "FNC" ?
                        <>   
                        <ConsultationFNC cible = {revueMQ.parametrage.cible}/>
                        <SyntheseFNC cible = {revueMQ.parametrage.cible}/>
                        </>
                        :
                        afficher === "FAC" ?
                        <>
                        <ConsultationFAC cible = {revueMQ.parametrage.cible}/>
                        <SyntheseFAC cible = {revueMQ.parametrage.cible}/>
                        </>
                        :<></>     
                    }
                    </>
                    :
                    <>
                        <h5>Veuiller choisir</h5>
                    </>
                }
        </div>
    );
}
export default MQRevueDirection;