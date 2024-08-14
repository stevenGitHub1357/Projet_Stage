import axios from "axios"
import React, { useEffect, useRef, useState } from "react"
import logo from './../../images/logo-jouveTitle.png'
import { useCookies } from 'react-cookie'
import Menu from "./../menu"
import { Danger, Success, Warning } from "../service/service-alert"
import Global_url from "../../global_url"
import { useDispatch } from "react-redux"
import { setMenusData } from "../feature/menus.slice"
import { secretKey,iv } from "../service/service-securite"
import CryptoJS from "crypto-js"
var Url = Global_url

const Login =()=>{
    const [cookies, setCookie, removeCookie] = useCookies(['islogged_react','matricule_react','role_react','nom_complet_react'])
    const dispatch = useDispatch()
    setCookie("islogged_react",false)
    const matricule = useRef()
    const mot_de_passe = useRef()
    const formLogin = useRef()
    const [countLog, setCountlog] = useState("")
    const [countAcces, setCountAcces] = useState(0)

    const handleSubmit = (e)=>{
        console.log("login");
        e.preventDefault()
        let user = {
            matricule:matricule.current == undefined ? '' : matricule.current.value ,
            mot_de_passe:mot_de_passe.current == undefined ? '': mot_de_passe.current.value
        }
        axios.post(Url+"/getNb-echec",user).then(res=>{
            console.log(res)
            if(res.data.lenght > 0){
                setCountAcces(res.data[0].nb_echec)
            }
        })
        axios.post(Url+"/getLog",user).then(res => {
            setCountlog(res.data[0].count)
            if(countLog == 0){
                Danger("Vérifiez le matricule et le mot de passe")
            }
        })

        if(user.matricule == '' || user.mot_de_passe == ''){
            Warning('Veuillez remplir les champs!')
            return
        }
    }
    
    if(countLog > 0 && countAcces < 3){
            axios.post(Url+"/get-info-log",{matricule:matricule.current.value}).then(res=>{
                var resRole = res.data[0].id_role.toString()
                setCookie('role_react',resRole )
                var resNom = res.data[0].nom +" "+res.data[0].prenom

                setCookie('nom_complet_react',resNom)
                
            })
            
            setCookie('islogged_react',true)
            var resMatricule = matricule.current.value
            setCookie('matricule_react',resMatricule)
            Success('Connecté avec succès !')

            return(<Menu/>)
        

    }else{
        
        if(countAcces >= 3){
            Danger("Accés Refusé")
        }
        removeCookie("matricule_react")
        removeCookie("role_react")
        return(   
            <div className="row row-login">
                <div className="col-sm-4"></div>
                <div className="col-sm-4">
                    <div className="card login shadow">
                        <div className="card-body">
                            <div className="title-log text-center mb-3">
                                <img src={logo} alt="logo" id="logoReact" className="logo w-50" />
                            </div>
                            <div className="text-center">
                                <h2>React App</h2>
                            </div>
                            <form className="mx-3 mt-4" onSubmit={(e) => handleSubmit(e)} ref={formLogin}>
                            <div className="form-floating mb-3">
                                <input className="form-control form-control-dark" ref={matricule} placeholder="Leave a comment here" id="floatingTextarea2"/>
                                <label htmlFor="floatingTextarea2">Matricule</label>
                            </div>
                            <div className="form-floating  mb-3">
                                <input className="form-control form-control-danger" ref={mot_de_passe} type="password" placeholder="Leave a comment here" id="floatingTextarea2"/>
                                <label htmlFor="floatingTextarea2">Mot de passe</label>
                            </div>
                            <div className="text-center mb-3">
                                <button type="submit" className="btn btn-dark form-control w-75">Valider</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4"></div>
            </div>
        )

    }
    
    
}

export default Login