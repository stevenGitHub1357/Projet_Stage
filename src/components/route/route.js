import React from "react";
import {Route,Routes} from "react-router-dom";
import Home from "../home/home";
import Index_menu from "../menu/index_menu";
import Login from "../login/login";
import User from "../utilisateur/index_user";
import Module from "../module/module";
import Test from "../test/test";
import Route_Serv from "./routeServer"

let Route_Server = Route_Serv;
const Route_menu =({MenuCollapse,theme,logo})=>{
    
    return(
        <Routes>
            <Route path={Route_Server + "acceuil"} element={<Home MenuCollapse={MenuCollapse} theme={theme} logo={logo} />}></Route>
            <Route path={Route_Server + "menu"} element={<Index_menu MenuCollapse={MenuCollapse} theme={theme} logo={logo} />}></Route>
            <Route path={Route_Server + "login"} element={<Login/>}></Route>
            <Route path={Route_Server + "utilisateur"} element={<User MenuCollapse={MenuCollapse} theme={theme} logo={logo} />}></Route>
            <Route path={Route_Server + "*"} element={<Home MenuCollapse={MenuCollapse} theme={theme} logo={logo} />}></Route>
            <Route path={Route_Server + "module"} element = {<Module MenuCollapse={MenuCollapse} theme={theme} logo={logo}/>}></Route>
            <Route path={Route_Server + "test"} element = {<Test MenuCollapse={MenuCollapse} theme={theme} logo={logo}/>}></Route>

        </Routes>
    )
}
export default Route_menu;