import {React,useRef, useState} from "react"
import axios from "axios"
import { Success, Warning } from "../service/service-alert"
import { GetRole } from "../service/service-role"
import { useDispatch, useSelector } from "react-redux"
import { addUser, setUsersData, UpdateUser } from "../feature/users.slice"
import { useEffect } from "react"
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
    const [idRole,setIdRole] = useState() 
    const dispatch = useDispatch()
    const listRole = GetRole()
    const listProcessus = useSelector(state=> state.processus.processus)
    const [callProcess, setCallProcess] = useState(false)
    const [processusUser, setProcessusUser] = useState([])
    const [selectedItems, setSelectedItems] = useState([]);
    const [controlProcess, setControlleProcess] = useState(false)
    if(usersUpdate.id_user != "" || usersUpdate.matricule != ""){
        id_user.current.value =  usersUpdate.id_user
        matricule.current.value = usersUpdate.matricule
        nom.current.value = usersUpdate.nom
        prenom.current.value = usersUpdate.prenom
        password.current.value = usersUpdate.mot_de_passe
        confirm_password.current.value = usersUpdate.mot_de_passe
        getIdRoleUpdate(usersUpdate.id_user)   
    }
    // if(controlProcess===true){
    //     console.log(controlProcess)
    //     getIdProcessusUpdate(usersUpdate.id_user)
    // }

    


    async function getIdRoleUpdate (id_user){
        let role = await axios.post(Url+"/getRoleByUser",{id_user : id_user})
        console.log(role.data)
        role = role.data
        console.log(role[0])
        setIdRole(role[0].id_role)
        setControlleProcess(true);
    }

    async function getIdProcessusUpdate (id_user){
        let processus = await axios.post(Url+"/getProcessusByUser",{id_user : id_user})
        // console.log(processus.data)
        processus = processus.data
        setControlleProcess(false)
        setSelectedItems([])
        for(let proc of processus){
            setSelectedItems(prevState => ({
            ...prevState,
            [proc.id]: !prevState[proc.id],
            }));
            console.log(proc)
        }
        
    }

    async function handleSubmit(){
        console.log("Selected items:", selectedItems);
        let user = {
            id_user:id_user.current.value,
            matricule:matricule.current.value,
            nom:nom.current.value,
            prenom:prenom.current.value,
            mot_de_passe:password.current.value,
            confirm_passe: confirm_password.current.value,
            id_role:role.current.value
        }
        console.log(selectedItems)
        
        if(user.matricule == "" || user.nom =="" || user.prenom == "" || user.id_role == "" || user.mot_de_passe == "" || user.confirm_passe =="" || selectedItems===null){           
            Warning('Information incomplète !')
           
            return
        }
        if(user.mot_de_passe != user.confirm_passe){
            Warning('Merci de vérifier votre mot de passe de confirmation. !')
            return
        }

        let currentUser = await axios.post(Url+"/getUserByMatricule",{matricule : user.matricule})
        console.log(currentUser.data.length)
        if(currentUser.data.length===0){
            console.log(user)
            await axios.post(Url+"/insertUser",user).then(res =>{})
            let currentUser = await axios.post(Url+"/getUserByMatricule",{matricule : user.matricule})
            console.log(currentUser.data[0].id_user)
            let allRole = [];
            allRole.push(user.id_role)
            axios.post(Url+"/insertUserRole",{id_user : currentUser.data[0].id_user, role : allRole})
            let allProcessus = Object.keys(selectedItems).filter(key=>selectedItems[key])
            console.log(allProcessus)
            axios.post(Url+"/insertUserProcessus",{id_user : currentUser.data[0].id_user, processus : allProcessus})
            Success('')
        }else{
            console.log(user)
            await axios.post(Url+"/updateUser",user).then(res =>{})
            let allRole = [];
            allRole.push(user.id_role)
            await axios.post(Url+"/deleteUserRole",{id_user : currentUser.data[0].id_user})
            await axios.post(Url+"/deleteUserProcessus",{id_user : currentUser.data[0].id_user})
            await axios.post(Url+"/insertUserRole",{id_user : currentUser.data[0].id_user, role : allRole})
            let allProcessus = Object.keys(selectedItems).filter(key=>selectedItems[key])
            console.log(allProcessus)
            await axios.post(Url+"/insertUserProcessus",{id_user : currentUser.data[0].id_user, processus : allProcessus})
            Success('Mise à jour effectué avec succès ')
        }
        setSelectedItems([])
        dispatch(addUser(user))
        const allUser = await axios.get(Url+"/getUsers")
        console.log(allUser.data)
        dispatch(setUsersData(allUser.data))
        form.current.reset()
        
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
    const handleCallProcess = () => {
        if(callProcess){
            setCallProcess(false)
        }else{
            setCallProcess(true)
            if(usersUpdate.id_user!==""){
                getIdProcessusUpdate(usersUpdate.id_user)
            }
        }
    }

    const handleCheckboxChange = (id, value) => {
        setSelectedItems(prevState => ({
        ...prevState,
        [id]: !prevState[id],
        }));
        
        
    };
    

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
                    
                    
                    <div className="col-lg-3">
                        <input type="password" ref={password} className={ !theme ? "form-control mb-2" : "form-control mb-2 darkMode border-dark"} placeholder="Password" aria-label="password" aria-describedby="basic-addon4"/>
                    </div>
                    <div className="col-lg-3">
                        <input type="password" ref={confirm_password} className={ !theme ? "form-control mb-2" : "form-control mb-2 darkMode border-dark"} placeholder="Confirmation" aria-label="password" aria-describedby="basic-addon4"/>
                    </div>
                    <div className="col-lg-3">
                        <select className={ !theme ? "form-control mb-2" : "form-control mb-2 darkMode border-dark text-white"} placeholder="Role" ref={role}>
                            <option  value="">Role...</option>
                            {
                            listRole.map((item,index)=>
                                <option key={index} value={item.id_role}
                                    selected={item.id_role === idRole}    
                                >{item.type_role}</option>
                            )
                        }
                        </select>
                    </div>
                    <div className="col-lg-3">
                        {/* <select className={ !theme ? "form-control mb-2" : "form-control mb-2 darkMode border-dark text-white"} placeholder="Role" ref={role}>
                            <option  value="">Processus...</option>
                            {
                            listRole.map((item,index)=>
                                <option key={index} value={item.id_role}>{item.type_role}</option>
                            )
                        }
                        </select> */}
                        <button type="button" onClick={()=>handleCallProcess()} className={ !theme ? "form-control mb-2" : "form-control mb-2 darkMode border-dark"}>Processus</button>
                    </div >
                    {
                        callProcess ? 
                        <>
                        <h4 style={{textAlign:"center"}}>
                            Choix de processus
                        </h4>
                        {   

                            listProcessus.map((item,index)=>
                                <div className="col-lg-3 row">
                                    <div className="col-lg-3">
                                    <input
                                        type="checkbox"
                                        name={`select_${item.id}`}
                                        checked={!!selectedItems[item.id]}
                                        onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
                                        key={item.id}
                                    />
                                    </div>
                                    <div className="col-lg-8">
                                        {item.libelle_processus}
                                    </div>
                                </div>
                            )
                        }
                        </>
                        :<></>
                    }
                    <div className="col-12 text-center">
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