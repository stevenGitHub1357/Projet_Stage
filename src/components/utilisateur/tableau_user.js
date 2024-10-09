import {React} from "react"
import { useCookies } from "react-cookie"
import Delete_User from "./delete_user"
import { useSelector } from "react-redux/es/exports"
import Edit_user from "./edit_user"
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import "datatables.net-bs5"
import $ from 'jquery'
import './style.css'
import { utils, writeFile } from "xlsx"
import { format } from 'date-fns'
import { useState } from "react"
import axios from "axios"
import Global_url from "../../global_url";
import Modal from "react-modal"
var Url = Global_url



function Tableau_User({theme}){
    const [cookies, setCookie, removeCookie] = useCookies(['role_react'])
    const usersData = useSelector((state)=>state.users.users)
    const border = {
        border: !theme ? "": "black 1px solid"
    }

    const [roleActuel, setRoleActuel] = useState([])
    const [processusActuel, setProcessusActuel] = useState([])
    const rolesSlice = useSelector((state)=> state.role.role)
    const processusSlice = useSelector((state)=> state.processus.processus)

    const ExportUser = () =>{
        const headings = [[
            "id",
            "Nom",
            "Prenoms",
            "Matricule",
            "Mot de passe",
            "Role"
        ]];
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws,headings);
        utils.sheet_add_json(ws,usersData,{origin:"A2",skipHeader:true});
        utils.book_append_sheet(wb, ws,'Report');
        writeFile(wb,"User_Export_"+format(new Date(),"ddmmyyyy")+".xlsx")
    }

    async function handleRoleActuel(user){
        console.log(user)
        let roleAct =  [];
        await axios.post(Url+"/getUserRole",{id_user : user.id_user}).then(res =>{
            roleAct = res.data
        })
        roleAct = roleAct.map(role => role.id_role)
        console.log(roleAct)
        roleAct = rolesSlice.filter(role => 
            Array.from(roleAct).includes(role.id_role))
        setRoleActuel(roleAct)
        console.log(roleActuel.map(role => {
            console.log(role.type_role)
        }))
        return roleAct
    }
    async function handleProcessusActuel(user){
        console.log(user)
        let processusAct =  [];
        await axios.post(Url+"/getUserProcessus",{id_user : user.id_user}).then(res =>{
            processusAct = res.data
        })
        processusAct = processusAct.map(process => process.id_processus)
        console.log(processusAct)
        processusAct = processusSlice.filter(proc => 
            Array.from(processusAct).includes(proc.id))
        setProcessusActuel(processusAct)
        console.log(processusActuel.map(proc => {
            console.log(proc.libelle_processus)
        }))
        return processusAct
    }
    return(
        <div className="col-sm-12">
             <button onClick={ExportUser} className="btn btn-success float-right">
                Export <i className="bi bi-download"></i>
            </button>
            <div className="table-wrapper-scroll-y mt-2">
                <table className="table table-bordered text-center " style={border} id="table_user">
                    <thead className="text-success ">
                        <tr>
                            <th className="text-center">Matricule</th>
                            <th className="text-center">Nom</th>
                            <th className="text-center">Prénom</th>
                        </tr>
                    </thead>
                    <tbody className={!theme ? "text-dark" : "text-white"}>{
                            usersData.map((user,index)=>
                            <tr className={user.id_role == 'Administrateur' || user.id_role == 1 ? "text-secondary ": ""} key={index}>
                                <td>{user.matricule}</td>
                                <td>{user.nom}</td>
                                <td>{user.prenom}</td>
                                <td>
                                    <div className="col-lg-3 text-center">
                                    <button className="btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target={"#listRole"+index} onClick={()=>handleRoleActuel(user)}>Role</button>
                                    <div className="modal fade" id={"listRole"+index}>
                                        <div className="modal-dialog modal-sm modal-dialog-centered">
                                            <div className={!theme ? "modal-content" : "modal-content bg-dark"}>
                                                <div className="modal-header ">
                                                    <h5 className="text-center" id="exampleModalLabel">Listes des roles</h5>
                                                </div>
                                                <div className="modal-body">
                                                {
                                                        roleActuel.map((roles,index)=>{
                                                            return(
                                                                <div key={index} className="p-2">{roles.type_role}</div>
                                                            )
                                                        })
                                                }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target={"#listProcessus"+index} onClick={()=>handleProcessusActuel(user)}>Processus</button>
                                    <div className="modal fade" id={"listProcessus"+index}>
                                        <div className="modal-dialog modal-sm modal-dialog-centered">
                                            <div className={!theme ? "modal-content" : "modal-content bg-dark"}>
                                                <div className="modal-header ">
                                                    <h5 className="text-center" id="exampleModalLabel">Listes des Processus</h5>
                                                </div>
                                                <div className="modal-body">
                                                {
                                                        processusActuel.map((processus,index)=>{
                                                            return(
                                                                <div key={index} className="p-2">{processus.libelle_processus}</div>
                                                            )
                                                        })
                                                }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </td>
                                <td>
                                    <Edit_user user={user}/>
                                    <Delete_User user={user}/>
                                </td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Tableau_User