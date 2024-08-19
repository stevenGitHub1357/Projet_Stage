import React, { useEffect, useState } from "react"
import { NavLink,Route,Routes,BrowserRouter as Router} from "react-router-dom"
import Route_menu from "./route/route"
import { useCookies } from "react-cookie"
import axios from "axios"
import { GetRole } from "./service/service-role"
import { useDispatch } from "react-redux/es/hooks/useDispatch"
import { setUsersData } from "./feature/users.slice"
import { useSelector } from "react-redux"
import { setMenusData } from "./feature/menus.slice"
import Global_url from "../global_url"
import logo from '../images/logo-jouveTitle.png'
import $ from 'jquery'

var Url = Global_url
const Menu =()=>{
    // window.location.pathname = '/react_app/home'

    const [cookies, setCookie, removeCookie] = useCookies(['islogged_react','matricule_react','role_react','nom_complet_react'])
    const [MenuCollapse, setMenuCollapse] = useState(false)
    const [theme, setTheme] = useState(false);
    const [background, setBackground] = useState("bg-dark");
    const dispatch = useDispatch()
    const listMenuSlice = useSelector((state) => state.menus.menus)

    useEffect(()=>{
        getAllMenu()
        // GetUsers()
    },[])

    function getAllMenu(){
        axios.get(Url+"/getMenus").then(res =>{
            
            dispatch(setMenusData(res.data))
        })
    }
    
    function handleLogout(){
        setCookie("islogged_react","false")
        removeCookie("matricule_react")
        removeCookie("role_react")
        window.location.pathname = '/react_app/home'
    }
        
        
        let matricule = cookies.matricule_react
        let role = cookies.role_react
        let nom_complet = cookies.nom_complet_react
        let roles = GetRole()
    
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

    const styleMenuDefault = {
            transition: "0.5s",
            width: "250px",
            height: "100vh",
            transition: "0.5s",
            // '@media screen and (max-width:1000px)' : {
            //     transition: "0.5s",
            //     width: "70px",
            //     height: "100vh"
            // }
    }

    const styleMenuMinim = {
        width: "70px",
        height: "100vh",
        transition: "0.5s"
    }
    
    


    return(
        <Router>
            <div className={!MenuCollapse ?  background + " fixed-top  " : background + " fixed-top text-center  " } style={!MenuCollapse ? styleMenuDefault : styleMenuMinim}>
                <div className="menus mt-1">
                    <div className="title text-white text-center">
                        <h6 className={!MenuCollapse ? " fs-4 titleMenu " : "d-none"}>React App</h6>
                        <button className={!MenuCollapse ? background + " border-0" : background + " border-0 mb-3 "}  type="button" onClick={CollapseMenu}> <i className={!MenuCollapse ? "bi bi-arrow-left-circle text-warning" : "bi bi-arrow-right-circle text-warning fs-5 "}></i> </button>
                        <h5 className={!MenuCollapse ? "titreProfil" : "d-none"}>{matricule} </h5>

                    </div>
                    <hr className="text-success"></hr>
                    {/* <div className="Profil text-center ">
                        <img width={!MenuCollapse ? "30%" : "50%"} className="rounded-5 border-success border border-2" src={"http://192.168.12.238:81/badge_jouve/photo/"+matricule+".jpg"}></img>
                        <div className={!MenuCollapse ? "mt-2 bg-dark p-2 rounded-2 mx-2 text-white" : "d-none"}>{nom_complet}</div>

                    </div> */}
                    
                    <ul className="nav d-block mt-3 scroller" >{
                        listMenuSlice.map((menu,index)=>
                            menu != undefined ?
                            menu.route == "" ?
                            <li className="nav-item nav-sousmenu" data-bs-toggle="tooltip" data-bs-placement="right" title={menu.labelle_menu} key={index}>
                                <NavLink className="btn btn-dark nav-link lien rounded-1 text-white d-flex justify-content-between"  to="Test" data-bs-toggle="collapse" data-bs-target={"#collapseMenu"+index} aria-expanded="false" aria-controls="collapseExample" > 
                                    {!MenuCollapse ? <span className="titleMenu "> {menu.labelle_menu}</span>:<></>}
                                    <i className={menu.icon} data-bs-toggle="tooltip" data-bs-placement="right" title={menu.labelle_menu}></i>
                                </NavLink>
                                
                                {/* <div className="collapse" id={"collapseMenu"+index}>
                                    <div className={!MenuCollapse ? background + " card card-body " :background+" card p-0 pt-1 text-center " }>
                                        {
                                            menu.sous_menus.filter(sous_menus => sous_menus.role_sous_menu.includes(role)).map((sous_menus,index)=>
                                                <NavLink className="nav-link  lien rounded-1 mb-2 d-flex justify-content-between" to={"react_app/"+sous_menus.route_sous_menu} style={({ isActive }) => ({ background: isActive ? "#00000078" : "" , color: isActive ? "#7ee2a6" : "#ffffff" })} > 
                                                    {!MenuCollapse ? <span className= "titleMenu ms-2 d-inline" > {sous_menus.nom_sous_menu}</span>:<></>}
                                                    <i className={sous_menus.icon_sous_menu }></i>
                                                </NavLink>
                                            )
                                        }
                                        
                                    </div>
                                </div> */}
                            </li>
                            :
                            <li className="nav-item bg-dark "  data-bs-toggle="tooltip" data-bs-placement="right" title={menu.labelle_menu} key={index}>
                                <NavLink className="nav-link lien rounded-1 d-flex justify-content-between"  style={({ isActive }) => ({ background: isActive ? "#00000078" : "", color: isActive ? "#7ee2a6" : "#ffffff"})} to={"react_app/"+menu.route}> 
                                    {!MenuCollapse ? <span className="titleMenu d-inline">{menu.labelle_menu}</span> : <></>}
                                    <i className={menu.icon } data-bs-toggle="tooltip" data-bs-placement="right" title={menu.labelle_menu}></i>
                                </NavLink>
                            </li>
                            :
                            <></>
                        )
                    }   
                        <li className="nav-item nav-sousmenu ">
                                <button className="btn btn-dark nav-link lien rounded-1 w-100 text-white d-flex justify-content-between" data-bs-toggle="collapse" data-bs-target="#theme" aria-expanded="false" aria-controls="collapseExample" > 
                                    {!MenuCollapse ? <span className= "titleMenu" > Thèmes</span> : <></>}
                                    <i className="bi bi-brush d-inline"></i>
                                </button>
                                <div className="collapse" id="theme">
                                    <div className={!MenuCollapse ? background+" card card-body " :background+" card p-0 pt-1 text-center " }>
                                                <button className="btn btn-dark lien rounded-1 mb-2 text-center" onClick={darkMode}  > 
                                                <i className={theme ? "bi bi-brightness-high" : "bi bi-moon"}></i>{!MenuCollapse ? <span className="titleMenu ms-2">{theme ? "Light " : "Dark " }  Mode</span> : <></>}
                                                </button>
                                    </div>
                                </div>
                            </li> 
                
                    </ul>
                </div>
                <div className="log">
                    <button className="btn  btn-sm form-control text-white" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right"></i> <span className={!MenuCollapse ? "logoutText text-uppercase" :"d-none"}>Logout</span>
                    </button>
                </div>
            
            </div>
            <Route_menu  MenuCollapse={MenuCollapse} theme={theme} logo={logo}/>
        </Router>
      
    )
}

export default Menu;