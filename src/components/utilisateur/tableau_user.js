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
function Tableau_User({theme}){
    const [cookies, setCookie, removeCookie] = useCookies(['role_react'])
    const usersData = useSelector((state)=>state.users.users)
    const border = {
    
        border: !theme ? "": "black 1px solid"
    }

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
    return(
        <div className="col-sm-12">
             <button onClick={ExportUser} className="btn btn-success float-right">
                Export <i className="bi bi-download"></i>
            </button>
            <div className="table-wrapper-scroll-y mt-2">
                <table className="table table-bordered text-center " style={border} id="table_user">
                    <thead className="text-success ">
                        <tr  >
                            <th className="text-center">Matricule</th>
                            <th className="text-center">Nom</th>
                            <th className="text-center">Prénom</th>
                            <th className="text-center">Role</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className={!theme ? "text-dark" : "text-white"}>{
                            usersData.map((user,index)=>
                            <tr className={user.id_role == 'Administrateur' || user.id_role == 1 ? "text-secondary ": ""} key={index}>
                                <td>{user.matricule}</td>
                                <td>{user.nom}</td>
                                <td>{user.prenom}</td>
                                <td>{user.id_role == 1 ? "Administrateur": user.id_role == 2 ? "Manageur" : user.id_role == 3 ? "Simple Utilisateur" : user.id_role == 4 ? "Developeur" : user.id_role}</td>
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