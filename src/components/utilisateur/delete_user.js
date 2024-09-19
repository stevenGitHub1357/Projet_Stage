import React from "react"
import { useCookies } from "react-cookie"
import { useDispatch } from "react-redux/es/hooks/useDispatch"
import { deleteUser } from "../feature/users.slice"
import { Success } from "../service/service-alert"
import axios from "axios"
import Global_url from "../../global_url"
var Url = Global_url
const Delete_User =({user})=>{
    const [cookies, setCookie, removeCookie] = useCookies([])
    const dispatch = useDispatch()
    const HandleDelete = () =>{
        dispatch(deleteUser(user.id_user))
        Success('')
        axios.post(Url + "/desactiveUser",{user}).then(() => {})
    }
    return(
        <button  className="btn btn-danger btn-sm ms-2" disabled={user.matricule == cookies.matricule_react || user.id_role == 1} onClick={()=> HandleDelete()}> <i className="bi bi-trash"></i> </button>
    )
}

export default Delete_User