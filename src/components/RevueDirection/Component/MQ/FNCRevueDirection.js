import React, { useEffect, useRef, useState } from "react";
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend, LineElement, PointElement,} from 'chart.js';
import { Bar, Line } from "react-chartjs-2";
import faker from "faker";
import { useDispatch, useSelector } from "react-redux";
import ConsultationFNC from "../../../KPI_component/FNC/ConsultationFNC";
import SyntheseFNC from "../../../KPI_component/FNC/SyntheseFNC";
// import "./homeStyle.scss"
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,BarElement,Title,Tooltip,Legend);

const FNCRevueDirection =({MenuCollapse,theme,logo})=>{

    const dispatch = useDispatch()
   
    return(
        <div>
            <ConsultationFNC/>
            <SyntheseFNC/>
        </div>
    );
}
export default FNCRevueDirection;