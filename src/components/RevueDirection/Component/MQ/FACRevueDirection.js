import React, { useEffect, useRef, useState } from "react";
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend, LineElement, PointElement,} from 'chart.js';
import { Bar, Line } from "react-chartjs-2";
import faker from "faker";
import { useDispatch, useSelector } from "react-redux";
import ConsultationFAC from "../../../KPI_component/FAC/ConsultationFAC";
import SyntheseFAC from "../../../KPI_component/FAC/SyntheseFAC";
// import "./homeStyle.scss"
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,BarElement,Title,Tooltip,Legend);

const FACRevueDirection =({MenuCollapse,theme,logo})=>{

    const dispatch = useDispatch()
   
    return(
        <div>
            <ConsultationFAC/>
            <SyntheseFAC/>
        </div>
    );
}
export default FACRevueDirection;