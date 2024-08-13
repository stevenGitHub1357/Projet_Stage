import React, { useReducer } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import {setUpdateUsers } from "../feature/users.slice";
const Edit_user =({user})=>{
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const dispatch = useDispatch()
    const HandleUpdateUser = () =>{
        let obj = {
            id_user: user.id_user,
            matricule:user.matricule,
            nom:user.nom,
            prenom:user.prenom,
            id_role:user.id_role,
            mot_de_passe:user.mot_de_passe
        }
        dispatch(setUpdateUsers(obj))
    }   
    return(
        <>
        <button  className="btn btn-warning btn-sm ms-2" onClick={()=> HandleUpdateUser()}> <i className="bi bi-pen"></i> </button>
        </>
        
    );
}
export default Edit_user;