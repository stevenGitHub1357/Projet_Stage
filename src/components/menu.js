import React, { useEffect, useState } from "react"
import { NavLink,BrowserRouter as Router} from "react-router-dom"
import Route_menu from "./route/route"
import { useCookies } from "react-cookie"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"


import 'bootstrap/dist/css/bootstrap.css';
import {styleMenuDefault,styleMenuMinim,styleImg} from './menu/style/styleMenu'

import { setMenusData } from "./feature/menus.slice"
import { setRolesData } from "./feature/roles.slice"
import { setProcessusData } from "./feature/processus.slice"
import { setUsersData } from "./feature/users.slice"
import { setObjectifData } from "./feature/Objectifs.slice"


import { GetRole } from "./service/service-role"
import Global_url from "../global_url"
import logo from '../images/logo-jouveTitle.png'
import $ from 'jquery'
import Route_Serv from './route/routeServer'

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
    const listProcessusSlice = useSelector((state) => state.processus.processus)
    const urlReact = Route_Serv;
    let matricule = cookies.matricule_react;

    useEffect(()=>{
        getAllData();
    },[])
    

    async function getAllData(){
        const user = await axios.post(Url+"/getUserByMatricule",{matricule:matricule})
        dispatch(setUsersData(user.data))
        setCookie("id_user",user.data[0].id_user)
        const role = await axios.post(Url+"/getRoleByUser",{id_user:user.data[0].id_user})
        dispatch(setRolesData(role.data))
        const processus = await axios.post(Url+"/getProcessusByUser",{id_user:user.data[0].id_user})
        dispatch(setProcessusData(processus.data))
        setCookie("id_processus",processus.data[processus.data.length-1].id)
        axios.post(Url+"/getMenuByUser",{role: role.data, processus: processus.data}).then(res=>{
            dispatch(setMenusData(res.data))  
        })
    }
    
    function handleLogout(){
        setCookie("islogged_react","false")
        removeCookie("matricule_react")
        removeCookie("role_react")
        removeCookie("id_processus")
        window.location.pathname = urlReact+'/login'
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
    
    return(
        <Router>
    
{/* Menu 1 */}
            
            <div className={!MenuCollapse ?  background + " fixed-top  " : background + " fixed-top text-center  " } style={!MenuCollapse ? styleMenuDefault : styleMenuMinim}>
                
                <div className="menus mt-1">
                    <div className="title text-white text-center">
                        <h6 className={!MenuCollapse ? " fs-4 titleMenu " : "d-none"}>Luminess-KPI</h6>
                        <button className={!MenuCollapse ? background + " border-0" : background + " border-0 mb-3 "}  type="button" onClick={CollapseMenu}> <i className={!MenuCollapse ? "bi bi-arrow-left-circle text-warning" : "bi bi-arrow-right-circle text-warning fs-5 "}></i> </button>
                        <h5 className={!MenuCollapse ? "titreProfil" : "d-none"}>{matricule} </h5>
                    </div>
                    <hr className="text-success"></hr>
                    
                    <ul className="nav d-block mt-3 scroller" >
                        {
                        listMenuSlice.filter(menu => menu.base===0 && menu.position===1).length>0 &&
                        listMenuSlice.filter(menu => menu.base===0 && menu.position===1).map((menu, index)  => (
                            <li className="nav-item nav-sousmenu" data-bs-toggle="tooltip" data-bs-placement="right" title={menu.labelle_menu} key={index}>
                                <NavLink className="btn btn-dark nav-link lien rounded-1 text-white d-flex justify-content-between"  to={urlReact+menu.route} data-bs-toggle="collapse" 
                                        data-bs-target={"#collapseMenu"+index} aria-expanded="false" aria-controls="collapseExample" > 
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
                     
                            
                
                    </ul>
                </div>
                <div className="log">
                    <button className="btn  btn-sm form-control text-white" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right"></i> <span className={!MenuCollapse ? "logoutText text-uppercase" :"d-none"}>Logout</span>
                    </button>
                </div>
            
            </div>



{/* Menu 2 */}
            <div className={!theme ? "row titlePage shadow-sm d-flex justify-content-between bg-white row" : "bg-dark titlePage shadow-sm text-white d-flex justify-content-between row"}>
                        <div className="col-2"></div>
                        {
                        listMenuSlice.filter(menu => menu.base===0 && menu.position===2).length>0 && 
                        listMenuSlice.filter(menu => menu.base===0 && menu.position===2).map((menu, index)  => (
                            <ul className="col-2 float-end float-right" data-bs-toggle="tooltip" data-bs-placement="right" title={menu.labelle_menu} key={index}>
                                <NavLink className="btn btn-dark nav-link lien rounded-1 text-white d-flex justify-content-between"  to={urlReact+menu.route} data-bs-toggle="collapse" 
                                        data-bs-target={"#collapseMenu"+index} aria-expanded="false" aria-controls="collapseExample" > 
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
                        
                        <NavLink className="col-1"  to="Test" data-bs-toggle="collapse" data-bs-target={"#collapseMenu"} aria-expanded="false" aria-controls="collapseExample" > 
                            <img src={logo}  className="col-2" style={styleImg} ></img>
                        </NavLink>
        
                                <div className="row">
                                <div className="col-10"></div>
                                <div className="collapse col-2" id="collapseMenu" >
                                    
                                        <div className={background + " card card-body "}>
                                            {
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
                                            <div className="log">
                                                <button className="btn  btn-sm form-control text-white" onClick={handleLogout}>
                                                    <i className="bi bi-box-arrow-right"></i> <span className={!MenuCollapse ? "logoutText text-uppercase" :"d-none"}>Logout</span>
                                                </button>
                                            </div>
                                        </div>
                                    
                                </div>  
                                </div>
                        
                
                
            </div>
            <Route_menu  MenuCollapse={MenuCollapse} theme={theme} logo={logo}/>
        </Router>
      
    )
}

export default Menu;