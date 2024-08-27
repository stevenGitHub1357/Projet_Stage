import React from "react"
import logo from '../../images/logo-jouveTitle.png'

export const TitlePage = ({title,theme}) => {
    return(
        <div className={!theme ? " titlePage shadow-sm d-flex justify-content-between bg-white " : "bg-dark titlePage shadow-sm text-white d-flex justify-content-between"}>
          <span className="">{title}</span>
            <img src={logo} alt="" width="40" className=""></img>
        </div>
    )
}