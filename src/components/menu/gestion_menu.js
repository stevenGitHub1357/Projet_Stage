import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { IconList } from "./icon";
// import './style/styleMenu.css'
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
    const rolesSlice = useSelector((state)=> state.role.role)
    const processusSlice = useSelector((state)=> state.processus.processus)
    const  [btnIcon, setBtnIcon] = useState("bi bi-emoji-smile")
    const [listIcon,setListIcon] = useState(IconList)
    const [etat_modal, setEtatModal] = useState(false)
    const [collapse_sous_menu, setCollpaseSM] = useState(false)
    const [role_modif, setRoleModif] = useState([])
    const base = useRef()
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
    const [checkedProcess, setCheckedProcess] = useState([])
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

    async function AddMenu(){

        let objMenu = {
            base : base.current.value,
            id_menu:id_menu.current.value,
            icon: Icon.current.value,
            labelle_menu: menu.current.value,
            route: route.current.value,
            role: checked,
            processus: checkedProcess
        }
        
        console.log(objMenu)
    
        if(Icon.current.value == "" || menu.current.value == "" ){
            Warning('Information incomplète !')
            return
        }
        // if(id_menu.current.value != ""){
        //     dispatch(updateMenu(objMenu))
        //     axios.post(Url+"/Update-Menu",objMenu).then(res=>{
        //     }) 
        //     Success('Mise à jour effectué avec succès !')
        //     reset()
        //     return
        // }
        dispatch(addMenu(objMenu))
        let res = {}
        await axios.post(Url+"/insertMenu",objMenu).then(result =>{
            res = result.data
        })
        console.log(res)
        console.log({id_menu : res.id_menu, processus: objMenu.processus})
        console.log({id_menu : res.id_menu, processus: objMenu.processus})
        await axios.post(Url+"/insertMenuProcessus",{id_menu : res.id_menu, processus: objMenu.processus}).then(res =>{})
        await axios.post(Url+"/insertMenuRole",{id_menu : res.id_menu, role: objMenu.role}).then(res =>{})
        Success()
        setEtatModal(false)
        setChecked([null])
        setCheckedProcess([null])
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
        base.current.value = 0
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

    const handleCheckedProcessus = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
          updatedList = [...checked, event.target.value];
        } else {
          updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setCheckedProcess(updatedList);
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
                <div className="col-lg-2 mt-2">
                    <select className={!theme ? "form-control" : "form-control darkMode border-dark text-white"} ref={base}>
                        
                        <option value={0}>
                            Base Menu
                        </option>
                        {menusSlice.map((menu,index) => 
                            <option value={menu.id_menu}>
                                {menu.labelle_menu+"(/"+menu.route+")"}
                            </option>
                        )}
                    </select>
                </div>
                <div className="col-lg-2 mt-2">
                    <input className={!theme ? "form-control" : "form-control darkMode border-dark text-white"} type="text" placeholder="Menu" ref={menu} />
                </div>
                <div className="col-lg-2 mt-2">
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
                    <button className="btn btn-outline-success form-control" data-bs-toggle="modal" data-bs-target={etat_modal == true ? "#processus_list_modif" : "#processus_list"}>Processus</button>
                    <div className="modal fade" id="processus_list">
                        <div className="modal-dialog modal-sm modal-dialog-centered">
                            <div className={!theme ? "modal-content" : "modal-content bg-dark"}>
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Listes des processuss</h5>
                                </div>
                                <div className="modal-body">
                                    <table className={!theme ? "table table-striped" : "table text-white"}>
                                        <tbody>
                                            {
                                                processusSlice.map((processus,index)=>
                                                    <tr key={index}>
                                                        <td>{processus.libelle_processus}</td>
                                                        <td><input type="checkbox" value={processus.id_processus}  onChange={handleCheckedProcessus} /></td>
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
                                                rolesSlice.map((roles,id)=>{
                                                    return(
                                                        <div key={id} className="p-2">{roles.type_role}</div>
                                                    )
                                                })
                                           }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className="btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target={"#listProcessus"+index}>Processus</button>
                            <div className="modal fade" id={"listProcessus"+index}>
                                <div className="modal-dialog modal-sm modal-dialog-centered">
                                    <div className={!theme ? "modal-content" : "modal-content bg-dark"}>
                                        <div className="modal-header ">
                                            <h5 className="text-center" id="exampleModalLabel">Listes des Processus</h5>
                                        </div>
                                        <div className="modal-body">
                                           {
                                                rolesSlice.map((roles,id)=>{
                                                    return(
                                                        <div key={id} className="p-2">{roles.type_role}</div>
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
                            
                    </div>
                    )
                }
                )
            }
        </>
    );
}

export default Gestion_menu;