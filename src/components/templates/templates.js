import React from "react"
import logo from '../../images/logo-jouveTitle.png'
import { useSelector, useDispatch } from "react-redux"

export const TitlePage = ({title,theme,process}) => {
    const cardIcon = {
        width:"65px",
        height:"65px",
        buttom:"200px",
        color:"black"
    }
    const styleTitle = {
        
    }
    const classCard = !theme ? "px-3 shadow-sm relative rounded-2 bg-white " : "px-3 shadow-sm relative rounded-2 bg-dark bg-gradient text-white "
    const listProcessusSlice = useSelector((state) => state.processus.processus)
    return(
        <div className="row">
        <div className={!theme ? " titlePage shadow-sm d-flex justify-content-between bg-white " : "bg-dark titlePage shadow-sm text-white d-flex justify-content-between"}>
          <span className="text-center">{title}</span>
            {/* <img src={logo} alt="" width="40" className=""></img> */}
            
        </div>
        <div className="CountBoard mt-5">
        <div className="row text-white">
            {
            process === true &&
            listProcessusSlice.filter(process=>process.id>0).map((process,index) =>(
                <div className="col-sm-3 mb-5">
                    <div  className={classCard}>
                        <div className={!theme ? "bg-dark bg-gradient rounded-4 absolute shadow  text-center" : "bg-info bg-gradient rounded-4 absolute shadow  text-center"} style={cardIcon}>
                            <i className="color-white" style={!theme ? {color: "white"}  : {color: "black"}} >{process.abbrv}</i>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </div>
        </div>
    )
}