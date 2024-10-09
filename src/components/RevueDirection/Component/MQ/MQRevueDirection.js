import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import FichierExcel from "../../../import_export/FichierExcel";
import FACRevueDirection from "./FACRevueDirection";
import FNCRevueDirection from "./FNCRevueDirection";
import { Button, OverlayTrigger, Tooltip, Table, Form } from 'react-bootstrap';

const MQRevueDirection =({MenuCollapse,theme,logo})=>{

    const [afficher,setAfficher] = useState('FAC')
    const revueMQ = [
        {nom : "FAC"},
        {nom : "FNC"}
    ]
    const handleAfficher = (aff) => {
        setAfficher(aff)
    }
    
    return(
        <div>
                <div className="row col-6 mb-3">
                    {
                        revueMQ.length>0 ? (
                            revueMQ.map((revue, index)=>(
                                <div className="col-1 mx-1">
                                    <OverlayTrigger placement="top" overlay={<Tooltip>{revue.nom}</Tooltip>}>
                                        <button className="btn btn-success rounded-1 shadow" onClick={() => handleAfficher(revue.nom)} >{revue.nom}</button>
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
                {
                    afficher==='FAC' ? (<FACRevueDirection/>)
                    :
                    afficher==='FNC' ? (<FNCRevueDirection/>)
                    :
                    <></>
                }
        </div>
    );
}
export default MQRevueDirection;