import {React, useEffect, useState} from "react";
import Formulaire_User from "./formulaire_user";
import Tableau_User from "./tableau_user";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import axios from "axios";
import { GetRole } from "../service/service-role";
import { setUsersData } from "../feature/users.slice";
import Global_url from "../../global_url";
import { TitlePage } from "../templates/templates";
var Url = Global_url;
const User =({MenuCollapse,theme,logo})=>{
    const dispatch = useDispatch()
    let roles = GetRole()

    useEffect(()=>{
        axios.get(Url+"/getUsers").then(res =>{
            for(let i=0; i<res.data.length;i++){
                for(let j=0; j<roles.length; j++){
                    if(res.data[i].id_role == roles[j].id_role){
                        res.data[i].id_role = roles[j].type_role
                    }
                }
            }
            dispatch(setUsersData(res.data))
        })
    },[])

   

    return(
        <div className={!MenuCollapse ? "content" : "contentCollapse"}>
            <TitlePage title="Utilisateur" theme={theme}/>
            <div className="row content_scroll ">
            <div className="col-sm-12 ">
                <div className={!theme ? "card " : "card bg-dark"} >
                    <div className="card-body">
                        <div className={ !theme ?"card-title text-center display-6 " : "card-title text-center display-6 text-white"}>Gestion d'utilisateur</div>
                        <hr  className={!theme ? "" : "text-white"}></hr>
                        <div className="row px-5 mt-4">
                                <Formulaire_User theme={theme}/>
                                <hr></hr>
                                <Tableau_User theme={theme}/>
                        </div>
                    </div>
                </div>
            </div>
    </div>
        </div>
    
    );
}

export default User;