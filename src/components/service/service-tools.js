import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Global_url from "../../global_url";
let Url = Global_url
const GetOutils = () =>{
    const [outls,setOutils] = useState()
    useEffect(()=>{
        axios.get(Url + "/get-Outil").then(res => {
            setOutils(res.data)
        });
    },[])
    return outls
}

const GetPriorisation = () =>{
    const [priorisation,setPriorisation] = useState()
    useEffect(()=>{
        axios.get(Url + "/get-Priorisation").then(res => {
            setPriorisation(res.data)
        });
    },[])
    return priorisation
}

const GetSatus = () =>{
    const [status, setStatus] = useState()
    useEffect(()=>{
        axios.get(Url + "/get-Status").then(res => {
            setStatus(res.data)
        });
    },[])
    return status
}
const GetTicket = () =>{
    const [ticket, setTicket] = useState()
    useEffect(()=>{
        axios.get(Url + "/get-Ticket").then(res => {
            setTicket(res.data)
        });
    },[])
    return ticket
}

const GetTicketParMatricule = () =>{
    const [ticket, setTicket] = useState()
    const [cookies,removeCookie,setCookie] = useCookies([])
    let obj = {reparateur: cookies.matricule_react}
    useEffect(()=>{
        axios.post(Url + "/get-Ticket-Matricule",obj).then(res => {
            setTicket(res.data)
        });
    },[])
    return ticket
}

const GetTicketParDemandeur = () =>{
    const [ticket, setTicket] = useState()
    const [cookies,removeCookie,setCookie] = useCookies([])
    let obj = {matricule: cookies.matricule_react}
    useEffect(()=>{
        axios.post(Url + "/get-Ticket-Demandeur",obj).then(res => {
            setTicket(res.data)
        });
    },[])
    return ticket
}

export {GetOutils,GetPriorisation,GetSatus,GetTicket,GetTicketParMatricule,GetTicketParDemandeur}
