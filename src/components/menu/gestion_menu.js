import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { IconList } from "./icon";
import './style/style.css'
import { Success, Warning } from "../service/service-alert";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { addMenu,deleteMenu,setMenusData,updateMenu } from "../feature/menus.slice";
import 'reactjs-popup/dist/index.css';
import Global_url from "../../global_url";
import Modal from "react-modal"
var Url = Global_url

const customStyles = {
    content: {
      top: '40%',
      left: '50%',
      right: 'auto',
      bottom: '50%',
      height:'70%',
      transform: 'translate(-50%, -50%)',
    },
  };
const Gestion_menu =({theme})=>{
    let subtitle
    const [modalIsOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()
    const menusSlice = useSelector((state) => state.menus.menus)
    const rolesSlice = useSelector((state)=> state.menus.roles )
    const  [btnIcon, setBtnIcon] = useState("bi bi-emoji-smile")
    const [listIcon,setListIcon] = useState(IconList)
    const [etat_modal, setEtatModal] = useState(false)
    const [collapse_sous_menu, setCollpaseSM] = useState(false)
    const [role_modif, setRoleModif] = useState([])
    const menu = useRef()
    const route = useRef()
    const Icon = useRef()
    const id_menu = useRef()
    const searchIcon = useRef()
    const role = useRef()
    const [nom_sous_menu,setNomSousMenu] = useState('')
    const [route_sous_menu,setRouteSousMenu] = useState('')
    const [icon_sous_menu,setIconSousMenu] = useState('')
    const [id_sous_menu, setIdSousMenu] = useState('')
    const [checked, setChecked] = useState([])
    const openModal = () =>{setIsOpen(true)}
    const afterOpenModal = () =>{subtitle.style.color="black"}
    const closeModal = () =>{setIsOpen(false)}
    /******drag and drop*****/
    const dragItem = useRef();
    const dragOverItem = useRef();
   

    const dragStart = (e,position) => {dragItem.current = position}
    const dragEnter = (e, position) => {dragOverItem.current = position}
    const drop = (e) => {
        const copyListItems = [...menusSlice]
        const dragItemContent = copyListItems[dragItem.current]
        copyListItems.splice(dragItem.current, 1)
        copyListItems.splice(dragOverItem.current, 0, dragItemContent)
        dragItem.current = null
        dragOverItem.current = null
        dispatch(setMenusData(copyListItems))
        axios.post(Url+"/updateRange",copyListItems).then(function(datas){})
       
    }
    const dragOver = (e) =>{e.preventDefault()}

    /* fin drag and drop */

    const NomSousMenu = (e) =>{
        setNomSousMenu(e.target.value)
    }

    const RouteSousMenu = (e) =>{
        setRouteSousMenu(e.target.value)
    }

    const IconSousMenu = (e) =>{
        setIconSousMenu(e.target.value)
    }
    const MajMenu = (item)=>{
        setEtatModal(true)
        console.log(item.role)
        setRoleModif(item.role)
        id_menu.current.value = item.id_menu
        route.current.value = item.route
        menu.current.value = item.labelle_menu
        Icon.current.value = item.icon
        setBtnIcon(item.icon)
        setChecked(item.role)
    }

    const DeleteMenu = (menu)=>{
        dispatch(deleteMenu(menu.id_menu))

        axios.post(Url+"/deleteMenu",menu).then(res =>{
        });
        Success()
    }

    const AddMenu = () =>{

        let objMenu = {
            id_menu:id_menu.current.value,
            icon: Icon.current.value,
            labelle_menu: menu.current.value,
            route: route.current.value,
            sous_menus:[],
            role: checked,
        }
        
        console.log(objMenu)
    
        if(Icon.current.value == "" || menu.current.value == "" ){
            Warning('Information incomplète !')
            return
        }
        if(id_menu.current.value != ""){
            dispatch(updateMenu(objMenu))
            axios.post(Url+"/Update-Menu",objMenu).then(res=>{
            }) 
            Success('Mise à jour effectué avec succès !')
            reset()
            return
        }
        dispatch(addMenu(objMenu))
        axios.post(Url+"/insertMenu",objMenu).then(res =>{
        })
        Success()
        setEtatModal(false)
        reset()
    }

    
    const BtnIcon = (e,icon) =>{
        e.preventDefault()
        setBtnIcon("bi bi-"+icon)
        Icon.current.value = "bi bi-"+icon
        setIconSousMenu("bi bi-"+icon)
    }

    const SearchIcon = () =>{
        let result = IconList.filter((icon)=> icon.includes(searchIcon.current.value))
        setListIcon(result)
    }

    const reset = () =>{
        id_menu.current.value = ""
        menu.current.value = ""
        route.current.value = ""
        setEtatModal(false)
    }
    const Initialisation = () =>{
        setIdSousMenu("")
        setIconSousMenu("")
        setNomSousMenu("")
        setRouteSousMenu("")
    }

    const handleCheckedRole = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
          updatedList = [...checked, event.target.value];
        } else {
          updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    }

    const AddRole = (role) =>{
        console.log(role.current.value)
        console.log(checked)
        var array = [...checked]
        if(!checked.includes(role.current.value)){
            array.push(role.current.value)
        }
        // setRoleModif(array)
        setChecked(array)

    }

    const RemoveRoleModif = (index)  =>{
        console.log(index)
        var array = [...checked]
        array.splice(index,1)
        // setRoleModif(array)
        setChecked(array)
    }
    console.log(menusSlice)
    const collapseSM = () =>{
        if(collapse_sous_menu == false){
            setCollpaseSM(true)
        }else{
            setCollpaseSM(false)
        }
    }
    
    return(
        <>
        <div className=" mb-4">
      
            <div className="row text-center">
                <input type="hidden" ref={id_menu}/>
                <input type="hidden" ref={Icon}/>
                <div className="col-lg-1 mt-2">
                    <button className={!theme ? "btn btn-dark" : "btn btn-warning"} data-bs-toggle="modal" data-bs-target="#iconInfo"><i className={btnIcon}></i></button>
                </div>
                <div className="col-lg-3 mt-2">
                    <input className={!theme ? "form-control" : "form-control darkMode border-dark text-white"} type="text" placeholder="Menu" ref={menu} />
                </div>
                <div className="col-lg-3 mt-2">
                    <input className={!theme ? "form-control" : "form-control darkMode border-dark text-white"} type="text" placeholder="Route" ref={route}  />
                </div>
                <div className="col-lg-2 mt-2">
                    
                    <button className="btn btn-outline-success form-control" data-bs-toggle="modal" data-bs-target={etat_modal == true ? "#role_list_modif" : "#role_list"}>Role</button>
                    <div className="modal fade" id="role_list">
                        <div className="modal-dialog modal-sm modal-dialog-centered">
                            <div className={!theme ? "modal-content" : "modal-content bg-dark"}>
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Listes des roles</h5>
                                </div>
                                <div className="modal-body">
                                    <table className={!theme ? "table table-striped" : "table text-white"}>
                                        <tbody>
                                            {
                                                rolesSlice.map((role,index)=>
                                                    <tr key={index}>
                                                        <td>{role.type_role}</td>
                                                        <td><input type="checkbox" value={role.id_role}  onChange={handleCheckedRole} /></td>
                                                    </tr>
                                                )

                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id="role_list_modif">
                        <div className="modal-dialog modal-sm modal-dialog-centered">
                            <div className={!theme ? "modal-content":"modal-content bg-dark"}>
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Listes des roles</h5>
                                </div>
                                <div className="modal-body">
                                    <table className={!theme ? "table table-striped":"table text-white"}>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <select className={!theme ? "form-control form-control-sm" : "form-control darkMode text-white border-dark"} ref={role}>
                                                    {
                                                        rolesSlice.map((role,index)=>
                                                           <option key={index} value={role.id_role}>{role.type_role}</option>
                                                        )
                                                    }
                                                    </select>
                                                </td>
                                                <td><button className={!theme ? "btn btn-success btn-sm" : "btn btn-success"} onClick={()=>AddRole(role)}> <i className="bi bi-plus"></i> </button></td>
                                            </tr>
                                            {
                                                checked.map((role,index)=>
                                                    <tr key={index}>
                                                        <td>{role == '1' ? "Administrateur" : role == '2' ? "Manageur" : role == '3' ? "Simple Utilisateur" : role == '4' ? "Developpeur" : role}</td>
                                                        <td><button className="btn btn-danger btn-sm" onClick={()=>RemoveRoleModif(index)} ><i className="bi bi-dash"></i> </button></td>
                                                    </tr>
                                                )
                                            }
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 mt-2">
                    {/* <button className="btn btn-success ms-2" type="button" onClick={()=>AddMenu()} >Sous menus</button> */}
                    <button className="btn btn-primary ms-2" type="button" onClick={()=>AddMenu()} > <i className="bi bi-save"></i> </button>
                    <button className={!theme ? "btn btn-dark ms-2" : "btn btn-secondary ms-2"} onClick={()=>reset()} ><i className="bi bi-x-lg"></i></button>
                </div>
            </div>
        </div>
        <div className="modal fade" id="iconInfo">
            <div className="modal-dialog modal-dialog-scrollable modal-xl modal-dialog-centered">
                <div className={!theme ? "modal-content" : "modal-content bg-dark"}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Listes des Icons disponible</h5>
                        <input className="form-control form-control-sm w-25 ms-5" placeholder="Recherche ..." ref={searchIcon} onKeyUp={()=>SearchIcon()}></input>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body text-center">
                    {
                        listIcon.length > 0 ?
                        listIcon.map((icon,index)=>
                        <div className="d-inline shadow-sm text-center" key={index}>
                            <button className="btn btn-secondary btn-sm m-1 text-center fs-5" data-bs-dismiss="modal" onMouseOver={(e)=>BtnIcon(e,icon)}> <i className={"bi bi-"+icon}></i> </button>
                        </div>
                        )
                        :
                        <span className="fs-5">Aucun Résultat</span>
                    }
                    </div>
                </div>
            </div>
        </div>
            {menusSlice.map((menu,index) =>{
                return(
                    <div className="row mb-3 p-3 border text-center shadow-sm" style={{transition:" 0.5s "}} onDragStart={(e) => dragStart(e,index)}
                        onDragEnter={(e) => dragEnter(e, index)} 
                        onDragEnd={drop} 
                        onDragOver={(e) =>dragOver(e)} 
                        key={index}
                        draggable>
                        
                        <div className="col-sm-3">
                            {
                                menu.route == "" || menu.route == null ? 
                                <button className="btn btn-secondary btn-sm" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse"+index} aria-expanded="false" aria-controls={"collapse"+index} >
                                    <i className= "bi bi-chevron-down "></i>
                                </button>
                                : ""
                            }
                            <button className="btn btn-primary btn-sm ms-2"><i className={menu.icon}></i></button>
                        </div>
                        <div className="col-sm-2 fs-4">{menu.labelle_menu}</div>
                        <div className="col-sm-2 fs-4">{menu.route}</div>
                        <div className="col-sm-3 text-center">
                            <button className="btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target={"#listRole"+index}>Role</button>
                            <div className="modal fade" id={"listRole"+index}>
                                <div className="modal-dialog modal-sm modal-dialog-centered">
                                    <div className={!theme ? "modal-content" : "modal-content bg-dark"}>
                                        <div className="modal-header ">
                                            <h5 className="text-center" id="exampleModalLabel">Listes des roles</h5>
                                        </div>
                                        <div className="modal-body">
                                           {
                                                menu.role.map((roles,id)=>{
                                                    return(
                                                        <div key={id} className="p-2">{roles == '1' ? "Administrateur" : roles == '2' ? "Manageur" : roles == '3' ? "Simple Utilisateur" : roles == '4' ? "Developpeur" : roles}</div>
                                                    )
                                                })
                                           }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className="btn btn-sm btn-success ms-2" type="button" onClick={()=>MajMenu(menu)} data-bs-toggle="tooltip" data-bs-placement="top" title="Modifier"><i className="bi bi-pen"></i></button>
                            <button className="btn btn-sm btn-danger ms-2" type="button" onClick={()=>DeleteMenu(menu)} disabled={menu.labelle_menu == "Administration" ? true : false} data-bs-toggle="tooltip" data-bs-placement="top" title="Supprimer"><i className="bi bi-trash"></i></button>
                        </div>
                        <div className="col-sm-1 fs-sm-4" data-bs-toggle="tooltip" data-bs-placement="top" title="Darg and Drop">
                        <i className="bi bi-grip-vertical"></i>
                        </div>

                        {/* sous_menusssss */}
                        <div className="row mb-2 px-4 collapse" id={"collapse"+index}>
                            <table className={!theme ? "table mt-2 table-striped" : "table mt-2 text-white"}>
                                <thead className="">
                                        <tr>
                                            <th>Icon</th>
                                            <th>Sous Menu</th>
                                            <th>Route</th>
                                            <th>Role</th>
                                            <th>Actions</th>
                                            <th></th>
                                        </tr>
                                </thead>
                                <tbody>{
                                        
                                        menu.sous_menus.map((sousMenu,i) =>{
                                            return(
                                                <tr  key={i}>
                                                    <td><button className={!theme ? "btn btn-sm btn-dark":"btn btn-sm btn-outline-warning"}> <i className={sousMenu.icon_sous_menu}></i> </button></td>
                                                    <td>{sousMenu.nom_sous_menu}</td>

                                                    <td>{sousMenu.route_sous_menu}</td>
                                                    <td>
                                                    <button className="btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target={"#listRoleSousMenu_"+i + "_"+index}>Role</button>
                                                    <div className="modal fade" id={"listRoleSousMenu_"+i + "_"+index}>
                                                        <div className="modal-dialog modal-sm modal-dialog-centered">
                                                            <div className={!theme ? "modal-content" : "modal-content bg-dark"}>
                                                                <div className="modal-header ">
                                                                    <h5 className="text-center" id="exampleModalLabel">Listes des roles</h5>
                                                                </div>
                                                                <div className="modal-body">
                                                                {
                                                                        sousMenu.role_sous_menu.map((roles,id)=>{
                                                                            return(
                                                                                <div key={id} className="p-2">{roles == '1' ? "Administrateur" : roles == '2' ? "Manageur" : roles == '3' ? "Simple Utilisateur" : roles == '4' ? "Developpeur" : roles}</div>
                                                                            )
                                                                        })
                                                                }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    </td>
                                                    <td>
                                                        {/* <button className="btn btn-sm btn-success ms-2" type="button" onClick={()=>SelectSousMenu(menu,i)} data-bs-toggle="tooltip" data-bs-placement="top" title="Modifier"><i className="bi bi-pen"></i></button>
                                                        <button className="btn btn-sm btn-danger ms-2" type="button" onClick={()=>DeleteMenuSousMenus(menu,i)} data-bs-toggle="tooltip" disabled={sousMenu.route_sous_menu == 'menu' || sousMenu.route_sous_menu == 'utilisateur' ? true : false} data-bs-placement="top" title="Supprimer"><i className="bi bi-trash"></i></button> */}
                                                    </td>
                                                    <td></td>

                                                </tr>
                                                    
                                                    )
                                                })
                                       
                                        }
                                    <tr>
                                        <td>
                                            <input type="hidden" value={icon_sous_menu}></input>
                                            <button className={!theme ? "btn btn-dark btn-sm" : "btn btn-sm btn-warning"} data-bs-toggle="modal" data-bs-target="#iconInfo" ><i className={btnIcon}></i></button>
                                        </td>
                                        <td>
                                            <input type="hidden" value={id_sous_menu}></input>
                                            <input className={!theme ? "form-control form-control-sm" : "form-control form-control-sm darkMode border-dark text-white" } placeholder="Sous menu" value={nom_sous_menu} onChange={(e)=>NomSousMenu(e)}></input>
                                        </td>
                                        <td>
                                            <input className={!theme ? "form-control form-control-sm" : "form-control form-control-sm darkMode border-dark text-white" } placeholder="Route sous menu" value={route_sous_menu} onChange={(e)=>RouteSousMenu(e)} ></input>
                                        </td>
                                        <td>
                                            <button className="btn btn-outline-success btn-sm" data-bs-toggle="modal" data-bs-target={etat_modal == true ? "#role_list_modif" : "#role_list"}>Role</button>
                                        </td>
                                        <td>
                                            {/* {id_sous_menu === '' ? 
                                                <button className="btn btn-sm btn-primary ms-2" type="button" onClick={()=>AjousSousMenu(menu)} ><i className="bi bi-save"></i></button>
                                                :
                                                <button  className="btn btn-sm btn-primary ms-2" type="button" onClick={()=>MajSousMenu(menu)}><i className="bi bi-save"></i></button>
                                            } */}
                                            <button className={!theme ? "btn btn-sm btn-dark ms-2" : "btn btn-sm btn-secondary ms-2"} onClick={()=>Initialisation()}><i className="bi bi-x-lg"></i></button>
                                        </td>
                                        <td></td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                    )
                }
                )
            }
        </>
    );
}

export default Gestion_menu;