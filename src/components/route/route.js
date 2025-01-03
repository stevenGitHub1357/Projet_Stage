import React from "react";
import {Route,Routes} from "react-router-dom";
import Home from "../home/home";
import Index_menu from "../menu/index_menu";
import Login from "../login/login";
import User from "../Utilisateur/index_user";
import Module from "../module/module";
import Route_Serv from "./routeServer"
import GestionObjectif from "../Objectif/GestionObjectif";
import RevueDirection from "../RevueDirection/Component/RevueDirection";
import Revue from "../RevueDirection/Revue";
import Efficacite from "../RevueDirection/Efficacite";
import Performance from "../RevueDirection/Performance";
import Resultat from "../RevueDirection/Resultat";
import Plan from "../RevueDirection/Plan";
import HomeProcessus from "../home/homeProcessus";
import Planning from "../Planning/Planning";

const Route_menu =({MenuCollapse,theme,logo})=>{
    let Route_Server = Route_Serv;
    return(
        <Routes>
            <Route path={Route_Server + "*"} element={<Home MenuCollapse={MenuCollapse} theme={theme} logo={logo} />}></Route>
            <Route path={Route_Server + "accueil"} element={<Home MenuCollapse={MenuCollapse} theme={theme} logo={logo} />}></Route>
            <Route path={Route_Server + "menu"} element={<Index_menu MenuCollapse={MenuCollapse} theme={theme} logo={logo} />}></Route>
            <Route path={Route_Server + "login"} element={<Login/>}></Route>
            <Route path={Route_Server + "utilisateur"} element={<User MenuCollapse={MenuCollapse} theme={theme} logo={logo} />}></Route>
            <Route path={Route_Server + "module"} element = {<Module MenuCollapse={MenuCollapse} theme={theme} logo={logo}/>}></Route>
            <Route path={Route_Server + "gestionObjectifs"} element = {<GestionObjectif MenuCollapse={MenuCollapse} theme={theme} logo={logo} page={"1"}/>}></Route>
            <Route path={Route_Server + "multiParametrageObjectifs"} element = {<GestionObjectif MenuCollapse={MenuCollapse} theme={theme} logo={logo} page={"2"}/>}></Route>
            <Route path={Route_Server + "revueDirection"} element = {<RevueDirection MenuCollapse={MenuCollapse} theme={theme} logo={logo} />}></Route>
            <Route path={Route_Server + "revue/*"} element = {<Revue MenuCollapse={MenuCollapse} theme={theme} logo={logo} />}></Route>
            <Route path={Route_Server + "efficacite/*"} element = {<Efficacite MenuCollapse={MenuCollapse} theme={theme} logo={logo} />}></Route>
            <Route path={Route_Server + "performance/*"} element = {<Performance MenuCollapse={MenuCollapse} theme={theme} logo={logo} />}></Route>
            <Route path={Route_Server + "resultat/*"} element = {<Resultat MenuCollapse={MenuCollapse} theme={theme} logo={logo} />}></Route>
            <Route path={Route_Server + "plan/*"} element = {<Plan MenuCollapse={MenuCollapse} theme={theme} logo={logo} />}></Route>
            <Route path={Route_Server + "acceuilProcessus/*"} element = {<HomeProcessus MenuCollapse={MenuCollapse} theme={theme} logo={logo} />}></Route>
            <Route path={Route_Server + "planning"} element = {<Planning MenuCollapse={MenuCollapse} theme={theme} logo={logo} />}></Route>
        </Routes>
    )
}
export default Route_menu;