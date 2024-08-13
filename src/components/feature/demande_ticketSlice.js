import { createSlice } from "@reduxjs/toolkit"
const ticketSlice = createSlice({
    name:"tickets",
    initialState:{
        tickets:[{id_ticket:null, outil:null, priorisation:null, commentaire:"",raison:"",status:null,matricule:"",reparateur:""}],
        ticketsParMatricule:[{id_ticket:null, outil:null, priorisation:null, commentaire:"",raison:"",status:null,matricule:"",reparateur:""}],
        ticketsParDemandeur:[{id_ticket:null, outil:null, priorisation:null, commentaire:"",raison:"",status:null,matricule:"",reparateur:""}]

    },
    reducers:{
        setTicketDataParDemandeur:(state,{payload})=>{
            state.ticketsParDemandeur = payload
        },
        setTicketDataParMatricule:(state,{payload})=>{
            state.ticketsParMatricule = payload
        },
        setTicketData:(state,{payload})=>{
            state.tickets = payload
        },
        addTicketData:(state,{payload})=>{
            console.log(payload)
            state.tickets.push(payload)
        },
        UpdateTicket:(state,{payload}) =>{
            state.tickets = state.tickets.map((ticket) =>{
                if(ticket.id_ticket == payload.id_ticket){
                    console.log("iee")
                    return{
                        ...ticket,
                        // labelle_menu: payload.labelle_menu,
                        // route:payload.route,
                        // icon:payload.icon
                    }
                }else{
                    return ticket
                }
            })
        },
        PrendreTicket:(state,{payload}) =>{
            state.tickets = state.tickets.map((ticket) =>{
                if(ticket.id_ticket == payload.id_ticket){
                    return{
                        ...ticket,
                        status:payload.status
                    }
                }else{
                    return ticket
                }
            })
        },
        TerminerTicket:(state,{payload})=>{
            state.tickets = state.tickets.map(
                (ticket) =>{
                    if(ticket.id_ticket == payload.id_ticket){
                        return{
                            ...ticket,
                            status:payload.status
                        }
                    }else{
                        return ticket
                    }
                }
            )
        },
        TerminerTicketParMatricule:(state,{payload})=>{
            state.ticketsParMatricule = state.ticketsParMatricule.map(
                (ticket) =>{
                    if(ticket.id_ticket == payload.id_ticket){
                        return{
                            ...ticket,
                            status:payload.status
                        }
                    }else{
                        return ticket
                    }
                }
            )
        },
        RejeterTicket:(state,{payload})=>{
            state.tickets = state.tickets.map(
                (ticket) =>{
                    if(ticket.id_ticket == payload.id_ticket){
                        return{
                            ...ticket,
                            status:payload.status
                        }
                    }else{
                        return ticket
                    }
                }
            )
        },
    }
})

export const {setTicketData,addTicketData,UpdateTicket,PrendreTicket,TerminerTicket,setTicketDataParMatricule,TerminerTicketParMatricule,setTicketDataParDemandeur,RejeterTicket} = ticketSlice.actions
export default ticketSlice.reducer