import React, { useEffect, useState } from "react";
// const Global_url = "http://localhost:1000"
let param = "a"
const DefaultFunction = (param)=>{
    if(param == "a"){
        return "http://localhost:1000/react_app_api"
    }else{
        return "http://192.168.12.236:91/react_app_api"
    }
}
let Global_url = DefaultFunction(param)
export default Global_url;