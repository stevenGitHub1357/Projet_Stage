import React, { useEffect, useState } from "react"
import { NavLink,BrowserRouter as Router} from "react-router-dom"
import Route_menu from "./route/route"
import { useCookies } from "react-cookie"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"


import 'bootstrap/dist/css/bootstrap.css';
import {styleMenuDefault,styleMenuMinim,styleImg} from './menu/style/styleMenu'

import { setMenusData } from "./feature/menus.slice"
import { setRolesData, setRolesUserData } from "./feature/roles.slice"
import { setProcessusData, setProcessusUserData } from "./feature/processus.slice"
import { setUsersData } from "./feature/users.slice"
import { setObjectifData } from "./feature/objectifs.slice"
import { setRevueDirectionEtape } from "./feature/revueDirection.slice"


import { GetRole } from "./service/service-role"

import logo from '../images/logo-jouveTitle.png'
import $ from 'jquery'
import Route_Serv from './route/routeServer'
import Deploy from "../Deploy"

import Global_url from "../global_url"
// import { GetAllDataByMatricule } from "../requete/Users"

var Url = Global_url

const Menu =()=>{
    

    const [cookies, setCookie, removeCookie] = useCookies(['islogged_react','matricule_react','role_react','nom_complet_react',"id_user","id_processus"])
    const [MenuCollapse, setMenuCollapse] = useState(false)
    const [theme, setTheme] = useState(false);
    const [background, setBackground] = useState("bg-dark");
    const dispatch = useDispatch()
    const userSlice = useSelector((state) => state.users.users)
    const listMenuSlice = useSelector((state) => state.menus.menus)
    const listRoleSlice = useSelector((state) => state.role.role)
    const listRoleUserSlice = useSelector((state) => state.role.roleUser)
    const listProcessusSlice = useSelector((state) => state.processus.processus)
    const listProcessusUserSlice = useSelector((state) => state.processus.processusUser)
    const urlReact = Route_Serv;
    let matricule = cookies.matricule_react;
    const heightFenetre = window.innerHeight;

    const menuProcesus = [
        {id:1, nom:"Revue du plan", libelle:"Revue du plan d'action",icon:"bi bi-inboxes", path:"revue"},
        {id:2, nom:"Efficaciter", libelle:"Efficacité des actions face aux risques, enjeux et opportunités",icon:"bi bi-journal-check", path:"efficacite"},
        {id:3, nom:"Revue performance", libelle:"Revue de la performance du processus",icon:"bi bi-graph-up-arrow", path:"performance"},
        {id:4, nom:"Résultats des audits", libelle:"Résultats des audits",icon:"bi bi-list-check", path:"resultat"},
        {id:5, nom:"Plan d'action", libelle:"Plan d'action",icon:"bi bi-layers", path:"plan"},
        
    ]

    setRevueDirectionEtape(menuProcesus)
    // Fonction pour obtenir l'URL de base
    function getBaseURL() {
        const url = window.location.href;
        const protocol = window.location.protocol;
        const host = window.location.host;
    
        // Obtenir la partie principale de l'URL
        let basePart = `${protocol}//${host}/`;
    
        // Vérifier s'il y a une partie "suivant" dans l'URL
        const nextPart = url.split('/').slice(-2)[0];
    
        if (nextPart && nextPart !== '') {
            basePart += nextPart + '/';
        }
        console.log(basePart)
        return basePart;
    }

    // Fonction principale pour rediriger vers l'URL de base si nécessaire
    function redirectToBase() {
        const currentUrl = window.location.href;
        const baseUrl = getBaseURL();

        if (currentUrl !== baseUrl) {
            // window.history.replaceState({}, document.title, baseUrl);
            window.location.href = baseUrl

        }
    }

    useEffect(()=>{
        getAllData()
        // redirectToBase();
    },[])
    

    async function getAllData(){
        const user = await axios.post(Url+"/getUserByMatricule",{matricule:matricule})
        // console.log(user)
        dispatch(setUsersData(user.data))
        
        setCookie("id_user",user.data[0].id_user)
        let role = await axios.post(Url+"/getRoleByUser",{id_user:user.data[0].id_user})
        // console.log(role)
        
        let processusUser = await axios.post(Url+"/getProcessusByUser",{id_user:user.data[0].id_user})
        // console.log(processusUser)
        

        await axios.get(Url+"/getProcessus").then(res=>{
            dispatch(setProcessusData(res.data))
            if(processusUser.data.includes(0)===true){
                dispatch(setProcessusUserData(res.data))
                processusUser = res
            }else{
                dispatch(setProcessusUserData(processusUser.data))
            }  
        })
        await axios.get(Url+"/getRole").then(res=>{
            dispatch(setRolesData(res.data))  
            if(role.data.map(role=> role.id_role).includes(0)===true){
                dispatch(setRolesUserData(res.data))
                role = res
            }else{
                dispatch(setRolesUserData(role.data))
            }
        })

        if(cookies.id_processus === undefined){
            setCookie("id_processus",processusUser.data[processusUser.data.length-1].id)
        }     
    

        axios.post(Url+"/getMenuByUser",{role: role.data, processus: processusUser.data}).then(res=>{
            dispatch(setMenusData(res.data)) 
            // console.log(res.data) 
        })
        
        // console.log(cookies.id_processus)
    }
    
    function handleLogout(){
        setCookie("islogged_react","false")
        removeCookie("matricule_react")
        removeCookie("role_react")
        removeCookie("id_processus")
        window.location.pathname = urlReact+'logout'
    }
    
    const darkMode = () =>{
        if(theme == true){
            setTheme(false)
            $('body').attr("class","bg-light")
            setBackground("bg-dark")
        }else{
            setTheme(true)
            setBackground("bg-dark")
            $('body').attr("class","darkMode")
        }
    }
    
    const CollapseMenu = () =>{
        if(MenuCollapse == false){
            setMenuCollapse(true)
           
        }else{
            setMenuCollapse(false)
        }
    }

    function changeProcessus(id){
        setCookie('id_processus',id)
        // console.log(cookies.id_processus+"  "+id)
    }
    
    return(
        <Router>
    
{/* Menu 1 */}
            
            <div className={!MenuCollapse ?  background + " fixed-top  " : background + " fixed-top text-center  " }style={!MenuCollapse ? styleMenuDefault : styleMenuMinim }>
                
                <div className="title text-white text-center">
                    <h6 className={!MenuCollapse ? " fs-4 titleMenu " : "d-none"}>Luminess-KPI</h6>
                    <button className={!MenuCollapse ? background + " border-0" : background + " border-0 mb-3 "}  type="button" onClick={CollapseMenu}> <i className={!MenuCollapse ? "bi bi-arrow-left-circle text-warning" : "bi bi-arrow-right-circle text-warning fs-5 "}></i> </button>
                    <h5 className={!MenuCollapse ? "titreProfil" : "d-none"}>{matricule} </h5>
                </div>
                    <hr className="text-success"></hr>
                <div className="menus mt-1" style={{ overflowY: 'auto', height: {heightFenetre}}} >
                    <ul className="nav d-block mt-3 scroller" >
                    {/* <div style={{ overflowY: 'auto', height: {heightFenetre}}}> */}
                        {
                        
                        // listMenuSlice.length > 0 &&
                        // listMenuSlice.length > 0 && 
                        
                        listMenuSlice.filter(menu => menu.base===0 && menu.position===1).length>0 &&
                        listMenuSlice.filter(menu => menu.base===0 && menu.position===1).map((menu, index)  => (
                            <li className="nav-item nav-sousmenu" data-bs-toggle="tooltip" data-bs-placement="right" title={menu.labelle_menu} key={index}>
                                <NavLink className="btn btn-dark nav-link lien rounded-1 text-white d-flex justify-content-between"  to={urlReact+menu.route} data-bs-toggle="collapse" 
                                        data-bs-target={"#collapseMenu"+index} aria-expanded="false" aria-controls="collapseExample"> 
                                        <div data-bs-toggle="collapse" data-bs-target={"#collapseMenu"+index} aria-expanded="false" aria-controls="collapseExample">
                                            {!MenuCollapse ? <span className="titleMenu "> {menu.labelle_menu}</span>:<></>}
                                        </div>
                                        <div data-bs-toggle="collapse" data-bs-target={"#collapseMenu"+index} aria-expanded="false" aria-controls="collapseExample">
                                            {true ? <i className={menu.icon} data-bs-toggle="tooltip" data-bs-placement="right" title={menu.labelle_menu}></i>:<></>}
                                        </div>
                                </NavLink>
                                <div className="collapse" id={"collapseMenu"+index}>
                                    { listMenuSlice.filter(subMenu1 => subMenu1.base=== menu.id_menu).length > 0 && (
                                        <div className={!MenuCollapse ? background + " card card-body " :background+" card p-0 pt-1 text-center " }>
                                            {
                                            listMenuSlice.filter(subMenu1=> subMenu1.base === menu.id_menu).map((subMenu1, subIndex) => (
                                                <span className="nav-item nav-sousmenu" data-bs-toggle="tooltip" data-bs-placement="right" title={subMenu1.labelle_menu} key={subIndex}>
                                                    <NavLink    className="btn btn-dark nav-link lien rounded-1 text-white d-flex justify-content-between"  
                                                                to={urlReact+subMenu1.route} >
                                                        <div data-bs-toggle="collapse" data-bs-target={"#collapseMenu2"+subIndex} aria-expanded="false" aria-controls="collapseExample">
                                                            {!MenuCollapse ? <span className="titleMenu "> {subMenu1.labelle_menu}</span>:<></>}
                                                        </div>
                                                        <div data-bs-toggle="collapse" data-bs-target={"#collapseMenu2"+subIndex} aria-expanded="false" aria-controls="collapseExample">
                                                            {true ? <i className={subMenu1.icon} data-bs-toggle="tooltip" data-bs-placement="right" title={subMenu1.labelle_menu}></i>:<></>}
                                                        </div>
                                                    </NavLink>
                                                    <div className="collapse" id={"collapseMenu2"+subIndex}>
                                                        {listMenuSlice.filter(subMenu2 => subMenu2.base=== subMenu1.id_menu).length > 0 &&  (
                                                            <div className={!MenuCollapse ? background + " card card-body " :background+" card p-0 pt-1 text-center " }>
                                                                {listMenuSlice.filter(subMenu2=> subMenu2.base === subMenu1.id_menu).map((subMenu2, subIndex2) => (
                                                                    <span className="nav-item nav-sousmenu" data-bs-toggle="tooltip" data-bs-placement="right" title={subMenu2.labelle_menu} key={subIndex2}>
                                                                        <NavLink    className="btn btn-dark nav-link lien rounded-1 text-white d-flex justify-content-between"  
                                                                                    to={urlReact+subMenu2.route} >
                                                                            <div data-bs-toggle="collapse" data-bs-target={"#collapseMenu3"+subIndex2} aria-expanded="false" aria-controls="collapseExample">
                                                                                {!MenuCollapse ? <span className="titleMenu "> {subMenu2.labelle_menu}</span>:<></>}
                                                                            </div>
                                                                            <div data-bs-toggle="collapse" data-bs-target={"#collapseMenu3"+subIndex2} aria-expanded="false" aria-controls="collapseExample">
                                                                                {true ? <i className={subMenu2.icon} data-bs-toggle="tooltip" data-bs-placement="right" title={subMenu2.labelle_menu}></i>:<></>}
                                                                            </div>
                                                                        </NavLink>
                                                                        <div className="collapse" id={"collapseMenu3"+subIndex2}>
                                                                        {listMenuSlice.filter(subMenu3 => subMenu3.base=== subMenu2.id_menu).length > 0 && (
                                                                                <div className={!MenuCollapse ? background + " card card-body " :background+" card p-0 pt-1 text-center " }>
                                                                                {listMenuSlice.filter(subMenu3=> subMenu3.base === subMenu2.id_menu).map((subMenu3, subIndex3) => (
                                                                                    <span className="nav-item nav-sousmenu" data-bs-toggle="tooltip" data-bs-placement="right" title={subMenu3.labelle_menu} key={subIndex3}>
                                                                                        <NavLink    className="btn btn-dark nav-link lien rounded-1 text-white d-flex justify-content-between"  
                                                                                                    to={urlReact+subMenu3.route} >
                                                                                            <div data-bs-toggle="collapse" data-bs-target={"#collapseMenu4"+subIndex3} aria-expanded="false" aria-controls="collapseExample">
                                                                                                {!MenuCollapse ? <span className="titleMenu "> {subMenu3.labelle_menu}</span>:<></>}
                                                                                            </div>
                                                                                            <div data-bs-toggle="collapse" data-bs-target={"#collapseMenu4"+subIndex3} aria-expanded="false" aria-controls="collapseExample">
                                                                                                {true ? <i className={subMenu3.icon} data-bs-toggle="tooltip" data-bs-placement="right" title={subMenu3.labelle_menu}></i>:<></>}
                                                                                            </div>
                                                                                        </NavLink>
                                                                                        {/*Si plus de 3 sous-menu ajout code ici*/} 
                                                                                    </span>
                                                                                ))}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))}
                    
{/* MenuProcesus */}

                        {
                        listProcessusUserSlice.filter(processus => processus.id!==0 && processus.id!==listProcessusUserSlice[listProcessusUserSlice.length-1].id).length>0 &&
                        listProcessusUserSlice.filter(processus => processus.id!==0 && processus.id!==listProcessusUserSlice[listProcessusUserSlice.length-1].id).map((processus, index)  => (
                            <li  className="nav-item nav-sousmenu" data-bs-toggle="tooltip" data-bs-placement="right" title={processus.libelle_processus} key={index} >
                                <NavLink className="btn btn-dark nav-link lien rounded-1 text-white d-flex justify-content-between"  to={urlReact+"acceuilProcessus"} data-bs-toggle="collapse" 
                                        data-bs-target={"#collapseProcessus"+index} aria-expanded="false" aria-controls="collapseExample" 
                                        onClick={() => changeProcessus(processus.id)} > 
                                        <div data-bs-toggle="collapse" data-bs-target={"#collapseProcessus"+index} aria-expanded="false" aria-controls="collapseExample">
                                            {!MenuCollapse ? <span className="titleMenu "> {processus.libelle_processus}</span>:<></>}
                                        </div>
                                        <div data-bs-toggle="collapse" data-bs-target={"#collapseProcessus"+index} aria-expanded="false" aria-controls="collapseExample">
                                            {true ? <span>{processus.abbrv}</span>:<></>}
                                        </div>
                                </NavLink>
                                <div className="collapse" id={"collapseProcessus"+index}>
                                    { menuProcesus.length > 0 && (
                                        <div className={!MenuCollapse ? background + " card card-body " :background+" card p-0 pt-1 text-center " }>
                                            {
                                            menuProcesus.map((subMenu, subIndex) => (
                                                <span className="nav-item nav-sousmenu" data-bs-toggle="tooltip" data-bs-placement="right" title={subMenu.nom} key={subIndex}>
                                                    <NavLink    className="btn btn-dark nav-link lien rounded-1 text-white d-flex justify-content-between"  
                                                                to={urlReact+subMenu.path} onClick={() => changeProcessus(processus.id)} >
                                                        <div data-bs-toggle="collapse" data-bs-target={"#collapseMenu2"+subIndex} aria-expanded="false" aria-controls="collapseExample">
                                                            {!MenuCollapse ? <span className="titleMenu "> {subMenu.nom}</span>:<></>}
                                                        </div>
                                                        <div data-bs-toggle="collapse" data-bs-target={"#collapseMenu2"+subIndex} aria-expanded="false" aria-controls="collapseExample">
                                                            {true ? <i className={subMenu.icon} data-bs-toggle="tooltip" data-bs-placement="right" title={subMenu.labelle_menu}></i>:<></>}
                                                        </div>
                                                    </NavLink>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))}
                    {/* </div>       */}
                    </ul>
                </div>
                <div className="log mb-5">
                    <button className="btn  btn-sm form-control text-white" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right"></i> <span className={!MenuCollapse ? "logoutText text-uppercase" :"d-none"}>Logout</span>
                    </button>
                </div>
            
            </div>



{/* Menu 2 */}
            <div className={!theme ? "row titlePage shadow-sm d-flex justify-content-between bg-white" : "bg-dark titlePage shadow-sm text-white d-flex justify-content-between row"}>
                        <div className="col-2"></div>
                        {
                        // listMenuSlice.length > 0 &&
                        listMenuSlice.filter(menu => menu.base===0 && menu.position===2).length>0 && 
                        listMenuSlice.filter(menu => menu.base===0 && menu.position===2).map((menu, index)  => (
                            <ul className="col-2 float-end float-right" data-bs-toggle="tooltip" data-bs-placement="right" title={menu.labelle_menu} key={index}>
                                <NavLink className="btn btn-dark nav-link lien rounded-1 text-black d-flex justify-content-between"  to={urlReact+menu.route} data-bs-toggle="collapse" 
                                        data-bs-target={"#collapseMenu"+index} aria-expanded="false" aria-controls="collapseExample"> 
                                        <div className="col-8" data-bs-toggle="collapse" data-bs-target={"#collapseMenu"+index} aria-expanded="false" aria-controls="collapseExample">
                                            {true ? <span className="titleMenu "> {menu.labelle_menu}</span>:<></>}
                                        </div>
                                        <div className="col-4" data-bs-toggle="collapse" data-bs-target={"#collapseMenu"+index} aria-expanded="false" aria-controls="collapseExample">
                                            {true ? <i className={menu.icon} data-bs-toggle="tooltip" data-bs-placement="right" title={menu.labelle_menu}></i>:<></>}
                                        </div>
                                </NavLink>
                                <div className="collapse" id={"collapseMenu"+index}>
                                    { listMenuSlice.filter(subMenu1 => subMenu1.base=== menu.id_menu).length > 0 && (
                                        <div className={true ? background + " card card-body " :background+" card p-0 pt-1 text-center " }>
                                            {
                                            listMenuSlice.filter(subMenu1=> subMenu1.base === menu.id_menu).map((subMenu1, subIndex) => (
                                                <span className="nav-item nav-sousmenu" data-bs-toggle="tooltip" data-bs-placement="right" title={subMenu1.labelle_menu} key={subIndex}>
                                                    <NavLink    className="btn btn-dark nav-link lien rounded-1 text-white d-flex justify-content-between"  
                                                                to={urlReact+subMenu1.route} >
                                                        <div data-bs-toggle="collapse" data-bs-target={"#collapseMenu2"+subIndex} aria-expanded="false" aria-controls="collapseExample">
                                                            {true ? <span className="titleMenu "> {subMenu1.labelle_menu}</span>:<></>}
                                                        </div>
                                                        <div data-bs-toggle="collapse" data-bs-target={"#collapseMenu2"+subIndex} aria-expanded="false" aria-controls="collapseExample">
                                                            {true ? <i className={subMenu1.icon} data-bs-toggle="tooltip" data-bs-placement="right" title={subMenu1.labelle_menu}></i>:<></>}
                                                        </div>
                                                    </NavLink>
                                                    
                                                    <div className="collapse" id={"collapseMenu2"+subIndex}>
                                                        {listMenuSlice.filter(subMenu2 => subMenu2.base=== subMenu1.id_menu).length > 0 &&  (
                                                            <div className={!MenuCollapse ? background + " card card-body " :background+" card p-0 pt-1 text-center " }>
                                                                {listMenuSlice.filter(subMenu2=> subMenu2.base === subMenu1.id_menu).map((subMenu2, subIndex2) => (
                                                                    <span className="nav-item nav-sousmenu" data-bs-toggle="tooltip" data-bs-placement="right" title={subMenu2.labelle_menu} key={subIndex2}>
                                                                        <NavLink    className="btn btn-dark nav-link lien rounded-1 text-white d-flex justify-content-between"  
                                                                                    to={urlReact+subMenu2.route} >
                                                                            <div data-bs-toggle="collapse" data-bs-target={"#collapseMenu3"+subIndex2} aria-expanded="false" aria-controls="collapseExample">
                                                                                {!MenuCollapse ? <span className="titleMenu "> {subMenu2.labelle_menu}</span>:<></>}
                                                                            </div>
                                                                            <div data-bs-toggle="collapse" data-bs-target={"#collapseMenu3"+subIndex2} aria-expanded="false" aria-controls="collapseExample">
                                                                                {!MenuCollapse ? <i className={subMenu2.icon} data-bs-toggle="tooltip" data-bs-placement="right" title={subMenu2.labelle_menu}></i>:<></>}
                                                                            </div>
                                                                        </NavLink>
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </span>
                                                      
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </ul>
                            
                            )
                                
                        )}
                        
{/* Menu 3 */}
                        
                        <NavLink className="col-1"  to="Test" data-bs-toggle="modal" data-bs-target={"#collapseMenuLogo"} aria-expanded="false" aria-controls="collapseExample"> 
                            <img src={logo}  className="col-2" style={styleImg} ></img>
                        </NavLink>
                        
                                {/* <div className="row" >
                                <div className="col-10"></div> */}
                                <div className="modal fade" id="collapseMenuLogo" style={{float:"right"}}>
                                <div className="modal-dialog modal-sm modal-dialog-right ">
                                    <div className={"modal-content bg-dark"}>
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel" style={{color:"white"}}>Luminess KPI</h5>
                                        </div>
                                        <div className="modal-body">
                                            {
                                            listMenuSlice.length > 0 &&
                                            listMenuSlice.filter(menu => menu.base===0 && menu.position===3).map((menu, index) =>(
                                                <span className="nav-item nav-sousmenu" data-bs-toggle="tooltip" data-bs-placement="right" title={menu.labelle_menu} key={index}>
                                                    <NavLink    className="btn btn-dark nav-link lien rounded-1 text-white d-flex justify-content-between"  
                                                                to={urlReact+menu.route} data-bs-toggle="collapse" 
                                                                data-bs-target={"#collapseMenu2"+index} aria-expanded="false" aria-controls="collapseExample" >
                                                        <div data-bs-toggle="collapse" data-bs-target={"#collapseMenu2"+index} aria-expanded="false" aria-controls="collapseExample">
                                                            {true ? <span className="titleMenu "> {menu.labelle_menu}</span>:<></>}
                                                        </div>
                                                        <div data-bs-toggle="collapse" data-bs-target={"#collapseMenu2"+index} aria-expanded="false" aria-controls="collapseExample">
                                                            {true ? <i className={menu.icon} data-bs-toggle="tooltip" data-bs-placement="right" title={menu.labelle_menu}></i>:<></>}
                                                        </div>
                                                    </NavLink>
                                                    <div className="collapse" id={"collapseMenu2"+index}>
                                                        {listMenuSlice.filter(subMenu2 => subMenu2.base=== menu.id_menu).length > 0 &&  (
                                                            <div className={background + " card card-body "}>
                                                                {listMenuSlice.filter(subMenu2=> subMenu2.base === menu.id_menu).map((subMenu2, subIndex2) => (
                                                                    <span className="nav-item nav-sousmenu" data-bs-toggle="tooltip" data-bs-placement="right" title={subMenu2.labelle_menu} key={subIndex2}>
                                                                        <NavLink    className="btn btn-dark nav-link lien rounded-1 text-white d-flex justify-content-between"  
                                                                                    to={urlReact+subMenu2.route} >
                                                                            <div data-bs-toggle="collapse" data-bs-target={"#collapseMenu3"+subIndex2} aria-expanded="false" aria-controls="collapseExample">
                                                                                {true ? <span className="titleMenu "> {subMenu2.labelle_menu}</span>:<></>}
                                                                            </div>
                                                                            <div data-bs-toggle="collapse" data-bs-target={"#collapseMenu3"+subIndex2} aria-expanded="false" aria-controls="collapseExample">
                                                                                {true ? <i className={subMenu2.icon} data-bs-toggle="tooltip" data-bs-placement="right" title={subMenu2.labelle_menu}></i>:<></>}
                                                                            </div>
                                                                        </NavLink>
                                                                        <div className="collapse" id={"collapseMenu3"+subIndex2}>
                                                                            {listMenuSlice.filter(subMenu3 => subMenu3.base=== subMenu2.id_menu).length > 0 &&  (
                                                                                <div className={background + " card card-body "}>
                                                                                    {listMenuSlice.filter(subMenu3=> subMenu3.base === subMenu2.id_menu).map((subMenu3, subIndex3) => (
                                                                                        <span className="nav-item nav-sousmenu" data-bs-toggle="tooltip" data-bs-placement="right" title={subMenu3.labelle_menu} key={subIndex3}>
                                                                                            <NavLink    className="btn btn-dark nav-link lien rounded-1 text-white d-flex justify-content-between"  
                                                                                                        to={urlReact+subMenu3.route} >
                                                                                                <div data-bs-toggle="collapse" data-bs-target={"#collapseMenu4"+subIndex3} aria-expanded="false" aria-controls="collapseExample">
                                                                                                    {true ? <span className="titleMenu "> {subMenu3.labelle_menu}</span>:<></>}
                                                                                                </div>
                                                                                                <div data-bs-toggle="collapse" data-bs-target={"#collapseMenu4"+subIndex3} aria-expanded="false" aria-controls="collapseExample">
                                                                                                    {true ? <i className={subMenu3.icon} data-bs-toggle="tooltip" data-bs-placement="right" title={subMenu3.labelle_menu}></i>:<></>}
                                                                                                </div>
                                                                                            </NavLink>
                                                                                        </span>
                                                                                    ))}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </span>
                                                      
                                            ))}
                                            <span className="nav-item nav-sousmenu ">
                                                <button className="btn btn-dark nav-link lien rounded-1 w-100 text-white d-flex justify-content-between" data-bs-toggle="collapse" data-bs-target="#theme" aria-expanded="false" aria-controls="collapseExample" > 
                                                    {true ? <span className= "titleMenu mt-3" > Thèmes</span> : <></>}
                                                    <i className="bi bi-brush d-inline"></i>
                                                </button>
                                                <div className="collapse" id="theme">
                                                    <div className={!MenuCollapse ? background+" card card-body " :background+" card p-0 pt-1 text-center " }>
                                                                <button className="btn btn-dark lien rounded-1 mb-2 text-center" onClick={darkMode}  > 
                                                                <i className={theme ? "bi bi-brightness-high" : "bi bi-moon"}></i>{!MenuCollapse ? <span className="titleMenu ms-2">{theme ? "Light " : "Dark " }  Mode</span> : <></>}
                                                                </button>
                                                    </div>
                                                </div>
                                            </span>
                                            {
                                                listRoleUserSlice.map(role=>role.id_role).includes(0) || listRoleUserSlice.map(role=>role.id_role).includes(1) & Url.includes("localhost")?
                                                <Deploy/>
                                                :
                                                <></>
                                            } 
                                            
                                            <div className="log">
                                                <button className="btn  btn-sm form-control text-white" onClick={handleLogout}>
                                                    <i className="bi bi-box-arrow-right"></i> <span className={!MenuCollapse ? "logoutText text-uppercase" :"d-none"}>Logout</span>
                                                </button>
                                            </div>
                                        </div>
                                    
                                </div> 
                                </div>
                                </div>
                                {/* </div> */}
                        
                
                
            </div>
            <Route_menu  MenuCollapse={MenuCollapse} theme={theme} logo={logo}/>
        </Router>
      
    )
}

export default Menu;