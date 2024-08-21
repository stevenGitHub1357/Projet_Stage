import React, { useEffect, useRef, useState } from "react";
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend, LineElement, PointElement,} from 'chart.js';
import { Bar, Line } from "react-chartjs-2";
import faker from "faker";
import { TitlePage } from "../templates/templates";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, checkTodo, deleteTodo, setTodoData, updateTodo } from "../feature/todo";
import "./homeStyle.scss"
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,BarElement,Title,Tooltip,Legend);

const Home =({MenuCollapse,theme,logo})=>{

    const dispatch = useDispatch()
    const tache = useRef()
    const indexTodo = useRef()
    const [maj, setMaj] = useState(false)
    const [filtreFini,setFiltreFini] = useState(false)
    const [filtreEncours,setFiltreEncours] = useState(false)

    const listTodo = [{tache:"Ajout Utilisateur",statut:"Fini"},{tache:"Check Utilisateur",statut:"En cours"}]
    useEffect(() => {
        dispatch(setTodoData(listTodo))
      },[]);

    const todoSlice = useSelector((state) => state.todos.todos)
    /* Module Chart*/
  const optionsBar = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' ,
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  }
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

  const dataBar = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgb(126, 226, 166)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  
  }
    const cardIcon = {
        width:"65px",
        height:"65px",
        buttom:"200px",
    }
    const classCard = !theme ? "px-3 shadow-sm relative rounded-2 bg-white " : "px-3 shadow-sm relative rounded-2 bg-dark bg-gradient text-white "
    /*  todo*/
   
    
    
    const Addtodo = () =>{
        var obj
        if(indexTodo.current.value != "" ){
            obj = {tache:tache.current.value,statut:"En cours",index:indexTodo.current.value}
            dispatch(updateTodo(obj))
            setMaj(false)
            tache.current.value = ""
            indexTodo.current.value = ""
        }else{

            obj = {tache:tache.current.value,statut:"En cours"}
            dispatch(addTodo(obj))
            tache.current.value = ""
            indexTodo.current.value = ""
        }
    }

    const DeleteTodo = (tache,index) =>{
        dispatch(deleteTodo(index))
    }

    const SelectTodo = (todo, index) =>{
        tache.current.value = todo.tache
        indexTodo.current.value = index
        setMaj(true)
    }  
    const CheckedTodo = (todo,index) =>{
        var obj = {index:index,statut:"Fini"}
        dispatch(checkTodo(obj))
    }
    const StyleTodos = {
        height:"97%",
    }
    const tbodyScroll = {
        overflow:"scroll"
    }
    const labelTodo = {
        height:"15px",
        width:"10%",
        display:"inline-block"
    }

    const FilterByFini = () =>{
        if(filtreFini == false){
            setFiltreFini(true)
        }else{
            setFiltreFini(false)
        }

    }
    const FilterByEncours = ()=>{
        if(filtreEncours == false){
            setFiltreEncours(true)

        }else{
            setFiltreEncours(false)
        }
    }
    return(
        <div  className={!MenuCollapse ? "content" : "contentCollapse"}>
            <TitlePage title="Tableau de bord" theme={theme}/>
            <div className="CountBoard mt-5">
                <div className="row text-white">
                    <div className="col-sm-3 mb-3">
                        <div  className={classCard}>
                            <div className={!theme ? "bg-dark bg-gradient rounded-4 absolute shadow  text-center " : "bg-info bg-gradient rounded-4 absolute shadow  text-center"} style={cardIcon}>
                                <i className="bi bi-inbox mt-5"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 mb-3">
                        <div  className={classCard}>
                            <div className="bg-danger bg-gradient rounded-4 absolute shadow text-center " style={cardIcon}>
                                <i className="bi bi-person-fill"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 mb-3">
                        <div  className={classCard}>
                            <div className="bg-success bg-gradient rounded-4 absolute shadow text-center " style={cardIcon}>
                                <i className="bi bi-person"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 mb-3">
                        <div  className={classCard}>
                            <div className="bg-primary bg-gradient rounded-4 absolute shadow  text-center " style={cardIcon}>
                                <i className="bi bi-inbox-fill"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-8 ">
                        <div className={!theme ? " bg-white rounded-2 shadow-sm p-4" : "bg-dark rounded-2 shadow-sm text-white p-4"}>
                            <h4> <i className="bi bi-bar-chart"></i> Chart</h4>
                            <hr></hr>
                            <Bar options={optionsBar} data={dataBar}/>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className={!theme ? "bg-white rounded-2 shadow-sm p-4  " : "bg-dark rounded-2 shadow-sm text-white p-4 "}  style={StyleTodos}>
                            <h4> <i className="bi bi-list-task"></i> Todo List</h4>
                            <hr></hr>
                            <div className="text-center">
                                <div className="d-inline ">
                                    <div className="rounded bg-luminess" onClick={FilterByFini} style={labelTodo}></div>
                                    <span className={!filtreFini ? "ms-2 cursor-pointer" : " ms-2 cursor-pointer text-decoration-line-through"} onClick={FilterByFini}>Fini</span>
                                </div>
                                <div className="d-inline ms-3">
                                    <div className="bg-gray rounded" onClick={FilterByEncours}  style={labelTodo}></div>
                                    <span  className={!filtreEncours ? "ms-2 cursor-pointer" : " ms-2 cursor-pointer text-decoration-line-through"} onClick={FilterByEncours}>En cours</span>
                                </div>
                            </div>
                            <table className="table   ">
                                <thead className="text-success text-center">
                                    <tr>
                                        <td>Tâches</td>
                                        <td width="150px">Actions</td>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    <tr>
                                        <td>
                                            <input type="hidden" ref={indexTodo}></input>
                                            <input className="form-control " ref={tache}></input>
                                        </td>
                                        <td>
                                            <button className="btn btn-primary bg-gradient  rounded-5 shadow" onClick={Addtodo}><i className={!maj  ? "bi bi-plus" : "bi bi-save"}></i></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="table-scroll">
                                <table className="table">
                                    <tbody className="text-center " >
                                    
                                        {
                                            todoSlice.filter((tache) => 
                                                filtreFini == true ? tache.statut == 'Fini' : filtreEncours == true ? tache.statut == 'En cours' : filtreFini == false && filtreEncours == false ? tache.statut : ""
                                            ).map((tache,index) =>
                                                <tr style={{background: tache.statut == 'Fini' ? '#7ee2a6' : "", transition: tache.statut == 'Fini' || tache.statut == 'En cours' ? "0.5s" : ""}} className={tache.statut == 'Fini' ? "fw-bolder": ""} key={index}>
                                                    <td>{tache.tache}</td>
                                                    <td>
                                                        {
                                                            tache.statut == "Fini" ?
                                                            <></>
                                                            :
                                                            <>
                                                            <button className="btn btn-danger btn-sm rounded-5 shadow" onClick={()=>DeleteTodo(tache,index)}><i className="bi bi-dash"></i></button>
                                                            <button className="btn btn-warning btn-sm rounded-5 shadow ms-2" onClick={()=>SelectTodo(tache,index)}><i className="bi bi-pen"></i></button>
                                                            <button className="btn btn-success btn-sm rounded-5 shadow ms-2" onClick={()=>CheckedTodo(tache,index)}><i className="bi bi-check"></i></button>

                                                            </>
                                                        }
                                                    </td>
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
        </div>
    );
}
export default Home;