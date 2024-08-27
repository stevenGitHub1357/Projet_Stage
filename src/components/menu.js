import React, { useEffect, useState } from "react"
import { NavLink,BrowserRouter as Router} from "react-router-dom"
import Route_menu from "./route/route"
import { useCookies } from "react-cookie"
import axios from "axios"
import { GetRole } from "./service/service-role"
import { useDispatch } from "react-redux/es/hooks/useDispatch"
import { useSelector } from "react-redux"
import { setMenusData } from "./feature/menus.slice"
import { setRolesData } from "./feature/roles.slice"
import { setProcessusData } from "./feature/processus.slice"
import { setUsersData } from "./feature/users.slice"
import Global_url from "../global_url"
import logo from '../images/logo-jouveTitle.png'
import $ from 'jquery'
import Route_Serv from './route/routeServer'

var Url = Global_url
const Menu =()=>{
    

    const [cookies, setCookie, removeCookie] = useCookies(['islogged_react','matricule_react','role_react','nom_complet_react','id_user'])
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
        // getAllData();
        getAllData();
    },[])
    

    async function getAllData(){
        // console.log(id_user);
        const user = await axios.post(Url+"/getUserByMatricule",{matricule:matricule})
        dispatch(setUsersData(user.data))
        const role = await axios.post(Url+"/getRoleByUser",{id_user:user.data[0].id_user})
        dispatch(setRolesData(role.data))
        const processus = await axios.post(Url+"/getProcessusByUser",{id_user:user.data[0].id_user})
        dispatch(setProcessusData(processus.data))
        axios.post(Url+"/getMenuByUser",{role: role.data, processus: processus.data}).then(res=>{
            dispatch(setMenusData(res.data))  
        })
    }

    
    
    function handleLogout(){
        setCookie("islogged_react","false")
        removeCookie("matricule_react")
        removeCookie("role_react")
        window.location.pathname = urlReact+'/home'
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

    const styleMenuDefault = {
            transition: "0.5s",
            width: "250px",
            height: "100vh",
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
                    
                    <ul className="nav d-block mt-3 scroller" >
                        {
                        listMenuSlice.filter(menu => menu.base===0).length>0 &&
                        listMenuSlice.filter(menu => menu.base===0).map((menu, index)  => (
                            <li className="nav-item nav-sousmenu" data-bs-toggle="tooltip" data-bs-placement="right" title={menu.labelle_menu} key={index}>
                                <NavLink className="btn btn-dark nav-link lien rounded-1 text-white d-flex justify-content-between"  to="Test" data-bs-toggle="collapse" 
                                        data-bs-target={"#collapseMenu"+index} aria-expanded="false" aria-controls="collapseExample" > 
                                    {!MenuCollapse ? <span className="titleMenu "> {menu.labelle_menu}</span>:<></>}
                                    <i className={menu.icon} data-bs-toggle="tooltip" data-bs-placement="right" title={menu.labelle_menu}></i>
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
                                                            {!MenuCollapse ? <i className={subMenu1.icon} data-bs-toggle="tooltip" data-bs-placement="right" title={subMenu1.labelle_menu}></i>:<></>}
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
                                                                                                {!MenuCollapse ? <i className={subMenu3.icon} data-bs-toggle="tooltip" data-bs-placement="right" title={subMenu3.labelle_menu}></i>:<></>}
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
            <div className={!theme ? " titlePage shadow-sm d-flex justify-content-between bg-white " : "bg-dark titlePage shadow-sm text-white d-flex justify-content-between"}>
                {/* <ul>
                    {
                        listProcessusSlice.map((process, index) => (
                            <li>
                                {process.libelle_processus}
                            </li>                        
                    ))}
                </ul> */}
                
                <img src={logo} alt="" width="40" className=""></img>
            </div>
            <Route_menu  MenuCollapse={MenuCollapse} theme={theme} logo={logo}/>
        </Router>
      
    )
}

export default Menu;