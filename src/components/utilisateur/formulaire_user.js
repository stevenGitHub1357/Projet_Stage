import {React,useRef} from "react"
import axios from "axios"
import { Success, Warning } from "../service/service-alert"
import { GetRole } from "../service/service-role"
import { useDispatch, useSelector } from "react-redux"
import { addUser, UpdateUser } from "../feature/users.slice"
import Global_url from "../../global_url"

var Url = Global_url
const Formulaire_User = ({theme}) =>{
    const usersUpdate = useSelector(state=> state.users.updateUsers)
    const form = useRef()
    const id_user = useRef()
    const matricule = useRef()
    const nom = useRef()
    const prenom = useRef()
    const password = useRef()
    const confirm_password = useRef()
    const role = useRef()
    const dispatch = useDispatch()
    const listRole = GetRole()
    if(usersUpdate.id_user != "" || usersUpdate.matricule != ""){
        id_user.current.value =  usersUpdate.id_user
        matricule.current.value = usersUpdate.matricule
        nom.current.value = usersUpdate.nom
        prenom.current.value = usersUpdate.prenom
        password.current.value = usersUpdate.mot_de_passe
        confirm_password.current.value = usersUpdate.mot_de_passe
        role.current.value = usersUpdate.id_role
    }
    function updateUser(datas){
        axios.post(Url+"/Update-User",datas).then(res =>{
        })
    }

    const handleSubmit = () =>{
        let userObject = {
            id_user:id_user.current.value,
            matricule:matricule.current.value,
            nom:nom.current.value,
            prenom:prenom.current.value,
            mot_de_passe:password.current.value,
            confirm_passe: confirm_password.current.value,
            id_role:role.current.value
        }
        if(userObject.matricule == "" || userObject.nom =="" || userObject.prenom == "" || userObject.id_role == "" || userObject.mot_de_passe == "" || userObject.confirm_passe ==""){            Warning('Information incomplete !')
            Warning('Information incomplète !')
           
            return
        }
        if(userObject.mot_de_passe != userObject.confirm_passe){
            Warning('Merci de vérifier votre mot de passe de confirmation. !')
            return
        }
        if(id_user.current.value != ""){
            dispatch(UpdateUser(userObject))
            form.current.reset()
            Success('Mise à jour effectué avec succès ')
            updateUser(userObject)
            return
        }
        dispatch(addUser(userObject))
        form.current.reset()
        Success('')
        axios.post(Url+"/insertUsers",userObject).then(res =>{})
        
    }

    const Reset = () =>{
        id_user.current.value = ""
        matricule.current.value = ""
        nom.current.value = ""
        prenom.current.value = ""
        role.current.value = ""
        password.current.value = ""
        confirm_password.current.value = ""
    }
    const GetInfoGpao = (matricule) => {
        axios.post(Url+"/get-user-gpao",{matricule:matricule.current.value}).then(res =>{
            if(res.data.length > 0){
                nom.current.value = res.data[0].nom
                prenom.current.value = res.data[0].prenoms
                password.current.value = res.data[0].passwd
            }else{
                nom.current.value = ""
                prenom.current.value =""
                password.current.value = ""
            }
        })
    }
    

    return(
        <div className="col-sm-12 mb-4">
            <form ref={form}>
                <div className="row">
                    <div className="col-lg-4">
                        <input type="hidden" ref={id_user} ></input>
                        <input type="text" maxLength={5} ref={matricule} className={!theme ? "form-control mb-2" : "form-control form-control-dark mb-2 darkMode border-dark text-white" } placeholder="Matricule" aria-label="name" aria-describedby="basic-addon1" onChange={()=>GetInfoGpao(matricule)}/>
                    </div>
                    <div className="col-lg-4">
                        <input type="text" ref={nom} className={ !theme ? "form-control mb-2" : "form-control mb-2 darkMode border-dark text-white"} placeholder="Nom" aria-label="name" aria-describedby="basic-addon2"/>
                    </div>
                    <div className="col-lg-4">
                        <input type="text" ref={prenom} className={ !theme ? "form-control mb-2" : "form-control mb-2 darkMode border-dark text-white"} placeholder="Prénom" aria-label="firstname" aria-describedby="basic-addon3"/>
                    </div>
                    <div className="col-lg-4">
                        <select className={ !theme ? "form-control mb-2" : "form-control mb-2 darkMode border-dark text-white"} placeholder="Role" ref={role}>
                            <option  value="">Role...</option>
                            {
                            listRole.map((item,index)=>
                                <option key={index} value={item.id_role}>{item.type_role}</option>
                            )
                        }
                        </select>
                    </div>
                    <div className="col-lg-4">
                        <input type="password" ref={password} className={ !theme ? "form-control mb-2" : "form-control mb-2 darkMode border-dark"} placeholder="Password" aria-label="password" aria-describedby="basic-addon4"/>
                    </div>
                    <div className="col-lg-4">
                        <input type="password" ref={confirm_password} className={ !theme ? "form-control mb-2" : "form-control mb-2 darkMode border-dark"} placeholder="Confirmation" aria-label="password" aria-describedby="basic-addon4"/>
                    </div>
                    <div className="col-lg-12 text-center">
                        <button type="button" onClick={()=>handleSubmit()} className="btn btn-primary form-control w-25  mb-3 ms-2 mt-2">
                            <i className="bi bi-save"></i>
                            <span> Enregistrer</span>
                        </button>
                        <button type="button" onClick={()=>Reset()} className={!theme ? "btn btn-dark mb-3 mt-2 form-control w-25 ms-2" : "btn btn-outline-warning mb-3 mt-2 form-control w-25 ms-2"}> <i className="bi bi-arrow-counterclockwise"></i> Vider</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default Formulaire_User;