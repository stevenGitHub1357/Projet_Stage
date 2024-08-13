import React, { useEffect, useState } from "react";
import axios from "axios";
import Global_url from "../../global_url";
var Url = Global_url

const GetRole = () =>{
    const [role,setRole] = useState([]);
    useEffect(()=>{
        axios.get(Url + "/getRole").then(res => {setRole(res.data)},error => {},()=> {
        });  
    },[])
    return role
}
export {GetRole}
